import { Router } from 'express';

import { SliderController } from '@controllers/slider.controller';
import { authenticationV2 } from '@middlewares/authentication';

const sliderRouter = Router();

sliderRouter.get('/', SliderController.getSliders);
sliderRouter.get('/:type', SliderController.getSlider);

sliderRouter.use(authenticationV2);

sliderRouter.post('/', SliderController.createSlider);

sliderRouter.put('/:type', SliderController.updateSlider);

sliderRouter.delete('/:type', SliderController.deleteSlider);

module.exports = sliderRouter;
