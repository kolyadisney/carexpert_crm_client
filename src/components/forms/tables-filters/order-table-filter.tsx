import React from 'react';
import { Col, Form, Input, Row, Select, Tag } from 'antd';
import debounce from 'lodash.debounce';
import { useAppDispatch } from '@/redux/hook';
import {
  setOrderFilters,
  setOrderSearchText,
} from '@/redux/slice/filtersSlice';
import { OrderStatusColor, OrderStatusName } from '@/enums/order-status';

export const OrderTableFilter = () => {
  const dispatch = useAppDispatch();

  const onSearch = debounce((values) => {
    dispatch(setOrderSearchText(values.searchText));
  }, 500);
  const onSelectStatus = (value: string) => {
    dispatch(
      setOrderFilters({
        status: value,
      }),
    );
  };
  return (
    <Form onValuesChange={onSearch} layout={'vertical'}>
      <Row gutter={[15, 15]}>
        <Col span={8}>
          <Form.Item name={'searchText'} label={'Поиск'}>
            <Input type={'text'} placeholder={'Поиск'} allowClear />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={'Статус'}>
            <Select defaultValue={''} onSelect={onSelectStatus}>
              <Select.Option key={''}>Все</Select.Option>
              {Object.keys(OrderStatusName).map((status: any) => (
                <Select.Option key={status}>
                  <Tag className={OrderStatusColor[status]}>
                    {OrderStatusName[status]}
                  </Tag>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
