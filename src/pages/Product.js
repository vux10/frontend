import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Col, Flex, Layout, Row, Modal, Form, Input, Dropdown, Space, Button, Typography, Card } from 'antd';
import { fetchAllProductByCategoryId } from '../apis';

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
  };
  const layoutStyle = {
    overflow: 'hidden',
  };

  const { Header, Footer, Sider, Content } = Layout;

  const cardStyle = {
    width: 620,
  };
  const imgStyle = {
    display: 'block',
    width: 273,
  };

const Product = () => {
    const [products, setProducts] = useState([]); 
    const location = useLocation();

    const idCategory = location.pathname.split('/')[2]
    console.log('idCategory: ', idCategory)

    useEffect( () => {
        const getAllProductByCategoryId = async (idCategory) => {
            const data = await fetchAllProductByCategoryId(idCategory)
            console.log('data: ', data)
            setProducts(data)
        }
        getAllProductByCategoryId(idCategory);
    }, []);

    return (
        <>
            <Flex gap="middle" wrap>
            <Layout style={layoutStyle}>
            <Header style={headerStyle}>Product List</Header>
            
            
            <Content style={contentStyle}>
              <Row>
              {products.map(product => {
                return (
                  <>
                    <Col span={12} key={product?._id} style={{
                        display:'flex',
                        justifyContent: 'center',
                        padding: 12
                    }} >
                      <Card
                        hoverable
                        style={cardStyle}
                        styles={{
                          body: {
                            padding: 0,
                            overflow: 'hidden',
                            
                          },
                        }}
                      >
                        <Flex justify="space-between">
                          <img
                            alt="avatar"
                            src='https://elma2024.000webhostapp.com/images/products/z5191075237897_5e39629a50b47b2f3de27441918c8ff3.jpg'
                            style={imgStyle}
                          />
                          <Flex
                            vertical
                            align="flex-end"
                            justify="space-between"
                            style={{
                              padding: 32,
                            }}
                          >
                            <Typography.Title level={4}>
                              <p>{product?.name}</p>
                            </Typography.Title>
                            
                            <desc><b>Description: </b>{product?.description}</desc>
                            <p><b>Price: </b>{product?.price}</p>
                            <p><b>Brand: </b>{product?.brand}</p>
                            <p><b>Rating: </b>{product?.rating}</p>
                            <p><b>Quantity: </b>{product?.quantity}</p>
                            {product?.isBestSeller && <p>{product?.isBestSeller}</p>}
                            
                            <Flex>
                              <Button type="primary" href="" target="_blank">
                                Edit
                              </Button>
                              <Button type="primary" danger href="" target="_blank">
                                Delete
                              </Button>
                            </Flex>
                            
                          </Flex>
                        </Flex>
                      </Card>
                      </Col>
                  </>
                )
              })}
              </Row>
            </Content>
            </Layout>

            
        </Flex>
        </>
    );
};

export default Product;
