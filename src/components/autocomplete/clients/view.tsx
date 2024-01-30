'use client';
import React from 'react';
import { TBrandsAutoCompleteProps } from './types';
import { AutoComplete, AutoCompleteProps, Form } from 'antd';
import { IClient } from '@/redux/api/client/types';
import { useGetClientsQuery } from '@/redux/api/client';
import { useAppDispatch } from '@/redux/hook';
import { setModalPrivateData } from '@/redux/slice/modalSlice';

export const ClientsAutocomplete: React.FC<TBrandsAutoCompleteProps> = ({
  label,
  name,
  rules,
}) => {
  const { data: clientsData } = useGetClientsQuery({});
  const [clients, setClients] = React.useState<IClient[] | undefined>([]);
  const dispatch = useAppDispatch();

  const options: AutoCompleteProps['options'] = React.useMemo(
    () =>
      clients &&
      clients?.map((client: IClient) => ({
        label: `${client.first_name} ${client.last_name}`,
        value: `${client.first_name} ${client.last_name}`,
        name: client.id,
      })),
    [clients],
  );
  React.useEffect(() => {
    clientsData?.data && setClients(clientsData?.data);
  }, [clientsData]);
  const onSearch = (value: string) => {
    const clients = clientsData?.data.filter(
      (client: IClient) =>
        client.first_name.toLowerCase().includes(value.toLowerCase()) ||
        client.last_name.toLowerCase().includes(value.toLowerCase()),
    );
    setClients(clients);
  };
  const onSelect = (_: any, params: any) => {
    dispatch(
      setModalPrivateData({
        client_id: params.name,
      }),
    );
  };
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <AutoComplete
        showSearch
        size="middle"
        defaultActiveFirstOption={false}
        filterOption={false}
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        // @ts-ignore
        autoComplete="random-string"
      />
    </Form.Item>
  );
};
