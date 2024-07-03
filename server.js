const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const productRoutes = require('./routes/API/products');

// Middleware
app.use(express.json());

// Routes
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.json({ 'message': 'hello there' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack,"123");
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
