import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Flex, Layout, Row, Modal, Form, Input, Button, Typography, Card, Image } from 'antd';
import { deleteProduct, fetchAllProductByCategoryId, postCreateNewProduct, putUpdateProduct } from '../apis';

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

  const { Header, Content } = Layout;

  const cardStyle = {
    width: 620,
  };
  const imgStyle = {
    display: 'block',
    width: 273,
  };

const Product = () => {
    const [products, setProducts] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false); // State to determine whether we're in edit mode or not
    const [currentProduct, setCurrentProduct] = useState(null); // For storing the product being edited
    
    const location = useLocation();
    const idCategory = location.pathname.split('/')[2]
    console.log('idCategory: ', idCategory)
    
    const onCreateNewProduct = async (values) => {
      console.log('values: ', values);
      const newProduct = await postCreateNewProduct(values)
      console.log('postCreateNewProduct: ', newProduct);
      // setFormValues(values);
      setProducts(
          [...products, newProduct]
      )
      form.resetFields();
      setIsModalOpen(false);
    };

    const onEditProduct = async (productId, values) => {
      console.log('value:', values)
      console.log('productId:', productId)
      const updatedProduct = await putUpdateProduct(productId, values)
      console.log('updatedProduct: ', updatedProduct);
      setProducts(
          products.map((product) =>
            product._id === productId ? updatedProduct : product
          )
      );
      // setFormValues2(values);
      form.resetFields();
      setIsModalOpen(false);
      setIsEditMode(false);
      setCurrentProduct(null); // Reset current product after editing
  };

    const onDeleteProduct = async(productId) => {
      const res = await deleteProduct(productId)
      console.log('res: ', res);
      if (res?.success === true) {
          const filteredProduct = products.filter(product => product._id !== productId)
          setProducts(filteredProduct)
      }
  }

  const openAddModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
    form.resetFields();
  };

  const openEditModal = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    form.setFieldsValue({
        name: product?.name,
        description: product?.description,
      });
    setIsModalOpen(true);
  };

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

            <div style={{ marginLeft: 24, marginBottom: 24}}>
                
            <Button type="primary" onClick={() => openAddModal(true)}>
                Add new product
            </Button>
            <Modal
                open={isModalOpen}
                title={isEditMode ? 'Edit Product' : 'Add new Product'}
                okText={isEditMode ? 'Update' : 'Create'}
                cancelText="Cancel"
                okButtonProps={{
                autoFocus: true,
                htmlType: 'submit',
                }}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={{
                    modifier: 'public',
                    }}
                    clearOnDestroy
                    onFinish={isEditMode ? (values) => onEditProduct(currentProduct._id, values) : (values) => onCreateNewProduct(values)}
                >
                   <Form.Item
                name="name"
                label="Product name"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="description"
                label="Description"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="price"
                label="Price"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="brand"
                label="Brand"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="rating"
                label="Rating"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="images"
                label="Image link"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    {
                    required: true,
                    message: 'Please input the title of collection!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Category"
                  initialValue={idCategory}
                  style={{
                    display: 'none'
                  }}
                >
                    
                </Form.Item>
                </Form>
                
            </Modal>
            </div>
        
            <Content style={contentStyle}>
              <Row>
              {products.length === 0 && <p>Không có sản phẩm</p>}
              {products?.map(product => {
                return (
                  
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
                          <Image
                            width={200}
                            height={200}
                            src={product?.images[0]}
                            fallback="data:image/png;base64,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"                        
                          />
                          {/* <img
                            alt="avatar"
                            src='https://elma2024.000webhostapp.com/images/products/z5191075237897_5e39629a50b47b2f3de27441918c8ff3.jpg'
                            style={imgStyle}
                          /> */}
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
                            
                            <p><b>Description: </b>{product?.description}</p>
                            <p><b>Price: </b>{product?.price}</p>
                            <p><b>Brand: </b>{product?.brand}</p>
                            <p><b>Rating: </b>{product?.rating}</p>
                            <p><b>Quantity: </b>{product?.quantity}</p>
                            {product?.isBestSeller && <p>{product?.isBestSeller}</p>}
                            
                            <Flex>
                              <Button type="primary" target="_blank" onClick={() => openEditModal(product)}>
                                Edit
                              </Button>
                              <Button type="primary" danger target="_blank" onClick={() => onDeleteProduct(product?._id)}>
                                Delete
                              </Button>
                            </Flex>
                            
                          </Flex>
                        </Flex>
                      </Card>
                    </Col>
                  
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
