import { BookingModel } from '@models/booking.model';
import { IBookingAttrs } from '../interfaces/booking.interface';
import { NotFoundError } from '../core/errors';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { BOOKING } from '../constants';

const createBooking = async (data: IBookingAttrs) => {
  const newBooking = await BookingModel.build({
    ...data,
    viewed: false,
  });

  return getReturnData(newBooking);
};

const getBookings = async () => {
  const bookings = await BookingModel.find({}, '-__v')
    .lean()
    .populate({ path: 'bok_branch', select: 'bra_name' })
    .exec();

  return getReturnList(bookings);
};

const countUnseenBookings = async () => {
  return await BookingModel.countDocuments({ bok_viewed: false });
};

const getBookingDetails = async (id: string) => {
  const booking = await BookingModel.findById(id, { __v: 0 })
    .lean()
    .populate({ path: 'bok_branch', select: 'bra_name' })
    .exec();

  if (!booking) {
    throw new NotFoundError('Booking not found');
  }

  return getReturnData(booking);
};

const updateBooking = async (id: string, data: IBookingAttrs) => {
  const booking = await BookingModel.findOneAndUpdate(
    { _id: id },
    formatAttributeName(removeNestedNullish(data), BOOKING.PREFIX),
    {
      new: true,
    },
  );
  if (!booking) {
    throw new NotFoundError('Booking not found');
  }
  return getReturnData(booking);
};

export {
  createBooking,
  getBookings,
  getBookingDetails,
  updateBooking,
  countUnseenBookings,
};
