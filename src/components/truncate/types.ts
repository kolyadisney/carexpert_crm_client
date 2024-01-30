import React from "react";

export type TCopyTypes = 'email' | 'fax' | 'address' | 'text' | 'phone';

export interface IEllipsis {
    rows?: number;
    expandable?: boolean;
    onExpand?: () => void;
}

export interface ITruncateOwnProps {
    key?: string;
    type: TCopyTypes;
    copy?: string;
    ellipsis?: IEllipsis;
    className?: string;
    children: React.ReactNode;
}

export type TTruncateProps = ITruncateOwnProps;
