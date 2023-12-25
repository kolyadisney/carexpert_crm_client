import React from 'react';
import {IBoxProps} from "@/components/box/types";

export const Box: React.FC<IBoxProps> = ({children}) => {
    return (
        <div className={'app-box'}>
            {children}
        </div>
    );
};
