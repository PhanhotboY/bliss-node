import { Schema, Types, model } from 'mongoose';
import { IBooking, IBookingModel } from '../interfaces/booking.interface';
import { formatAttributeName } from '../utils';
import { BOOKING } from '../constants';

const bookingSchema = new Schema<IBooking, IBookingModel>(
  {
    bok_name: { type: String, required: true },
    bok_msisdn: { type: String, required: true },
    bok_date2Call: { type: String, required: true },
    bok_email: { type: String },
    bok_time2Call: { type: String },
    bok_message: { type: String },
    bok_viewed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: BOOKING.COLLECTION_NAME,
  }
);

bookingSchema.statics.build = (attrs: IBooking) => {
  return BookingModel.create(formatAttributeName(attrs, BOOKING.PREFIX));
};

export const BookingModel = model<IBooking, IBookingModel>(
  BOOKING.DOCUMENT_NAME,
  bookingSchema
);
