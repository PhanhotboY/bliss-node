export const POST = {
  DOCUMENT_NAME: 'Post',
  COLLECTION_NAME: 'posts',
  PREFIX: 'pst_',
  CATEGORY: {
    DOCUMENT_NAME: 'PostCategory',
    COLLECTION_NAME: 'post_categories',
    PREFIX: 'pct_',
    OPTIONS: {
      KTTM: {
        name: 'Kiến thức thẩm mỹ',
        slug: 'kien-thuc-tham-my',
      },
      TTSK: {
        name: 'Tin Tức Sự Kiện',
        slug: 'tin-tuc-su-kien',
      },
      NONE: {
        name: 'None',
        slug: 'none',
      },
    },
  },
  TEMPLATE: {
    DOCUMENT_NAME: 'PostTemplate',
    COLLECTION_NAME: 'post_templates',
    PREFIX: 'ptp_',
    OPTIONS: {
      LANDING_PAGE: {
        name: 'Landing Page',
        code: 'landing',
      },
      CONTACT_PAGE: {
        name: 'Contact',
        code: 'contact',
      },
      SERVICE_PAGE: {
        name: 'Service',
        code: 'service',
      },
      BLOG: {
        name: 'Blog',
        code: 'blog',
      },
    },
  },
};
