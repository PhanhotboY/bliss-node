import { BranchModel } from '@models/branch.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { NotFoundError } from '../core/errors';
import { BRANCH } from '../constants';
import { IBranchAttrs } from '../interfaces/branch.interface';

const getBranches = async () => {
  const branches = await BranchModel.find({}, { __v: 0 }).populate(
    'bra_thumbnail',
    '-__v'
  );
  return getReturnList(branches);
};

const getMainBranch = async () => {
  const branch = await BranchModel.findOne(
    { bra_isMain: true },
    { __v: 0 }
  ).populate('bra_thumbnail', '-__v');

  return getReturnData(branch);
};

const getBranchDetails = async (branchId: string) => {
  const branch = await BranchModel.findById(branchId, { __v: 0 }).populate(
    'bra_thumbnail',
    '-__v'
  );
  if (!branch) {
    throw new NotFoundError('Branch not found');
  }
  return getReturnData(branch);
};

const createBranch = async (branch: IBranchAttrs) => {
  if (branch.isMain === true) {
    await BranchModel.updateMany({ bra_isMain: true }, { bra_isMain: false });
  }

  const newBranch = await BranchModel.build(branch);

  return getReturnData(await newBranch.populate('bra_thumbnail', '-__v'));
};

const updateBranch = async (branchId: string, branch: IBranchAttrs) => {
  if (branch.isMain === true) {
    await BranchModel.updateMany({ bra_isMain: true }, { bra_isMain: false });
  }

  const updatedBranch = await BranchModel.findByIdAndUpdate(
    branchId,
    formatAttributeName(removeNestedNullish(branch), BRANCH.PREFIX),
    { new: true }
  ).populate('bra_thumbnail', '-__v');
  if (!updatedBranch) {
    throw new NotFoundError('Branch not found');
  }
  return getReturnData(updatedBranch);
};

const deleteBranch = async (branchId: string) => {
  const deletedBranch = await BranchModel.findByIdAndDelete(branchId);
  if (!deletedBranch) {
    throw new NotFoundError('Branch not found');
  }
  return getReturnData(deletedBranch);
};

export {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
  getMainBranch,
  getBranchDetails,
};
