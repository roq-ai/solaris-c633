import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getGalleryById, updateGalleryById } from 'apiSdk/galleries';
import { Error } from 'components/error';
import { galleryValidationSchema } from 'validationSchema/galleries';
import { GalleryInterface } from 'interfaces/gallery';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { HospitalInterface } from 'interfaces/hospital';
import { getHospitals } from 'apiSdk/hospitals';

function GalleryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GalleryInterface>(
    () => (id ? `/galleries/${id}` : null),
    () => getGalleryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GalleryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGalleryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/galleries');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GalleryInterface>({
    initialValues: data,
    validationSchema: galleryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Gallery
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="image" mb="4" isInvalid={!!formik.errors?.image}>
              <FormLabel>Image</FormLabel>
              <Input type="text" name="image" value={formik.values?.image} onChange={formik.handleChange} />
              {formik.errors.image && <FormErrorMessage>{formik.errors?.image}</FormErrorMessage>}
            </FormControl>
            <FormControl id="caption" mb="4" isInvalid={!!formik.errors?.caption}>
              <FormLabel>Caption</FormLabel>
              <Input type="text" name="caption" value={formik.values?.caption} onChange={formik.handleChange} />
              {formik.errors.caption && <FormErrorMessage>{formik.errors?.caption}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<HospitalInterface>
              formik={formik}
              name={'hospital_id'}
              label={'Select Hospital'}
              placeholder={'Select Hospital'}
              fetcher={getHospitals}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'gallery',
    operation: AccessOperationEnum.UPDATE,
  }),
)(GalleryEditPage);
