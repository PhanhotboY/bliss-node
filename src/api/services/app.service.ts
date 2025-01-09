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
  await app.updateOne(
    formatAttributeName(removeNestedNullish(settings), APP.PREFIX)
  );

  app = await AppModel.findOne({});

  return getReturnData(app!);
};

const getAppSettings = async () => {
  const app = await AppModel.findOne({});
  if (!app) {
    const app = await AppModel.build({
      title: 'string',
      description: 'string',
      logo: 'string',
      email: 'string',
      msisdn: 'string',
      address: {
        province: 'string',
        district: 'string',
        // ward: 'string',
        street: 'string',
      },
      social: {
        facebook: 'string',
        youtube: 'string',
        tiktok: 'string',
        zalo: 'string',
      },
      google: {
        analytics: 'string',
        reCaptcha: 'string',
        map: 'string',
      },
      taxCode: 'string',
    });
    return getReturnData(app);
  }

  return getReturnData(app);
};

export { updateAppSettings, getAppSettings };
