'use client';
import { Button, Form, notification, Popconfirm, Table, Tooltip } from 'antd';

import React from 'react';
import {
  makeTableFilters,
  makeTablePagination,
  scroll,
} from '@/components/tables/config';
import { TABLE_NAME } from '@/components/tables/clients/config';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setServiceFilters } from '@/redux/slice/filtersSlice';
import { IComponentOwnProps } from '@/components/tables/services/types';
import { IService, IServicePrice } from '@/redux/api/service/types';
import { CarType } from '@/enums/car-type';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '@/redux/api/service';
import { useForm } from 'antd/es/form/Form';
import { EditableCell } from '@/components/tables/services/editable-cell';

export const TableServices: React.FC<IComponentOwnProps> = ({
  loading,
  data,
  meta,
}) => {
  const filters = useAppSelector((state) => state.filters.clientFilters);
  const [deleteService, { isLoading }] = useDeleteServiceMutation();
  const [updateService, { isLoading: isUpdating, isSuccess }] =
    useUpdateServiceMutation();
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const [editingKey, setEditingKey] = React.useState('');

  const isEditing = React.useCallback(
    (record: IService) => record.id === editingKey,
    [editingKey],
  );

  const onEdit = React.useCallback(
    (record: IService) => {
      form.setFieldsValue({
        priceForSedan: record.prices.find(
          (price: IServicePrice) => price.carType === CarType.SEDAN,
        )?.price,
        priceForSuv: record.prices.find(
          (price: IServicePrice) => price.carType === CarType.SUV,
        )?.price,
        priceForMinivan: record.prices.find(
          (price: IServicePrice) => price.carType === CarType.MINIVAN,
        )?.price,
        name: record.name,
      });
      setEditingKey(record.id);
    },
    [form],
  );

  const onCancel = () => {
    setEditingKey('');
  };

  const onSave = React.useCallback(async () => {
    const payload = form.getFieldsValue();
    await updateService({
      id: editingKey,
      payload,
    });
    setEditingKey('');
    notification.success({
      message: 'Услуга успешно обновлена',
    });
  }, [editingKey, form, updateService]);

  const renderServiceButtons = React.useCallback(
    (record: IService) => {
      const editing = isEditing(record);
      return (
        <>
          {!editing ? (
            <Tooltip title={'Редактировать услугу'}>
              <Button
                type={'primary'}
                icon={<EditOutlined />}
                size={'small'}
                style={{ margin: '0 8px' }}
                onClick={() => onEdit(record)}
              />
            </Tooltip>
          ) : (
            <Tooltip title={'Сохранить'}>
              <Popconfirm
                title={'Вы действительно хотите сохранить?'}
                okText={'Да'}
                cancelText={'Нет'}
                onConfirm={onSave}
              >
                <Button
                  type={'primary'}
                  icon={<SaveOutlined />}
                  size={'small'}
                  style={{ margin: '0 8px' }}
                />
              </Popconfirm>
            </Tooltip>
          )}
          {!editing ? (
            <Tooltip title={'Удалить услугу'}>
              <Popconfirm
                title={'Вы действительно хотите удалить'}
                okText={'Да'}
                cancelText={'Нет'}
                onConfirm={() => deleteService(record.id)}
              >
                <Button
                  type={'primary'}
                  danger
                  icon={<DeleteOutlined />}
                  size={'small'}
                />
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip title={'Отмена'}>
              <Button
                type={'primary'}
                danger
                icon={<CloseOutlined />}
                size={'small'}
                onClick={onCancel}
              />
            </Tooltip>
          )}
        </>
      );
    },
    [deleteService, isEditing, onEdit, onSave],
  );

  const columns = [
    {
      title: 'Наименование услуги',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      editable: true,
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: 'Цена',
      dataIndex: 'prices',
      key: 'index',
      width: '100%',
      editable: true,
      children: [
        {
          title: 'Легковой',
          dataIndex: 'priceForSedan',
          key: 'SEDAN',
          width: '15%',
          editable: true,
          render: (_: any, record: IService) => {
            const price =
              record?.prices.length > 0 &&
              record.prices.filter(
                (price: IServicePrice) => price.carType === CarType.SEDAN,
              )[0].price;
            return <strong>{price}</strong>;
          },
        },
        {
          title: 'Внедорожник',
          dataIndex: 'priceForSuv',
          key: 'SUV',
          width: '15%',
          editable: true,
          render: (_: any, record: IService) => {
            const price =
              record?.prices.length > 0 &&
              record.prices.filter(
                (price: IServicePrice) => price.carType === CarType.SUV,
              )[0].price;
            return <strong>{price}</strong>;
          },
        },
        {
          title: 'Микроавтобус',
          dataIndex: 'priceForMinivan',
          key: 'MINIVAN',
          width: '15%',
          editable: true,
          render: (_: any, record: IService) => {
            const price =
              record?.prices.length > 0 &&
              record.prices.filter(
                (price: IServicePrice) => price.carType === CarType.MINIVAN,
              )[0].price;
            return <strong>{price}</strong>;
          },
        },
        {
          title: 'Действия',
          width: '10%',
          key: 'actions',
          render: (_: any, record: IService) => renderServiceButtons(record),
        },
      ],
    },
  ];

  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    if (col.children && col.children.length > 0) {
      col.children = col.children.map((item: any) => {
        if (item.editable) {
          return {
            ...item,
            onCell: (record: IService) => ({
              record,
              inputType: 'number',
              dataIndex: item.dataIndex,
              title: item.title,
              editing: isEditing(record),
            }),
          };
        }
        return item;
      });
    }
    return {
      ...col,
      onCell: (record: IService) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        loading={loading || isLoading || isUpdating}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        bordered
        scroll={scroll.lg}
        rowKey={(record) => String(record.id)}
        size={'small'}
        pagination={makeTablePagination(TABLE_NAME, {
          current: filters.page,
          defaultPageSize: filters.limit,
          total: meta?.total,
        })}
        onChange={(pagination: any, filters: any, sorter: any) => {
          onCancel();
          dispatch(
            setServiceFilters(makeTableFilters(pagination, filters, sorter)),
          );
        }}
        columns={mergedColumns}
      />
    </Form>
  );
};
