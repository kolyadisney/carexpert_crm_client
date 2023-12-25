import React from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import {TComponentProps} from "@/components/loader/types";

export const Loader: React.FC<TComponentProps> = (props) => {
    return <LoadingOutlined size={40} style={{ fill: '#fff' }} {...props}/>
};
