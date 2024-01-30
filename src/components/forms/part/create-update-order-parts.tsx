import React from 'react';
import { Button, Form, Input, InputNumber, Table, TableProps, Tag } from 'antd';
import { ICreateUpdateOrderPartsFormProps } from '@/components/forms/part/types';
import { useGetAllPartsQuery } from '@/redux/api/part';
import { IOrderPart } from '@/redux/api/order/types';
import { closeModal } from '@/redux/slice/modalSlice';
import debounce from 'lodash.debounce';
import {
  setPartFilters,
  setPartSearchText,
  setServiceSearchText,
} from '@/redux/slice/filtersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { IPart } from '@/redux/api/part/types';
import { useAddPartsToOrderMutation } from '@/redux/api/order';

export const CreateUpdateOrderPartsForm: React.FC<
  ICreateUpdateOrderPartsFormProps
> = ({ order_id, initialValues }) => {
  const [addPartsToOrder, { isLoading: isAdding }] =
    useAddPartsToOrderMutation();
  const partFilters = useAppSelector((state) => state.filters.partFilters);
  const dispatch = useAppDispatch();
  const [parts, setParts] = React.useState<string[]>([]);
  const { data, isLoading } = useGetAllPartsQuery(partFilters);
  React.useEffect(() => {
    const initialOrderParts = initialValues?.map(
      (item: IOrderPart) => item.car_part_id,
    );
    initialOrderParts && setParts(initialOrderParts);
  }, [initialValues]);
  const onSubmit = async (values: any) => {
    const payload = parts.map((id: string) => ({
      id,
      quantity: values[id],
    }));

    await addPartsToOrder({
      order_id,
      car_parts: payload,
    });
    dispatch(closeModal());
  };

  const onSearch = debounce((values) => {
    dispatch(setPartSearchText(values.searchText));
  }, 500);

  const columns: TableProps<IPart>['columns'] = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      render: (name: string) => {
        return name;
      },
    },
    {
      title: 'Кол-во, шт.',
      dataIndex: 'quantity',
      render: (_: any, record: IPart) => {
        return (
          <Form.Item name={record.id} className={'!m-0'} initialValue={1}>
            <InputNumber size={'small'} className={'text-center'} />
          </Form.Item>
        );
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_: any, record: IPart) => {
        const isAdded = parts.includes(record.id);
        return (
          <>
            {!isAdded ? (
              <Button
                type={'primary'}
                size={'small'}
                icon={<PlusOutlined />}
                onClick={() => setParts((prev) => [...prev, record.id])}
              />
            ) : (
              <Button
                type={'primary'}
                size={'small'}
                danger
                icon={<CloseOutlined />}
                onClick={() =>
                  setParts((prev) =>
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
    const partNames = data?.data.filter((part: IPart) =>
      parts.includes(part.id),
    );
    return partNames?.map((part: IPart) => (
      <Tag
        closable
        key={part.id}
        className={'mb-2'}
        onClose={() =>
          setParts((prev) => prev.filter((id: string) => id !== part.id))
        }
      >
        {part.name}
      </Tag>
    ));
  }, [data?.data, parts]);
  return (
    <Form onValuesChange={onSearch} onFinish={onSubmit} layout={'vertical'}>
      <Form.Item label={'Выбранные запчасти'}>
        <div
          className={
            'border border-[#424242] bg-[#141414] min-h-[40px] rounded p-2 pb-px'
          }
        >
          {renderSelectedTags()}
        </div>
      </Form.Item>
      <Form.Item name={'searchText'}>
        <Input type={'text'} placeholder={'Поиск'} />
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
