import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawBooking {
  id: string;
  bok_name: string;
  bok_msisdn: string;
  bok_email: string;
  bok_message: string;
  bok_viewed: boolean;
  bok_branch: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingAttrs {
  name: string;
  msisdn: string;
  email?: string;
  message: string;
  viewed: boolean;
  branch: string;
}

export type IBooking = HydratedDocument<IRawBooking>;

export interface IBookingModel extends Model<IBooking> {
  build(attrs: IBookingAttrs): Promise<IBooking>;
}
