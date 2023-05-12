import React, { useState } from 'react';
import CandyList from '../features/product/components/Tung/CandyList';
import AddCandy from '../features/product/components/Tung/AddCandy';
import { Candy } from '../models/Candy';
import CandyApi from '../api/Tung/CandyApi';
import { Card, Col, Row, Layout,Input,Button } from 'antd'
import Title from 'antd/es/typography/Title';

const { Content } = Layout;
const CandyPage = () => {
  const [candys, setCandys] = useState<Candy[]>([]);

  const handleLoad = () => {
    CandyApi.getAll().then((response: Candy[]) => {
      setCandys(response)
      console.log(response)
    })
  };

  const handleCatAdded = () => {
    CandyApi.getAll().then((response: Candy[]) => {
      setCandys(response);
      console.log(response);
    })
  };

  return (
    <>
      <Layout style={{ padding: "0 74px" }}>
      <Content style={{ margin: "16px 0" }}>
      
      <Title level={2}>List of Candy</Title>
      <AddCandy onLoad={handleCatAdded} />
      
      <CandyList candys={candys} onReload={handleLoad} />
      
      </Content>
      </Layout>
    </>
  );
};


export default CandyPage;
