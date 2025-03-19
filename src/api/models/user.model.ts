import { model, Schema, Types } from 'mongoose';

import { IMAGE, USER } from '../constants';
import { IUserAttrs, IUser, IUserModel } from '../interfaces/user.interface';
import { formatAttributeName } from '../utils';

const userSchema = new Schema<IUser, IUserModel>(
  {
    usr_username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      maxLength: 150,
    },
    usr_email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    usr_firstName: {
      type: String,
      trim: true,
      required: true,
      maxLength: 150,
    },
    usr_lastName: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    usr_slug: { type: String, required: true },
    usr_password: { type: String, required: true },
    usr_salt: { type: String, require: true },
    usr_avatar: { type: Types.ObjectId, ref: IMAGE.DOCUMENT_NAME },
    usr_birthdate: { type: Date, default: null },
    usr_msisdn: { type: String, default: '' },
    usr_sex: { type: String, default: '' },
    usr_status: {
      type: String,
      default: USER.STATUS.PENDING,
      enum: [...Object.values(USER.STATUS)],
    },
    usr_address: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: USER.COLLECTION_NAME,
  }
);

userSchema.statics.build = async (attrs: IUserAttrs) => {
  return UserModel.create(formatAttributeName(attrs, USER.PREFIX));
};

export const UserModel = model<IUser, IUserModel>(
  USER.DOCUMENT_NAME,
  userSchema
);
