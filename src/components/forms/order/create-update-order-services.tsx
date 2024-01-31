import React from 'react';
import { Button, Form, Input, Table, TableProps, Tag } from 'antd';
import { IService } from '@/redux/api/service/types';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetAllServicesQuery } from '@/redux/api/service';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import debounce from 'lodash.debounce';
import { setServiceSearchText } from '@/redux/slice/filtersSlice';
import { ICreateUpdateOrderServicesFormProps } from '@/components/forms/order/types';
import { closeModal } from '@/redux/slice/modalSlice';
import { useAddServicesToOrderMutation } from '@/redux/api/order';
import { IOrderService } from '@/redux/api/order/types';

export const CreateUpdateOrderServicesForm: React.FC<
  ICreateUpdateOrderServicesFormProps
> = ({ order_id, initialValues }) => {
  const serviceFilters = useAppSelector(
    (state) => state.filters.serviceFilters,
  );

  const [services, setServices] = React.useState<string[]>([]);
  const { data, isLoading } = useGetAllServicesQuery(serviceFilters);
  const [addServicesToOrder, { isLoading: isAdding }] =
    useAddServicesToOrderMutation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const initialOrderServices = initialValues?.map(
      (item: IOrderService) => item.service_id,
    );
    initialOrderServices && setServices(initialOrderServices);
  }, [initialValues]);

  const onSubmit = async () => {
    await addServicesToOrder({
      order_id,
      services_id: services,
    });
    dispatch(closeModal());
  };

  const onSearch = debounce((values) => {
    dispatch(setServiceSearchText(values.searchText));
  }, 500);
  const columns: TableProps<IService>['columns'] = [
    {
      title: 'Название услуги',
      dataIndex: 'name',
      render: (name: string) => {
        return name;
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: IService) => {
        const isAdded = services.includes(record.id);
        return (
          <>
            {!isAdded ? (
              <Button
                type={'primary'}
                size={'small'}
                icon={<PlusOutlined />}
                onClick={() => setServices((prev) => [...prev, record.id])}
              />
            ) : (
              <Button
                type={'primary'}
                size={'small'}
                danger
                icon={<CloseOutlined />}
                onClick={() =>
                  setServices((prev) =>
                    prev.filter((id: string) => id !== record.id),
                  )
                }
              />
            )}
          </>
        );
      },
    },
  ];

  const renderSelectedTags = React.useCallback(() => {
    const servicesNames = data?.data.filter((service: IService) =>
      services.includes(service.id),
    );
    return servicesNames?.map((service: IService) => (
      <Tag
        closable
        key={service.id}
        className={'mb-2'}
        onClose={() =>
          setServices((prev) => prev.filter((id: string) => id !== service.id))
        }
      >
        {service.name}
      </Tag>
    ));
  }, [data?.data, services]);
  return (
    <Form onValuesChange={onSearch} onFinish={onSubmit} layout={'vertical'}>
      <Form.Item label={'Выбранные услуги'}>
        <div
          className={
            'border border-[#424242] bg-[#141414] min-h-[40px] rounded p-2 pb-px'
          }
        >
          {renderSelectedTags()}
        </div>
      </Form.Item>
      <Form.Item name={'searchText'}>
        <Input type={'text'} placeholder={'Поиск'} allowClear />
      </Form.Item>
      <Table
        dataSource={data?.data || []}
        columns={columns}
        loading={isLoading}
        size={'small'}
      />
      <Button
        type={'primary'}
        htmlType={'submit'}
        className={'mt-6'}
        loading={isAdding}
      >
        Сохранить
      </Button>
    </Form>
  );
};
