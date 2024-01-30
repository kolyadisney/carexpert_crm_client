import { AutoCompleteProps, FormInstance } from 'antd';
import { Rule } from 'async-validator';

export interface IServiceCategoryAutoCompleteOwnProps {
  form: FormInstance;
  label: string;
  name: string;
  rules?: any;
  initialCategoryName?: string;
}

export interface ICategories {
  name: string;
  id: string;
}

export type TServiceCategoryAutoCompleteProps =
  IServiceCategoryAutoCompleteOwnProps & AutoCompleteProps;
