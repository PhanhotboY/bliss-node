import { Request, Response } from 'express';

import * as ServiceService from '../services/service.service';

import { OK } from '../core/success.response';

export class ServiceController {
  static async getServices(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ServiceService.getServices(),
    });
  }

  static async getService(req: Request, res: Response) {
    return OK({
      res,
      metadata: await ServiceService.getService(req.params.id),
    });
  }

  static async createService(req: Request, res: Response) {
    return OK({
      res,
      message: 'Service created successfully',
      metadata: await ServiceService.createService(req.body),
    });
  }

  static async updateService(req: Request, res: Response) {
    return OK({
      res,
      message: 'Service updated successfully',
      metadata: await ServiceService.updateService(req.params.id, req.body),
    });
  }

  static async deleteService(req: Request, res: Response) {
    return OK({
      res,
      message: 'Service deleted successfully',
      metadata: await ServiceService.deleteService(req.params.id),
    });
  }
}
