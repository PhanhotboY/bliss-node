import { BookingController } from '@controllers/booking.controller';
import { authenticationV2 } from '@middlewares/authentication';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter.post('/', BookingController.createBooking);

bookingRouter.use(authenticationV2);

bookingRouter.get('/', BookingController.getBookings);
bookingRouter.get('/count', BookingController.countUnseenBookings);
bookingRouter.get('/:bookingId', BookingController.getBookingDetails);

bookingRouter.put('/:bookingId', BookingController.updateBooking);

module.exports = bookingRouter;
