import mongoose, { Types } from "mongoose"

export interface IUserDb {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  accessToken: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUserDb>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessToken: { type: String },
}, { timestamps: true })

UserSchema.index({ accessToken: 1, email: 1, name: 1, password: 1, _id: 1 })
UserSchema.index({ email: 1, accessToken: 1, name: 1, password: 1, _id: 1 })

const userModel = mongoose.model('users', UserSchema)

export default userModel
