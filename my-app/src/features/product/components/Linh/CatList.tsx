import React, {  useEffect, useState } from 'react'
import { Card, Col, Row, Layout,notification,Modal,Input,Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CatApi from '../../../../api/Linh/CatApi'
import { Cat } from '../../../../models/Cat'

const { Meta } = Card;
const { Content } = Layout;
interface CatListProps {
  cats: Cat[];
  onReload: () => void;
}
const CatList = ({ cats, onReload }: CatListProps) => {
    const [catList, setCatList] = useState<Cat[]>([])
    useEffect(() => {
      CatApi.getAll().then((response: Cat[]) => {
        setCatList(response)
        console.log(response)
      })
    }, [cats])

    
    const handleDelete = (id: number) => {
      CatApi.delete(id)
        .then(() => {
          const updatedCatList = catList.filter((cat) => cat.id !== id);
          setCatList(updatedCatList);
          notification.success({
            message: 'Delete success',
            description: `Cat with ID ${id} has been deleted.`,
          });
        })
        .catch((error) => {
          console.error('Failed to delete cat:', error);
          notification.error({
            message: 'Delete failed',
            description: `Failed to delete cat with ID ${id}. Please try again later.`,
          });
        });
    };
    
      

  return (
    <>
     <Layout style={{ padding: "0 50px" }}>
      <Content style={{ margin: "16px 0" }}>
      
        <div style={{padding: 24, minHeight: 280 }}>    
            <Row gutter={[40,32]}>
        {catList.map((cat:Cat) => (
          <Col span={6} key={cat.id}>
            <Card
              hoverable
              cover={<img alt={cat.name} height={250} src={cat.avatar} />}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(cat.id)} /> 
              ]}
            >
              <Row>
        <Col span={30} offset={6}>
        <Meta title={cat.name} description={cat.price} />
        </Col>
      </Row>
             
            </Card>
          </Col>
        ))}
      </Row>
      
        </div>
        
      </Content>
    </Layout>
    </>
   
   
    
);
}

export default CatList;