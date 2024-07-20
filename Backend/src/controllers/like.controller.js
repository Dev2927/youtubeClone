import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

// Toggle like on video
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video Id is not valid");
  }

  const findVideoLike = await Like.findOne({
    video: videoId,
  });

  let like;
  let unLike;

  if (findVideoLike) {
    unLike = await Like.deleteOne({
      video: videoId,
    });

    if (!unLike) {
      throw new ApiError(500, "Something went wrong while unliking your video");
    }
  } else {
    like = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Something went wrong while liking your video");
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        `User ${like ? "like" : "unlike"} video successfully`
      )
    );
});

// Toggle like on comment
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Comment Id is not valid");
  }

  const findCommentLike = await Like.findOne({
    comment: commentId,
  });

  let like;
  let unLike;

  if (findCommentLike) {
    unLike = await Like.deleteOne({
      comment: commentId,
    });

    if (!unLike) {
      throw new ApiError(
        500,
        "Something went wrong while unliking your comment"
      );
    }
  } else {
    like = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Something went wrong while liking the comment");
    }
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        {},
        `User ${like ? "like" : "unLike"} the comment successfully !!`
      )
    );
});

// Toggle like on tweet
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Video Id is not valid");
  }

  let findTweetLike = await Like.findOne({
    tweet: tweetId,
  });

  let like;
  let unLike;

  if (findTweetLike) {
    unLike = await Like.deleteOne({
      tweet: tweetId,
    });

    if (!unLike) {
      throw new ApiError(500, "something went wrong while unliking the tweet");
    }
  } else {
    like = await Like.create({
      tweet: tweetId,
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(500, "Something went wrong while liking the tweet");
    }
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        {},
        `User ${like ? "like" : "unLike"} the tweet successfully !!`
      )
    );
});

// Get all liked videos
const getLikedVideos = asyncHandler(async (req, res) => {
  console.log('this is request : ', req?.user._id)
  const userId  = req?.user?._id;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "User Id is not valid");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(500, "User not found");
  }

  const likes = await Like.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedBy",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "videoOwner",
              foreignField: "_id",
              as: "videoOwner",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              videoOwner: {
                $arrayElemAt: ["$videoOwner", 0],
              },
            },
          },
        ],
      },
    },
  ]);
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        likes[0]?.likedBy,
        " fetched Liked videos successfully !!"
      )
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
