import React from 'react';
import Stack from '@mui/material/Stack'; 

function countProductByCategory(products, categoryId) {
    return products.filter(product => product.categoryId === categoryId).length;
}

export default function CardCategory({ category, products }) {
    return (
        <div className='Card-Container'>
            <Stack spacing={3}>
            <img
                width={50}
                src={category?.icon}
                alt={category?.name}
            />

                <Stack spacing={1}>
                    <p className="category-name">{category?.name}</p>
                    <p className="category-content">
                        {countProductByCategory(products, category?._id)} items
                    </p>
                </Stack>
            </Stack>
        </div>
    );
}