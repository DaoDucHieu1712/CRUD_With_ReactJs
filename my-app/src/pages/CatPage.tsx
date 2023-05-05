import React, { useState } from 'react';
import CatList from '../features/product/components/Linh/CatList';
import AddCat from '../features/product/components/Linh/AddCat';
import { Cat } from '../models/Cat';
import CatApi from '../api/Linh/CatApi';
import { Card, Col, Row, Layout,Input,Button } from 'antd'
import Title from 'antd/es/typography/Title';

const { Content } = Layout;
const CatPage = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  const handleLoad = () => {
    CatApi.getAll().then((response: Cat[]) => {
      setCats(response)
      console.log(response)
    })
  };

  const handleCatAdded = () => {
    CatApi.getAll().then((response: Cat[]) => {
      setCats(response);
      console.log(response);
    })
  };

  return (
    <>
      <Layout style={{ padding: "0 74px" }}>
      <Content style={{ margin: "16px 0" }}>
      
      <Title level={2}>List of Cats</Title>
      <AddCat onLoad={handleCatAdded} />
      
      <CatList cats={cats} onReload={handleLoad} />
      
      </Content>
      </Layout>
    </>
  );
};


export default CatPage;
