import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CardCategory from '../component/CardCategory';
import { Col, Flex, Layout, Row, Button, Modal, Form, Input, Dropdown, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DownOutlined  } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
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
    textAlign: 'center',
    maxHeight: '80vh',
    lineHeight: '120px',
    
    display: 'flex',
    justifyContent: 'center',
  };
  const layoutStyle = {
    overflow: 'hidden',
  };

  const { Header, Footer, Sider, Content } = Layout;

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
        <>
            <Flex gap="middle" wrap>
            <Layout style={layoutStyle}>
            <Header style={headerStyle}>Category</Header>
            
            
            <Content style={contentStyle}>
                
                
                
            </Content>
            </Layout>

            
        </Flex>
        </>
    );
};

export default Product;
