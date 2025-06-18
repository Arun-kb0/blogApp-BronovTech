import mongoose, { Types } from "mongoose"

export interface IUserDb {
  _id: Types.ObjectId
  email: string
  password: string
  accessToken: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUserDb>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
}, { timestamps: true })

const userModel = mongoose.model('users', UserSchema)

export default userModel
