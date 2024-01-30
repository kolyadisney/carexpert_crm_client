import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { EditableCellProps } from '@/components/tables/services/types';

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber style={{ width: '100%', maxWidth: '100%' }} />
    ) : (
      <Input style={{ width: '100%', maxWidth: '100%' }} />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
