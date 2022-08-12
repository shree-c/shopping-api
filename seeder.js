const fs = require('fs');
const mongoose = require('mongoose');
const Users = require('./models/User');
const Shops = require('./models/Shop');
const Categories = require('./models/Category');
const Item = require('./models/Item');
const Review = require('./models/Review');
require('colors');
require('dotenv').config({
  path: './config/config.env'
});

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.CONNECTION_URI);
  console.log(`connected to db ${conn.connection.host}`.green);
  return conn;
};
//add and delete users
const add_users = async () => {
  try {
    await Users.create(JSON.parse(fs.readFileSync(`${__dirname}/seed_data/users.json`)));
    console.log(`added all users`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const delete_users = async () => {
  try {
    await Users.deleteMany();
    console.log(`deleted all users`.red);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//add and delete shops
const add_shops = async () => {
  try {
    await Shops.create(JSON.parse(fs.readFileSync(`${__dirname}/seed_data/shops.json`)));
    console.log(`added all shops`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const delete_shops = async () => {
  try {
    await Shops.deleteMany();
    console.log(`deleted all shops`.red);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//adding and deleting catatories
const add_categories = async () => {
  try {
    await Categories.create(JSON.parse(fs.readFileSync(`${__dirname}/seed_data/categories.json`)));
    console.log(`added all categories`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const delete_categories = async () => {
  try {
    await Categories.deleteMany();
    console.log(`deleted all categories`.red);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//adding and deleting items
const add_items = async () => {
  try {
    await Item.create(JSON.parse(fs.readFileSync(`${__dirname}/seed_data/items.json`)));
    console.log(`added all items`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const delete_items = async () => {
  try {
    await Item.deleteMany();
    console.log(`deleted all items`.red);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//adding and deleting reviews
const add_reviews = async () => {
  try {
    await Review.create(JSON.parse(fs.readFileSync(`${__dirname}/seed_data/reviews.json`)));
    console.log(`added all reviews`.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const delete_reviews = async () => {
  try {
    await Review.deleteMany();
    console.log(`deleted all reviews`.red);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const arg_str = process.argv.slice(2);
if (!arg_str.length) {
  console.log('no options provided');
}
(async function () {
  arg_str.forEach(async (val, ind) => {
    console.log(`option ${ind + 1} : ${val}:`.yellow);
    switch (val) {
      case '-ds':
        await connectDB().then((con) => {
          delete_shops();
        });
        break;
      case '-cs':
        connectDB().then(() => {
          add_shops();
        });
        break;
      case '-cca':
        await connectDB().then(() => {
          add_categories();
        });
        break;
      case '-dca':
        await connectDB().then(() => {
          delete_categories();
        });
        break;
      case '-ci':
        await connectDB().then(() => {
          add_items();
        });
        break;
      case '-di':
        await connectDB().then(() => {
          delete_items();
        });
        break;
      case '-cu':
        await connectDB().then(() => {
          add_users();
        });
        break;
      case '-du':
        await connectDB().then(() => {
          delete_users();
        });
        break;
      case '-cr':
        await connectDB().then(() => {
          add_reviews();
        });
        break;
      case '-dr':
        await connectDB().then(() => {
          delete_reviews();
        });
        break;
      default:
        console.log('unknown operation'.red.underline);
        break;
    }
  });
})();