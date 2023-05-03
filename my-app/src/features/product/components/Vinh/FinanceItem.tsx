import React, { Fragment } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import Icon, { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import FinanceApi from '../../../../api/Vinh/FinanceApi';
import { toast } from 'react-toastify';

interface ProductItemProps {
  id: number;
  type: string;
  createdAt: Date;
  price: number;
  description: string;
  onLoad: Function;
}

const FinanceItem = (props: ProductItemProps) => {
  const handlerDelete = (id: number) => {
    FinanceApi.deleteFinance(id)
      .then(res => {
        props.onLoad();
        toast.success('Delete Success');
      })
      .catch(err => {
        toast.error('Error');
      });
  };

  const handlerEdit = (id: number) => {
    FinanceApi.getFinance(id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        toast.error('Error');
      });
  };
  return (
    <Col span={8} style={{ marginTop: 16, marginBottom: 16 }}>
      <Card
        title={`${props.type} - ${props.createdAt} - ${props.price}`}
        extra={
          <Fragment>
            <EditOutlined style={{ cursor: 'pointer' }} onClick={() => handlerEdit(props.id)} />
            <DeleteOutlined style={{ cursor: 'pointer', padding: '20px' }} onClick={() => handlerDelete(props.id)} />
          </Fragment>
        }
        bordered={false}
      >
        {props.description}
      </Card>
    </Col>
  );
};

export default FinanceItem;
