'use client';
import React from 'react';
import { Typography, Button, Col, Row, Tooltip } from 'antd';
import { TComponentProps } from './types';

export const PageHeading: React.FC<TComponentProps> = (props) => {
  const { title, actions = [] } = props;

  return (
    <div className={'app-page-heading'}>
      <Row gutter={[12, 12]} justify={'space-between'} align={'middle'}>
        <Col>
          <Typography.Title
            level={4}
            className={'app-page-heading__title'}
            style={{ color: 'rgb(229, 231, 235)' }}
          >
            {title}
          </Typography.Title>
        </Col>
        <Col>
          {actions.length ? (
            <Row gutter={[12, 12]}>
              {actions.map((action, idx) => {
                const { tooltip, button, customElement } = action;
                const { title, placement = 'top' } = tooltip || {};
                const { text, size = 'middle', ...buttonProps } = button || {};

                return (
                  <Col key={idx}>
                    {!button && customElement ? (
                      <div>{customElement}</div>
                    ) : (
                      <Tooltip title={title} placement={placement}>
                        {text && text.length ? (
                          <Button size={size} {...buttonProps}>
                            {text}
                          </Button>
                        ) : (
                          <Button size={size} {...buttonProps} />
                        )}
                      </Tooltip>
                    )}
                  </Col>
                );
              })}
            </Row>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};
