export const USER = {
  DOCUMENT_NAME: 'User',
  COLLECTION_NAME: 'users',
  PREFIX: 'usr_',
  STATUS: {
    ACTIVE: 'active',
    PENDING: 'pending',
    DELETED: 'deleted',
  },
  SEX: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
  },
} as const;
