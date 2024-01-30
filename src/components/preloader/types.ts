import React from 'react';
import { SpinProps } from 'antd/lib/spin';

/**
 * Common
 * */
export type TPreloaderTypes = 'spin' | 'linear';



/**
 * IOwnProps
 * */
export interface IPreloaderOwnProps extends SpinProps {
    children?: React.ReactNode;
    type?: TPreloaderTypes;
    hideChildren?: boolean;
    centered?: boolean;
}


/**
 * TComponentProps
 * */
export type TPreloaderProps = IPreloaderOwnProps;
