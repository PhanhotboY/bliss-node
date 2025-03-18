import express from 'express';

import { checkApiKey, checkPermission } from '../auth/checkApiKey';
import { pushLog2Discord } from '../middlewares/logger.middleware';
import CheckController from '@controllers/check.controller';
import { AuthController } from '@controllers/auth.controller';

const router = express.Router();

router.use(pushLog2Discord);
//check api key

router.get('/check-status', CheckController.checkStatus);

router.get('/auth/verify-email', AuthController.verifyEmailToken);

router.use(checkApiKey);
//check api key's permission
router.use(checkPermission('0000'));

router.use('/categories', require('./category'));
router.use('/bookings', require('./booking'));
router.use('/branches', require('./branch'));
router.use('/sliders', require('./slider'));
router.use('/images', require('./image'));
router.use('/email', require('./email'));
router.use('/users', require('./user'));
router.use('/pages', require('./page'));
router.use('/auth', require('./auth'));
router.use('/app', require('./app'));

module.exports = router;
