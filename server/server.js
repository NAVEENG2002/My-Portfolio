const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const { connectMongoDB } = require('./connection');
const contactRoutes = require('./route/contactRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));  // for HTML forms
app.use(express.json());                          // for JSON requests


app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

// MongoDB connect
connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
