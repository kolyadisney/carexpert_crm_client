import React from 'react';
import {IEllipsis, TTruncateProps} from "./types";
import classNames from "classnames";
import {Col, Row, Typography} from "antd";

const ellipsisDefaults: IEllipsis = {
    rows: 3,
    expandable: false,
    onExpand: () => {},
};

export const Truncate: React.FC<TTruncateProps> = (props) => {
    const { key, type, copy, children, className } = props;
    const { ellipsis = ellipsisDefaults } = props;
    const rootClasses = classNames('truncate', className);
    return children ? (
        <div key={key} className={rootClasses}>
            <Row className={'_flex-nowrap'} gutter={4}>
                {!!copy && (
                    <Col className={'truncate__icon-col'}>
                        <Typography.Text className={'truncate__icon'} copyable={{ text: copy }} />
                    </Col>
                )}
                <Col className={'truncate__content-col'}>
                    {type === 'email' && (
                        <Typography.Paragraph className={'truncate__content'} ellipsis={true}>
                            <a href={`mailto:${copy}`}>{children}</a>
                        </Typography.Paragraph>
                    )}
                    {type === 'fax' && (
                        <Typography.Paragraph className={'truncate__content'} ellipsis={true}>
                            <span>{children}</span>
                        </Typography.Paragraph>
                    )}
                    {type === 'phone' && (
                        <Typography.Paragraph className={'truncate__content'} ellipsis={true}>
                            <a href={`tel:${copy}`}>{children}</a>
                        </Typography.Paragraph>
                    )}
                    {type === 'address' && (
                        <Typography.Paragraph className={'truncate__content'} ellipsis={ellipsis}>
                            <span>{children}</span>
                        </Typography.Paragraph>
                    )}
                    {type === 'text' && (
                        <Typography.Paragraph className={'truncate__content'} ellipsis={ellipsis}>
                            <span>{children}</span>
                        </Typography.Paragraph>
                    )}
                </Col>
            </Row>
        </div>
    ) : null;
};
