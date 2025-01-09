import { Schema, Types, model } from 'mongoose';
import { ISlider, ISliderModel } from '../interfaces/slider.interface';
import { formatAttributeName } from '../utils';
import { SLIDER } from '../constants';

const sliderSchema = new Schema<ISlider, ISliderModel>(
  {
    sld_type: { type: String, trim: true, unique: true, required: true },
    sld_images: {
      type: [{ url: String, alt: String, link: String }],
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: SLIDER.COLLECTION_NAME,
  }
);

sliderSchema.statics.build = (attrs: ISlider) => {
  return SliderModel.create(formatAttributeName(attrs, SLIDER.PREFIX));
};

export const SliderModel = model<ISlider, ISliderModel>(
  SLIDER.DOCUMENT_NAME,
  sliderSchema
);
