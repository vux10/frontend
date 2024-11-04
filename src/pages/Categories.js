import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, useNavigate } from 'react-router-dom';
import CardCategory from '../component/CardCategory';
import { Col, Flex, Layout, Row, Button, Modal, Form, Input, Dropdown, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DownOutlined  } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { fetchCategories } from '../apis';
import ColumnGroup from 'antd/es/table/ColumnGroup';

const { Meta } = Card;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    fontSize: 32,
    marginBottom: 12
  };
  const contentStyle = {
    textAlign: 'center',
    maxHeight: '80vh',
    lineHeight: '120px',
    
    display: 'flex',
    justifyContent: 'center',
  };
  const layoutStyle = {
    overflow: 'hidden',
  };

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    
    const { Header, Footer, Sider, Content } = Layout;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    useEffect( () => {
        const getAllCategories = async () => {
            const data = await fetchCategories()
            setCategories(data)
        }
        getAllCategories();
        
        // const fetchCategories = async () => {
        //     try {
        //         const response = await axios.get("http://localhost:5000/api/v1/category/getAll", { 
        //             headers: { "Content-Type": "application/json" },
        //         });
        //         if (response.status === 200) setCategories(response.data);
        //     } catch (error) {
        //         console.log(error?.message); 
        //     }
        // };

        // const fetchProducts = async () => {
        //     try {
        //         const productResponse = await axios.get("http://localhost:5000/api/v1/products/");
        //         if (productResponse.status === 200) setProducts(productResponse.data);
        //     } catch (error) {
        //         console.log(error?.message);
        //     }
        // };

        // fetchCategories();
        // fetchProducts();
    }, []);

    return (
        
        <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>Category</Header>
          <div style={{ marginLeft: 24}}>
                
          <Button type="primary" onClick={showModal}>
                Add New Category
            </Button>
            <Modal title="Add New Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                
            >
                <Form.Item
                label="Category Name"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your Category Name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                </Form.Item>
            </Form>
            </Modal>
            </div>
          
          <Content style={contentStyle}>
            
            
            <Row className='Categories' >
            
            
                {categories.map((category) => (
                    
                    <Col span={6} key={category._id} style={{
                        display:'flex',
                        justifyContent: 'center'
                    }} >
                        {/* <CardActionArea
                            onClick={() => navigate(`products?category=${category._id}`)}
                            className="flex-center"
                        >
                            <CardCategory category={category} products={products} />
                        </CardActionArea> */}
                        <Link to={`/category/${category?._id}`}>
                            <Card
                                style={{
                                width: 300,
                                display:'flex',
                                justifyContent: 'center'
                                }}
                            >
                                    <Meta
                                    avatar={<Avatar src={category?.icon} />}
                                    title={category?.name}
                                    />
                                    <div className='button-group' style={{
                                        marginTop: 16,
                                        display:'flex',
                                        flexDirection: 'column', 
                                        justifyContent: 'center',
                                        overflow: 'auto',
                                        width: 240
                                    }}>
                                        <Button  type="primary" >
                                                Edit
                                        </Button>
                                        <Button danger type="primary" >
                                                Delete
                                        </Button>
                                    </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>  
          </Content>
        </Layout>

        
      </Flex>
    );
}