require('dotenv').config({
  path: './config/config.env'
});
//router require begin
const auth_router = require('./router/auth_router');
const shop_router = require('./router/shop_router');
const category_router = require('./router/category_router');
const items_router = require('./router/items_router');
const reviews_router = require('./router/review_router');
//router require end

const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 4000;
//json middleware
app.use(express.json());
let connect = null; //mongoose connection global variable
//using router middlewares
app.use(function (req, res, next) {
  console.log(req.url);
  next();
});
//handling file uploads
app.use(fileUpload({
  debug: true,
}));
app.use('/api/v1/auth', auth_router);
app.use('/api/v1/shop', shop_router);
app.use('/api/v1/', category_router);
app.use('/api/v1/item', items_router);
app.use('/api/v1/review', reviews_router);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(404).end(err.message);
});
app.listen(PORT, async function () {
  try {
    connect = await mongoose.connect(process.env.CONNECTION_URI);
    console.log(`connected to ${connect.connection.host}
    listining at port : ${PORT}`);
  } catch (error) {
    console.log('error connecting db'.red, error);
    process.exit(1);
  }
});

process.on('SIGINT', async function () {
  console.log('stopping application...');
  await connect.connection.close();
  console.log('stopped.');
  process.exit(1);
});
