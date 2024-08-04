import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);

// Using async/await
async function getCommentsWithUsernames() {
    try {
        const comments = await Comment.find({})
            .populate('owner', 'username');
        console.log(comments);
    } catch (err) {
        console.error(err);
    }
}

getCommentsWithUsernames();
