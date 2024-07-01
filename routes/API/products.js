const { PrismaClient } = require('@caseygustaveson/test-app');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        console.log('Fetched products:', products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productId = parseInt(id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }

        console.log('Fetched product:', product);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
