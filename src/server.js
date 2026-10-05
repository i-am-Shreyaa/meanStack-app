const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const productRoutes = require('./routes/product.routes');

app.use('/api/products', productRoutes);

app.get('/api/health', (req,res) => {
    res.json({
        success: true,
        message: 'Enterprise Backend running'
    });
});

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
    console.log('Server listening on port 3001')
})
