import mongoose, { Date, Types, Schema } from "mongoose"

export interface IPostDb {
  _id: Types.ObjectId
  title: string
  content: string
  author: Types.ObjectId
  updateAt: Date
  createdAt: Date
}

const PostSchema = new mongoose.Schema<IPostDb>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true })

const postModel = mongoose.model('posts', PostSchema)

export default postModel

