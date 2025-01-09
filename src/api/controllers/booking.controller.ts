import { Request, Response } from 'express';

import * as BookingService from '../services/booking.service';

import { OK } from '../core/success.response';

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    return OK({
      res,
      message: 'Booking created successfully',
      metadata: await BookingService.createBooking(req.body),
    });
  }

  static async getBookings(req: Request, res: Response) {
    return OK({
      res,
      metadata: await BookingService.getBookings(),
    });
  }

  static async getBookingDetails(req: Request, res: Response) {
    return OK({
      res,
      metadata: await BookingService.getBookingDetails(req.params.bookingId),
    });
  }

  static async countUnseenBookings(req: Request, res: Response) {
    return OK({
      res,
      metadata: await BookingService.countUnseenBookings(),
    });
  }

  static async updateBooking(req: Request, res: Response) {
    return OK({
      res,
      message: 'Booking updated successfully',
      metadata: await BookingService.updateBooking(
        req.params.bookingId,
        req.body
      ),
    });
  }
}
