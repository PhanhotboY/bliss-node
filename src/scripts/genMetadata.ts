require('dotenv').config();
import { mongodbInstance } from '../db/init.mongodb';
import { PAGE, TEMPLATE } from 'src/api/constants';
import { TemplateModel } from '@models/template.model';
import { emailVerificationEmailTemplate } from '@utils/email.template';
import { passwordEmailTemplate } from '@utils/password.template';

const htmlTemplate = {
  [TEMPLATE.NAME.PASSWORD]: passwordEmailTemplate,
  [TEMPLATE.NAME.VERIFY_EMAIL]: emailVerificationEmailTemplate,
};

async function main() {
  await mongodbInstance.connect();

  for (const name of Object.values(TEMPLATE.NAME)) {
    await TemplateModel.build({
      name,
      html: htmlTemplate[name](),
      status: 'active',
    });
  }

  console.log('Metadata generated successfully!');

  await mongodbInstance.disconnect();
}

main();
