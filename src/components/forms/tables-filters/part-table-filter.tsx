import React from 'react';
import { Form, Input } from 'antd';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '@/redux/hook';
import {
  setCarSearchText,
  setPartSearchText,
} from '@/redux/slice/filtersSlice';

export const PartTableFilter = () => {
  const dispatch = useAppDispatch();

  const onSearch = debounce((values) => {
    dispatch(setPartSearchText(values.searchText));
  }, 500);
  return (
    <Form onValuesChange={onSearch}>
      <Form.Item name={'searchText'}>
        <Input type={'text'} placeholder={'Поиск'} allowClear />
      </Form.Item>
    </Form>
  );
};
