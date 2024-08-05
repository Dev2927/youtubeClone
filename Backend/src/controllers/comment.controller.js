import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

// Get all comments for a video
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Video Id is not valid");
  }

  const findVideo = await Video.findById(videoId);

  if (!findVideo) {
    throw new ApiError(404, "Video not found");
  }

  const getComments = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: "users", // The name of the User collection
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $project: {
        content: 1,
        video: 1,
        owner: 1,
        "ownerDetails.username": 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  const options = {
    page,
    limit,
    customLabels: {
      totalDocs: "totalComments",
      docs: "comments",
    },
  };

  const paginatedComments = await Comment.aggregatePaginate(
    getComments,
    options
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, paginatedComments, "Got all comments successfully")
    );
});

// Add a comment to a video
const addComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const { videoId } = req.params;

  console.log("this is comment body : ", comment);

  if (!comment || comment?.trim() === "") {
    throw new ApiError(400, "Comment is not valid");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(404, "Video Id not found");
  }

  const createComment = await Comment.create({
    content: comment,
    video: videoId,
    owner: req.user?._id,
  });

  if (!createComment) {
    throw new ApiError(400, "Error while adding comment");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "Comment created successfully"));
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { newContent } = req.body;
  const { commentId } = req.params;
  console.log('this is new content : ', newContent)
  console.log('this is comment Id : ', commentId)

  if (!newContent || newContent?.trim() === "") {
    throw new ApiError(400, "Comment is not valid");
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(404, "Comment Id is not found");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "You don't have permission to update this comment");
  }

  const updateTheComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: newContent,
      },
    },
    {
      new: true,
    }
  );

  if (!updateTheComment) {
    throw new ApiError(400, "Something went wrong while updating the comment");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, updateTheComment, "Comment updated successfully")
    );
});

// Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Comment Id is not valid");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  if (comment.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(400, `You don't have permission to update this comment`);
  }

  const deleteTheComment = await Comment.deleteOne({ _id: commentId });

  if (!deleteTheComment) {
    throw new ApiError(400, "Something went while deleting your comment");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deleteTheComment, "Comment deleted successfully")
    );
});

export { getVideoComments, addComment, updateComment, deleteComment };
