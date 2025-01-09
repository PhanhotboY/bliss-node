import { Router } from 'express';

import { ServiceController } from '@controllers/service.controller';
import { authenticationV2 } from '@middlewares/authentication';

const serviceRouter = Router();

serviceRouter.get('/', ServiceController.getServices);
serviceRouter.get('/:id', ServiceController.getService);

serviceRouter.use(authenticationV2);

serviceRouter.post('/', ServiceController.createService);
serviceRouter.put('/:id', ServiceController.updateService);
serviceRouter.delete('/:id', ServiceController.deleteService);

module.exports = serviceRouter;
