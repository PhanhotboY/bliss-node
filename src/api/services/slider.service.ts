import { SliderModel } from '@models/slider.model';
import {
  formatAttributeName,
  getReturnData,
  getReturnList,
  removeNestedNullish,
} from '@utils/index';
import { NotFoundError } from '../core/errors';
import { ISliderAttrs } from '../interfaces/slider.interface';
import { SLIDER } from '../constants';

const getSliders = async () => {
  const sliders = await SliderModel.find({}, ['-__v']).lean();
  return getReturnList(sliders);
};

const getSlider = async (type: string) => {
  const slider = await SliderModel.findOne({ sld_type: type }, ['-__v']).lean();
  if (!slider) throw new NotFoundError('Slider not found');

  return getReturnData(slider);
};

const createSlider = async (slider: ISliderAttrs) => {
  const newSlider = await SliderModel.build({
    ...slider,
  });
  return getReturnData(newSlider);
};

const updateSlider = async (type: string, slider: any) => {
  const updatedSlider = await SliderModel.findOneAndUpdate(
    { sld_type: type },
    {
      ...formatAttributeName(removeNestedNullish(slider), SLIDER.PREFIX),
    },
    { new: true }
  );
  if (!updatedSlider) await createSlider({ ...slider, type });
  return getReturnData(updatedSlider);
};

const deleteSlider = async (sliderId: string) => {
  const deletedSlider = await SliderModel.findByIdAndDelete(sliderId);
  return getReturnData(deletedSlider || {});
};

export { getSliders, getSlider, createSlider, updateSlider, deleteSlider };
