import React from "react";
import {Spin} from "antd";
import classnames from "classnames";
import {TPreloaderProps} from "./types";

export const Preloader: React.FC<TPreloaderProps> = (props) => {
    const { children, hideChildren = false, className = '', ...spinProps } = props;
    const rootClasses = classnames('preloader', className);

    return (
        <div className={rootClasses}>
            <Spin
                {...spinProps}
            >
                {hideChildren ? null : children}
            </Spin>
        </div>
    );
};
