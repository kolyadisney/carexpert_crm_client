'use client';
import { Col, Form, Input, Row } from 'antd';
import { useAppDispatch } from '@/redux/hook';
import debounce from 'lodash.debounce';
import { setServiceSearchText } from '@/redux/slice/filtersSlice';

export const ServiceFilter = () => {
  const dispatch = useAppDispatch();

  const onSearch = debounce((values) => {
    dispatch(setServiceSearchText(values.searchText));
  }, 500);
  return (
    <Row>
      <Col span={8}>
        <Form onValuesChange={onSearch}>
          <Form.Item name={'searchText'}>
            <Input type={'text'} placeholder={'Поиск'} allowClear />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
