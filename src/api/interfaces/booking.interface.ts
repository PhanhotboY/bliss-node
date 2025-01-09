import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawBooking {
  id: string;
  bok_name: string;
  bok_msisdn: string;
  bok_email: string;
  bok_time2Call: string;
  bok_date2Call: string;
  bok_message: string;
  bok_viewed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookingAttrs {
  name: string;
  msisdn: string;
  email?: string;
  time2Call: string;
  date2Call: string;
  message: string;
  viewed: boolean;
}

export type IBooking = HydratedDocument<IRawBooking>;

export interface IBookingModel extends Model<IBooking> {
  build(attrs: IBookingAttrs): Promise<IBooking>;
}
