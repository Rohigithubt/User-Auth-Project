import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: {
			type:String,
			default:'',
		},
		resetPasswordExpiresAt: Date,
		verificationToken:{
			type:String,
			default:'',
		},
		verificationTokenExpiresAt: {
			type:Date,
			default:Date,
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
