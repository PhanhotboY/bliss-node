import { Router } from 'express';

import { PageController } from '@controllers/page.controller';
import { authenticationV2 } from '@middlewares/authentication';

const router = Router();

router.post('/:id/views', PageController.increasePageViews);

router.get('/all', authenticationV2, PageController.getAllPages);
router.get('/:id', PageController.getPage);
router.get('/', PageController.getPublishedPages);

router.use(authenticationV2);

router.get('/unpublished', PageController.getUnpublishedPages);

router.put('/:id', PageController.updatePage);
router.post('/', PageController.createPage);
router.delete('/:id', PageController.deletePage);

module.exports = router;
