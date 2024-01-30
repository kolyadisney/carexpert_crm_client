'use client';
import React from 'react';
import { ICategories, TServiceCategoryAutoCompleteProps } from './types';
import { array2options } from '@/utils/convert';
import { AutoComplete, Form } from 'antd';
import debounce from 'lodash.debounce';
import { useGetAllServicesWithCategoryQuery } from '@/redux/api/service';
import { IServicesWithCategory } from '@/redux/api/service/types';
import { setModalPrivateData } from '@/redux/slice/modalSlice';
import { useAppDispatch } from '@/redux/hook';

export const ServiceCategoryAutocomplete: React.FC<
  TServiceCategoryAutoCompleteProps
> = ({ label, name, rules, initialCategoryName }) => {
  const { data, isLoading } = useGetAllServicesWithCategoryQuery({});
  const dispatch = useAppDispatch();
  const [categories, setCategories] = React.useState<
    IServicesWithCategory[] | undefined
  >([]);
  React.useEffect(() => {
    setCategories(data?.data);
  }, [data]);
  const options = React.useMemo(() => {
    return categories?.map((category) => ({
      label: category.name,
      value: category.name,
      name: category.id,
    }));
  }, [categories]);
  const onSearch = (value: string) => {
    const filteredCategories = data?.data?.filter((category: ICategories) =>
      category.name.toLowerCase().includes(value.toLowerCase()),
    );
    setCategories(filteredCategories);
  };
  const onSelect = (_: any, params: any) => {
    dispatch(
      setModalPrivateData({
        category_id: params.name,
      }),
    );
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <AutoComplete
        showSearch
        size="middle"
        defaultActiveFirstOption={false}
        filterOption={false}
        onSearch={onSearch}
        onSelect={onSelect}
        options={options}
        defaultValue={initialCategoryName}
        // @ts-ignore
        autoComplete="random-string"
      />
    </Form.Item>
  );
};
