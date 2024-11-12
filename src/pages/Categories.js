import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Flex, Layout, Row, Button, Modal, Form, Input} from 'antd';
import { Avatar, Card } from 'antd';

import { deleteCategory, fetchCategories, postCreateNewCategory, putUpdateCategory } from '../apis';
import { MainLayout } from './MainLayout';

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
    lineHeight: '120px',
    
    display: 'flex',
    justifyContent: 'center',
  };
  const layoutStyle = {
    overflow: 'hidden',
  };
  const { Header, Content } = Layout;

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false); // State to determine whether we're in edit mode or not
    const [currentCategory, setCurrentCategory] = useState(null); // For storing the category being edited

    const onCreateNewCategory = async (values) => {
        const newCategory = await postCreateNewCategory(values)
        console.log('postCreateNewCategory: ', newCategory);
        setCategories(
            [...categories, newCategory]
        )
        // setFormValues(values);
        form.resetFields();
        setIsModalOpen(false);
    };

    const onEditCategory = async (categoryId, values) => {
        console.log('value:', values)
        console.log('categoryId:', categoryId)
        const updatedCategory = await putUpdateCategory(categoryId, values)
        console.log('updatedCategory: ', updatedCategory);
        setCategories(
            categories.map((category) =>
              category._id === categoryId ? updatedCategory : category
            )
        );
        // setFormValues2(values);
        form.resetFields();
        setIsModalOpen(false);
        setIsEditMode(false);
        setCurrentCategory(null); // Reset current category after editing
    };

    const onDeleteCategory = async(categoryId) => {
        const res = await deleteCategory(categoryId)
        console.log('res: ', res);
        if (res?.success === true) {
            const filteredCategory = categories.filter(category => category._id !== categoryId)
            setCategories(filteredCategory)
        }
    }

    const openAddModal = () => {
        setIsEditMode(false);
        setIsModalOpen(true);
        form.resetFields();
      };
    
      const openEditModal = (category) => {
        setIsEditMode(true);
        setCurrentCategory(category);
        form.setFieldsValue({
            name: category?.name,
            icon: category?.icon,
          });
        setIsModalOpen(true);
      };

    useEffect( () => {
        const getAllCategories = async () => {
            const data = await fetchCategories()
            setCategories(data)
        }
        getAllCategories();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <MainLayout>
        <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>Category</Header>
          <div style={{ marginLeft: 24, marginBottom: 24}}>
                
            <Button type="primary" onClick={() => openAddModal()}>
                Add new category
            </Button>
            <Modal
                open={isModalOpen}
                title={isEditMode ? 'Edit Category' : 'Add new category'}
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
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    // initialValues={{
                    // modifier: 'public',
                    // }}
                    clearOnDestroy
                    onFinish={isEditMode ? (values) => onEditCategory(currentCategory._id, values) : (values) => onCreateNewCategory(values)}
                >
                    <Form.Item
                    name="name"
                    label="Category name"
                    rules={[
                        {
                        required: true,
                        message: 'Please input the title of collection!',
                        },
                    ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="icon" label="Link icon">
                        <Input type="textarea"/>
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
                            <Card
                                style={{
                                width: 300,
                                display:'inline-block'
                                }}
                            >
                                <Link to={`/category/${category?._id}`}>
                                    <Meta
                                    avatar={<Avatar src={category?.icon} />}
                                    title={category?.name}
                                    />
                                </Link>
                                        <Button  type="primary" onClick={() => openEditModal(category)}>
                                                Edit
                                        </Button>
                                        <Button danger type="primary" onClick={() => onDeleteCategory(category?._id)}>
                                                Delete
                                        </Button>
                            </Card>
                        
                    </Col>
                ))}
            </Row>  
          </Content>
        </Layout>

        
      </Flex>
      </MainLayout>
    );
}
