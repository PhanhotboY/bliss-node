import slugify from 'slugify';

import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { IPostAttrs } from '../interfaces/post.interface';
import { PostModel } from '../models/post.model';
import { BadRequestError, NotFoundError } from '../core/errors';
import { POST } from '../constants';
import { isValidObjectId } from 'mongoose';
import { IPostCategoryAttrs } from '../interfaces/postCategory.interface';
import { PostCategoryModel } from '@models/postCategory.model';
import { IPostTemplateAttrs } from '../interfaces/postTemplate.interface';
import { PostTemplateModel } from '@models/postTemplate.model';
import { getExcerpt } from '@utils/post.util';

const createPost = async (post: IPostAttrs) => {
  const newPost = await PostModel.build({
    ...post,
    excerpt: post.excerpt || getExcerpt(post.content),
    slug: post.title && slugify(post.title, { lower: true }),
    views: 0,
  });
  return getReturnData(newPost);
};

const getPublishedPosts = async ({
  type,
  q,
}: {
  type?: string;
  q?: string;
}) => {
  let template;
  if (type) template = await getPostTemplate(type);

  const posts = await PostModel.find(
    {
      ...removeNestedNullish({ pst_template: template?.id.toString() }),
      ...(q && {
        $or: [
          { pst_title: { $regex: q, $options: 'i' } },
          { pst_excerpt: { $regex: q, $options: 'i' } },
        ],
      }),
      pst_isPublished: true,
    },
    ['-pst_content']
  );
  return getReturnList(posts);
};

const getAllPosts = async (query: any) => {
  const posts = await PostModel.find(
    { ...formatAttributeName(removeNestedNullish(query), POST.PREFIX) },
    ['-pst_content']
  );
  return getReturnList(posts);
};

const getUnpublishedPosts = async () => {
  const posts = await PostModel.find({ pst_isPublished: false });
  return getReturnList(posts);
};

const getPostDetail = async (id: string) => {
  let post;
  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    post = await PostModel.findById(id).populate([
      {
        path: 'pst_category',
        select: 'pct_name pct_slug',
      },
      {
        path: 'pst_template',
        select: 'ptp_name ptp_code',
      },
    ]);
  } else {
    // else, search by slug
    post = await PostModel.findOne({ pst_slug: id }).populate([
      {
        path: 'pst_category',
        select: 'pct_name pct_slug',
      },
      {
        path: 'pst_template',
        select: 'ptp_name ptp_code',
      },
    ]);
  }

  if (!post) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(post, { without: ['__v'] });
};

const updatePost = async (id: string, post: IPostAttrs) => {
  delete post.views;
  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(
        removeNestedNullish({ ...post, excerpt: getExcerpt(post.content) }),
        POST.PREFIX
      ),
      pst_slug: post.title && slugify(post.title, { lower: true }),
    },
    {
      new: true,
    }
  );
  if (!updatedPost) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(updatedPost);
};

const increasePostViews = async (id: string) => {
  await PostModel.findByIdAndUpdate(id, {
    $inc: { pst_views: 1 },
  });
  return { message: 'Post views increased successfully' };
};

const deletePost = async (id: string) => {
  const deletedPost = await PostModel.findByIdAndDelete(id);
  if (!deletedPost) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(deletedPost);
};

const createPostCategory = async (pct: IPostCategoryAttrs) => {
  if (pct.parent && !isValidObjectId(pct.parent)) {
    throw new BadRequestError('Invalid parent ID');
  }
  const newPostCategory = await PostCategoryModel.build({
    ...pct,
    slug: pct.name && slugify(pct.name, { lower: true }),
  });
  return getReturnData(newPostCategory);
};

const getPostCategories = async () => {
  const postCategories = await PostCategoryModel.find(
    {},
    {},
    {
      populate: {
        path: 'pct_parent',
        populate: 'pct_parent',
        select: 'pct_name pct_slug pct_parent',
      },
    }
  );
  return getReturnList(postCategories);
};

const updatePostCategory = async (id: string, pct: IPostCategoryAttrs) => {
  if (pct.parent && !isValidObjectId(pct.parent)) {
    throw new BadRequestError('Invalid parent ID');
  }
  const updatedPostCategory = await PostCategoryModel.findByIdAndUpdate(
    id,
    {
      ...formatAttributeName(removeNestedNullish(pct), POST.CATEGORY.PREFIX),
      slug: pct.name && slugify(pct.name, { lower: true }),
    },
    {
      new: true,
    }
  );
  if (!updatedPostCategory) {
    throw new NotFoundError('Post category not found');
  }

  return getReturnData(updatedPostCategory);
};

const deletePostCategory = async (id: string) => {
  const deletedPostCategory = await PostCategoryModel.findByIdAndDelete(id);
  if (!deletedPostCategory) {
    throw new NotFoundError('Post category not found');
  }

  return getReturnData(deletedPostCategory);
};

const createPostTemplate = async (ptp: IPostTemplateAttrs) => {
  const newPostTemplate = await PostTemplateModel.build(ptp);
  return getReturnData(newPostTemplate);
};

const getPostTemplates = async () => {
  const postTemplates = await PostTemplateModel.find();
  return getReturnList(postTemplates);
};

const getPostTemplate = async (id: string) => {
  let template;

  if (isValidObjectId(id)) {
    // if the given value is a valid ObjectId
    template = await PostTemplateModel.findById(id);
  } else {
    // else, search by slug
    template = await PostTemplateModel.findOne({ ptp_code: id });
  }

  if (!template) {
    throw new NotFoundError('Post not found');
  }

  return getReturnData(template);
};

const updatePostTemplate = async (id: string, ptp: IPostTemplateAttrs) => {
  const updatedPostTemplate = await PostTemplateModel.findByIdAndUpdate(
    id,
    formatAttributeName(removeNestedNullish(ptp), POST.TEMPLATE.PREFIX),
    {
      new: true,
    }
  );
  if (!updatedPostTemplate) {
    throw new NotFoundError('Post template not found');
  }

  return getReturnData(updatedPostTemplate);
};

const deletePostTemplate = async (id: string) => {
  const deletedPostTemplate = await PostTemplateModel.findByIdAndDelete(id);
  if (!deletedPostTemplate) {
    throw new NotFoundError('Post template not found');
  }

  return getReturnData(deletedPostTemplate);
};

export {
  createPost,
  getPublishedPosts,
  getAllPosts,
  getUnpublishedPosts,
  getPostDetail,
  updatePost,
  deletePost,
  increasePostViews,
  createPostCategory,
  getPostCategories,
  createPostTemplate,
  getPostTemplate,
  getPostTemplates,
  updatePostCategory,
  deletePostCategory,
  updatePostTemplate,
  deletePostTemplate,
};
