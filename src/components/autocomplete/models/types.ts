import { AutoCompleteProps, FormInstance } from 'antd';
import { Rule } from 'async-validator';

export interface IBrandsAutoCompleteOwnProps {
  form: FormInstance;
  label: string;
  name: string;
  rules: any;
}

export type TBrandsAutoCompleteProps = IBrandsAutoCompleteOwnProps &
  AutoCompleteProps;
