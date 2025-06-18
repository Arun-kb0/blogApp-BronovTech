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
  _id: { type: Schema.Types.ObjectId, auto: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
}, { timestamps: true })

const postModel = mongoose.model('posts', PostSchema)

export default postModel

