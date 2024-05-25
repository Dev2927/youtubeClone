import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Toggle subscription
const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Channel Id is not valid");
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  let unsubscribe;
  let subscribe;

  const subscribed = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (subscribed) {
    unsubscribe = await Subscription.findOneAndDelete({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!unsubscribe) {
      throw new ApiError(
        500,
        "Something went wrong while unsubscribing the user"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, unsubscribe, "Unsubscribed successfully"));
  } else {
    subscribe = await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });

    if (!subscribe) {
      throw new ApiError(
        500,
        "Something went wrong while subscribing the user"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, subscribe, "Subscribed successfully"));
  }
});

// Controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Channel Id is not valid");
  }

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(channelId?.trim()),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscribers",
      },
    },
    {
      $project: {
        subscribers: {
          username: 1,
          fullName: 1,
          avatar: 1,
        },
      },
    },
  ]);

  if (!subscribers) {
    throw new ApiError(
      500,
      "Something went wrong while returning subscriber list of channel"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "Subscribers feteched successfully")
    );
});

// Controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Subscrier Id is not valid");
  }

  const channelSubscribed = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedChannel",
      },
    },
    {
      $project: {
        subscribedChannel: {
          username: 1,
          avatar: 1,
        },
      },
    },
  ]);

  if (!channelSubscribed) {
    throw new ApiError(
      500,
      "Something went wrong while returning channel list to which user has subscribed"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channelSubscribed,
        "Subscribed channels fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
