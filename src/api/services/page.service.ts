import slugify from 'slugify';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { isValidObjectId, ObjectId } from 'mongoose';

import { IPageAttrs } from '../interfaces/page.interface';
import { PageModel } from '../models/page.model';
import { NotFoundError } from '../core/errors';
import { PAGE } from '../constants';
import { getExcerpt } from '@utils/page.util';

const createPage = async (page: IPageAttrs) => {
  if (!page.category) {
    page.category = PAGE.CATEGORY.OPTIONS.NONE.slug;
  }

  const newPage = await PageModel.build({
    ...page,
    excerpt: page.excerpt || getExcerpt(page.content),
    slug: page.title && slugify(page.title, { lower: true }),
    views: 0,
  });
  return getReturnData(await newPage.populate('pst_thumbnail', '-__v'));
};

const getPublishedPages = async ({
  type,
  q,
}: {
  type?: string;
  q?: string;
}) => {
  const pages = await PageModel.find(
    {
      ...removeNestedNullish({ pst_template: type }),
      ...(q && {
        $or: [
          { pst_title: { $regex: q, $options: 'i' } },
          { pst_excerpt: { $regex: q, $options: 'i' } },
        ],
      }),
      pst_isPublished: true,
    },
    ['-pst_content']
  ).populate('pst_thumbnail', '-__v');
  return getReturnList(pages);
};

const getAllPages = async (query: any) => {
  const pages = await PageModel.find(
    { ...formatAttributeName(removeNestedNullish(query), PAGE.PREFIX) },
    ['-pst_content']
  ).populate('pst_thumbnail', '-__v');
  return getReturnList(pages);
};

const getUnpublishedPages = async () => {
  const pages = await PageModel.find({ pst_isPublished: false }).populate(
    'pst_thumbnail'
  );
  return getReturnList(pages);
};

const getPostDetail = async (id: string) => {
  let page;
  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    page = await PageModel.findById(id).populate('pst_thumbnail', '-__v');
  } else {
    // else, search by slug
    page = await PageModel.findOne({ pst_slug: id }).populate(
      'pst_thumbnail',
      '-__v'
    );
  }

  if (!page) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(page, { without: ['__v'] });
};

const updatePage = async (id: string, page: IPageAttrs) => {
  delete page.views;
  const updatedPage = await PageModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(
        removeNestedNullish({ ...page, excerpt: getExcerpt(page.content) }),
        PAGE.PREFIX
      ),
      pst_slug: page.title && slugify(page.title, { lower: true }),
    },
    {
      new: true,
    }
  ).populate('pst_thumbnail', '-__v');
  if (!updatedPage) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(updatedPage);
};

const increasePageViews = async (id: string) => {
  await PageModel.findByIdAndUpdate(id, {
    $inc: { pst_views: 1 },
  });
  return { message: 'Page views increased successfully' };
};

const deletePage = async (id: string) => {
  const deletedPage = await PageModel.findByIdAndDelete(id);
  if (!deletedPage) {
    throw new NotFoundError('Page not found');
  }

  return getReturnData(deletedPage);
};

export {
  createPage,
  getPublishedPages,
  getAllPages,
  getUnpublishedPages,
  getPostDetail,
  updatePage,
  deletePage,
  increasePageViews,
};
