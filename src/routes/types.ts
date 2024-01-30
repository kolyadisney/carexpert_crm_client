import { IconDefinition } from '@ant-design/icons-svg/es/types';

export interface IRoute {
  path: string;
  name(...args: any[]): string;
  link(...args: any[]): string;
  icon?: JSX.Element;
  isMenuItem?: boolean;
  children?: TPageNames[];
}

export type TPageNames =
  | 'login'
  | 'dashboard'
  | 'users'
  | 'clients'
  | 'client'
  | 'cars'
  | 'car'
  | 'orders'
  | 'order'
  | 'parts'
  | 'appointments'
  | 'settings'
  | 'profile'
  | 'services';

export type IRoutesTree = Record<TPageNames, IRoute>;
