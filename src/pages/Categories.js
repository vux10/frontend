import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import CardCategory from '../component/CardCategory';

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

    return (
        <div className='Categories'>
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
        </div>
    );
}