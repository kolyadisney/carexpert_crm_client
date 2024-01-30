'use client';
import React from 'react';
import { TBrandsAutoCompleteProps } from './types';
import { array2options } from '@/utils/convert';
import { AutoComplete, Form, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { useGetCarBrandQuery } from '@/redux/api/car';
import { useAppDispatch } from '@/redux/hook';
import { setCarModels } from '@/redux/slice/carSlice';

export const BrandsAutocomplete: React.FC<TBrandsAutoCompleteProps> = ({
  form,
  label,
  name,
  rules,
}) => {
  const dispatch = useAppDispatch();
  const { data: carBrands, isLoading, refetch } = useGetCarBrandQuery({});
  const [carBrandsData, setCarBrandsData] = React.useState(carBrands);
  React.useEffect(() => {
    setCarBrandsData(carBrands);
  }, [carBrands]);
  const onBrandSearch = debounce(async (value) => {
    const filteredCarBrands = carBrands.filter((brand: any) =>
      brand.name.includes(value),
    );
    setCarBrandsData(filteredCarBrands);
  }, 600);

  const onSelect = (value: string) => {
    const selectedCarBrand = carBrands.find(
      (brand: any) => brand.name === value,
    );
    dispatch(setCarModels(selectedCarBrand.models));
  };

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <AutoComplete
        showSearch
        size="middle"
        defaultActiveFirstOption={false}
        filterOption={false}
        notFoundContent={isLoading ? <Spin /> : 'No matches'}
        onSelect={onSelect}
        onSearch={onBrandSearch}
        // @ts-ignore
        autoComplete="random-string"
      >
        {array2options({
          source: carBrandsData,
          keyMap: { value: 'name', text: 'name' },
          optionType: 'autocomplete',
        })}
      </AutoComplete>
    </Form.Item>
  );
};
