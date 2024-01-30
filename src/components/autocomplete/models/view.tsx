import React from 'react';
import { TBrandsAutoCompleteProps } from './types';
import { array2options } from '@/utils/convert';
import { AutoComplete, Form, Select } from 'antd';
import { useAppSelector } from '@/redux/hook';

export const ModelsAutocomplete: React.FC<TBrandsAutoCompleteProps> = ({
  label,
  name,
  rules,
}) => {
  const models: any = useAppSelector((state) => state.carBrand.models);
  const [modelsData, setModelsData] = React.useState(models);
  const onSearch = (value: string) => {
    const filteredModels = models.filter((model: any) =>
      model.name.toLowerCase().includes(value.toLowerCase()),
    );
    setModelsData(filteredModels);
  };
  React.useEffect(() => {
    setModelsData(models);
  }, [models]);
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <Select
        showSearch
        onSearch={onSearch}
        size="middle"
        defaultActiveFirstOption={false}
        filterOption={false}
        // @ts-ignore
        autoComplete="random-string"
      >
        {modelsData?.map((model: any) => (
          <Select.Option key={model?.name}>{model?.name}</Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
