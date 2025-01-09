import { ServiceModel } from '@models/service.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { SERVICE } from '../constants';
import { NotFoundError } from '../core/errors';
import { IServiceAttrs } from '../interfaces/service.interface';

const getServices = async () => {
  const services = await ServiceModel.find()
    .populate({ path: 'svc_page', select: 'pst_title pst_thumbnail pst_slug' })
    .lean();
  return getReturnList(services);
};

const getService = async (id: string) => {
  const service = await ServiceModel.findById(id)
    .populate({ path: 'svc_page', select: 'pst_title pst_thumbnail pst_slug' })
    .lean();
  if (!service) throw new NotFoundError('Service not found');
  return getReturnData(service);
};

const createService = async (data: IServiceAttrs) => {
  const service = await ServiceModel.build(removeNestedNullish(data));
  return getReturnData(service);
};

const updateService = async (id: string, data: any) => {
  const service = await ServiceModel.findByIdAndUpdate(
    id,
    formatAttributeName(removeNestedNullish(data), SERVICE.PREFIX)
  );
  if (!service) throw new NotFoundError('Service not found');
  return getReturnData(service);
};

const deleteService = async (id: string) => {
  const service = await ServiceModel.findByIdAndDelete(id);
  if (!service) throw new NotFoundError('Service not found');
  return getReturnData(service);
};

export { getServices, getService, createService, updateService, deleteService };
