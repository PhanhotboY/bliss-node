import { TemplateModel } from '../models/template.model';
import { TEMPLATE } from '../constants';
import { InternalServerError } from '../core/errors';
import { getReturnData } from '@utils/index';

const createTemplate = async ({
  name,
  html,
}: {
  name: Values<typeof TEMPLATE.NAME>;
  html: string;
}) => {
  return await TemplateModel.build({
    name,
    html,
    status: 'active',
  });
};

const getTemplate = async (name: string) => {
  const template = await TemplateModel.findOne({ tem_name: name });
  if (!template) throw new InternalServerError('Email template not found.');
  return getReturnData(template);
};

export { createTemplate, getTemplate };
