import React, { Fragment, useEffect, useState } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import FinanceApi from '../../../../api/Vinh/FinanceApi';
import { Finance } from '../../../../models/Finance';
import FinanceItem from './FinanceItem';

const FinanceList = () => {
  const [financeList, setFinanceList] = useState<Finance[]>([]);

  // return FinanceApi.getAll() là 1 promise => return response là 1 Finance[] => return Promise<Finance[]>
  const loadData = (): Promise<Finance[]> => {
    return FinanceApi.getAll().then((response: Finance[]) => {
      setFinanceList(response);
      return response;
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Fragment>
      {financeList.length == 0 ? (
        <Spin />
      ) : (
        <Row gutter={16}>
          {financeList.map((finance: Finance) => (
            <FinanceItem
              id={finance.id}
              key={finance.id}
              description={finance.description}
              createdAt={finance.createdAt}
              price={finance.price}
              type={finance.type}
              onLoad={loadData}
            />
          ))}
        </Row>
      )}
    </Fragment>
  );
};

export default FinanceList;
