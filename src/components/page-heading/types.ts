import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ButtonHTMLType, ButtonShape, ButtonType } from 'antd/es/button';
import { TooltipProps } from 'antd';
import React from 'react';

export interface IPageHeadingAction {
  tooltip?: TooltipProps;
  button?: {
    href?: string;
    type?: ButtonType;
    htmlType?: ButtonHTMLType;
    icon?: any;
    text?: string;
    loading?: boolean;
    shape?: ButtonShape;
    className?: string;
    onClick?(): void;
    target?: string;
    size?: SizeType;
    danger?: boolean;
  } | null;
  customElement?: any;
}
export interface IPageHeadingOwnProps {
  title: React.ReactNode;
  actions?: IPageHeadingAction[];
}

export type TComponentProps = IPageHeadingOwnProps & IPageHeadingAction;
