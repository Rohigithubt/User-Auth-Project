const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path'); // required for serving static files

const apiRoutes = require('./routes');

const port = 3000;

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Register your routes
app.use('/', apiRoutes);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
