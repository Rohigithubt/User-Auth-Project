const express = require('express')
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require('cors');  // ✅ Add this
const apiRoutes= require('./routes')


const port =3000

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',  // only allow your frontend
    credentials: true,               // if you are using cookies, sessions
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  *** use express router **** 
app.use('/',apiRoutes);

app.listen(port,() =>{
    console.log(`server is running on ${port}`)
})

  