import mongoose from 'mongoose';
import validator from 'validator';

export type TUserProvider = {
  id: string;
  provider: string;
};

export type TUserModel = {
  first_name?: string;
  last_name?: string;
  role?: 'admin' | 'user';
  email?: string;
  password?: string;
  providers: TUserProvider[];
  avatar?: string;
  date_of_creation?: Date;
};

const userSchema = new mongoose.Schema<TUserModel>({
  first_name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    default: 'New first name',
  },
  last_name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    default: 'New last name',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please enter valid email address'],
    default: 'no set email',
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    default: 'no set password',
  },
  providers: {
    type: [
      {
        _id: false,
        id: String,
        provider: String,
      },
    ],
    default: [],
  },
  date_of_creation: {
    type: Date,
    default: new Date(),
  },
  avatar: {
    type: String,
    default: 'https://img.icons8.com/material/24/000000/user-male-circle--v1.png',
  },
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;

    return ret;
  },
});

export const User = mongoose.model<TUserModel>('User', userSchema);
