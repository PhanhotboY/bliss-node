require('dotenv').config();
import { PostTemplateModel } from '@models/postTemplate.model';
import { mongodbInstance } from '../db/init.mongodb';
import { POST } from 'src/api/constants';
import { PostCategoryModel } from '@models/postCategory.model';

async function main() {
  await mongodbInstance.connect();

  for (const temp of Object.values(POST.TEMPLATE.OPTIONS)) {
    await PostTemplateModel.build(temp);
  }
  for (const cat of Object.values(POST.CATEGORY.OPTIONS)) {
    // @ts-ignore
    await PostCategoryModel.build(cat);
  }

  await mongodbInstance.disconnect();
}

main();
