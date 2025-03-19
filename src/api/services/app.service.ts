import {
  formatAttributeName,
  getReturnData,
  removeNestedNullish,
} from '@utils/index';
import { IAppAttrs } from '../interfaces/app.interface';
import { AppModel } from '../models/app.model';
import { APP } from '../constants';

const updateAppSettings = async (settings: IAppAttrs) => {
  let app = await AppModel.findOne({});

  if (!app) {
    const app = await AppModel.build(settings);
    return getReturnData(app);
  }
  app = await app
    .updateOne(formatAttributeName(removeNestedNullish(settings), APP.PREFIX), {
      new: true,
    })
    .populate('app_logo', '-__v');

  return getReturnData(app!);
};

const getAppSettings = async () => {
  const app = await AppModel.findOne({}).populate('app_logo', '-__v');
  if (!app) {
    const app = await AppModel.build({
      title: '',
      description: '',
      social: {
        facebook: '',
        zalo: '',
        youtube: '',
        tiktok: '',
      },
      taxCode: '',
      headScripts: '',
      bodyScripts: '',
    });
    const populatedApp = await app.populate('app_logo', '-__v');
    return getReturnData(populatedApp);
  }

  return getReturnData(app);
};

export { updateAppSettings, getAppSettings };
