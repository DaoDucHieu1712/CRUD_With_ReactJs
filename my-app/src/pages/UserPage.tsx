import React, { useState } from 'react';
import UserList from '../features/product/components/Tuan/UserList';
import AddUser from '../features/product/components/Tuan/AddUser';
import { User } from '../models/User';
import UserApi from '../api/Tuan/UserApi';
import { Card, Col, Row, Layout,Input,Button } from 'antd'
import Title from 'antd/es/typography/Title';

const { Content } = Layout;
const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleLoad = () => {
    UserApi.getAll().then((response: User[]) => {
      setUsers(response)
      console.log(response)
    })
  };

  const handleUserAdded = () => {
    UserApi.getAll().then((response: User[]) => {
      setUsers(response);
      console.log(response);
    })
  };

  return (
    <>
      <Layout style={{ padding: "0 74px" }}>
      <Content style={{ margin: "16px 0" }}>
      
      <Title level={2}>List of Users</Title>
      <AddUser onLoad={handleUserAdded} />
      
      <UserList users={users} onReload={handleLoad} />
      
      </Content>
      </Layout>
    </>
  );
};


export default UserPage;
