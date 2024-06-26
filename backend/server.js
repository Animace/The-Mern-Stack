const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const { sendFile } = require('express/lib/response');

const port = process.env.PORT || YourPort;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'));

app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

} else
{
    app.get('/', (req, res) => res.send = ('Set it to production'))
}

app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port ${port}`));