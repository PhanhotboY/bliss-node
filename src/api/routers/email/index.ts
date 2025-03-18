import { Router } from 'express';
import { MailController } from '../../controllers/email.controller';

const emailRouter = Router();

emailRouter.post('/templates', MailController.createTemplate);

module.exports = emailRouter;
