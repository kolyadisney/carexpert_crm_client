'use client';
import { FormInstance } from 'antd';
import React from 'react';
import debounce from 'lodash.debounce';

export const useFormValidate = (form: FormInstance) => {
  const [isErrors, setIsErrors] = React.useState(true);
  const validate = debounce(() => {
    const values = form.getFieldsValue();
    form.validateFields();
    const isError = Object.values(values).some((value) => !value);
    setIsErrors(isError);
  }, 300);

  return {
    validate,
    isErrors,
  };
};
