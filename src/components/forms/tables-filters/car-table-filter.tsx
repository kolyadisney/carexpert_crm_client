import React from 'react';
import { Form, Input } from 'antd';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '@/redux/hook';
import { setCarSearchText } from '@/redux/slice/filtersSlice';

export const CarTableFilter = () => {
  const dispatch = useAppDispatch();

  const onSearch = debounce((values) => {
    dispatch(setCarSearchText(values.searchText));
  }, 500);
  return (
    <Form onValuesChange={onSearch}>
      <Form.Item name={'searchText'}>
        <Input type={'text'} placeholder={'Поиск'} allowClear />
      </Form.Item>
    </Form>
  );
};
