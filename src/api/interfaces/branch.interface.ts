import { HydratedDocument, Model, ObjectId } from 'mongoose';

export interface IRawBranch {
  bra_name: string;
  bra_email: string;
  bra_msisdn: string;
  bra_thumbnail: ObjectId;
  bra_address: {
    province: string;
    district: string;
    street: string;
  };
  bra_map: string;
  bra_isMain: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IBranch = HydratedDocument<IRawBranch>;

export interface IBranchAttrs {
  name: string;
  email: string;
  msisdn: string;
  thumbnail: string;
  address: {
    province: string;
    district: string;
    street: string;
  };
  map: string;
  isMain: boolean;
}

export interface IBranchModel extends Model<IBranch> {
  build(attrs: IBranchAttrs): Promise<IBranch>;
}
