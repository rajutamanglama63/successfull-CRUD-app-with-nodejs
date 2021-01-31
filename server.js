const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const databaseConnection = require("./config/db");
const Router = require("./routes/router");


const app = express();


dotenv.config();
const Port = process.env.PORT || 2020;

// database connection
databaseConnection();

// express-ejs-layouts middleware
app.use(expressLayouts);

// views engine middleware
app.set('view engine', 'ejs');

// body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// embedding assets files
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/jquery', express.static(path.resolve(__dirname, 'assets/jquery')));


// routers middleware
app.use('/', Router); 


app.listen(Port, () => {
    console.log(`Server is running on port http://localhost:${Port}`);
})