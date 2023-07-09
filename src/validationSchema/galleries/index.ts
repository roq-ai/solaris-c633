import * as yup from 'yup';

export const galleryValidationSchema = yup.object().shape({
  image: yup.string().required(),
  caption: yup.string(),
  hospital_id: yup.string().nullable(),
});
