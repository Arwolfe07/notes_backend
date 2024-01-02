if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Server Running...');
})

app.use('/user', authRoutes);
app.use('/notes', notesRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


// Connecting to mongo atlas and starting server
mongoose.connect(DB_URL)
    .then(app.listen(PORT, () => console.log(`Listening on PORT: `, PORT)))
    .catch(err => console.log(err));




