const express = require('express');
const cors = require('cors');
const movieRouter = require('./app/routes/movie.route');
const app = express();
const ApiError = require('./app/api-error');
app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRouter);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to review application !'})
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
})

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json(
        {message: err.message || 'Internal Server Error'
    });
})



module.exports = app;