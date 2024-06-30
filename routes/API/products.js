const { PrismaClient } = require('@caseygustaveson/test-app');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        console.log("products", products)
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!product) {
            return res.status(404).json({ error: 'Product Not Found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
