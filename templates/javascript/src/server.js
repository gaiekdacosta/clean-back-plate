const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes')

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(morgan('combined'));
app.use(routes)

app.use(() => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = 4569;

app.listen(port, () => {
    console.log('\x1b[34m', `➜ Server running in port: ${port}`);
});
