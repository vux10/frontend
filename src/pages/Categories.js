import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import CardCategory from '../component/CardCategory';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Button, Modal } from 'antd';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/category/getAll", { 
                    headers: { "Content-Type": "application/json" },
                });
                if (response.status === 200) setCategories(response.data);
            } catch (error) {
                console.log(error?.message); 
            }
        };

        const fetchProducts = async () => {
            try {
                const productResponse = await axios.get("http://localhost:5000/api/v1/products/");
                if (productResponse.status === 200) setProducts(productResponse.data);
            } catch (error) {
                console.log(error?.message);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

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

    return (
        <Box className='Categories'>
            <AppBar position="static" sx={{
                marginBottom: "24px"
            }}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Category
                </Typography>
                </Toolbar>
            </AppBar>
            <Button type="primary" onClick={showModal}>
                Thêm loại sản phẩm
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={2} key={category._id}>
                        <CardActionArea
                            onClick={() => navigate(`products?category=${category._id}`)}
                            className="flex-center"
                        >
                            <CardCategory category={category} products={products} />
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}