import { AutoCompleteProps, FormInstance } from 'antd';

export interface IBrandsAutoCompleteOwnProps {
  form: FormInstance;
  label: string;
  name: string;
  rules: any;
}

export type TBrandsAutoCompleteProps = IBrandsAutoCompleteOwnProps &
  AutoCompleteProps;
