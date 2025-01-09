import { Request, Response } from 'express';

import * as SliderService from '../services/slider.service';

import { OK } from '../core/success.response';

export class SliderController {
  static async getSliders(req: Request, res: Response) {
    return OK({
      res,
      metadata: await SliderService.getSliders(),
    });
  }

  static async getSlider(req: Request, res: Response) {
    return OK({
      res,
      metadata: await SliderService.getSlider(req.params.type),
    });
  }

  static async createSlider(req: Request, res: Response) {
    return OK({
      res,
      message: 'Slider created successfully',
      metadata: await SliderService.createSlider(req.body),
    });
  }

  static async updateSlider(req: Request, res: Response) {
    return OK({
      res,
      message: 'Slider updated successfully',
      metadata: await SliderService.updateSlider(req.params.type, req.body),
    });
  }

  static async deleteSlider(req: Request, res: Response) {
    return OK({
      res,
      message: 'Slider deleted successfully',
      metadata: { ok: true },
    });
  }
}
