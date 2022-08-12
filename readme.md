# Shopping app api written in node using express framework
## Features
- allow users to have an account
  - types of users : admin, shop-owners, users
- shop owners can set up a shop with different categories and a number of items in each category
- each item has certain attributes
  - name
  - price and shipping charges
  - instock
  - rating and reviews
  - images of the item
- shop-owner
  - can modify shop attributes
  - can modify category attributes
  - can modify item attributes
  - report reviews to the admin
- user
  - place orders
  - add and remove items to the cart
  - submit reviews and ratings to an item
  - modify personal info
  - reset password
  - delete account
- admin
  - delete/blacklist any user/publisher
  - blacklist any shop
  - delete/hide any review on an item

## api-rules
## programming-rules
## things need to be done
- resolve image uploading conflict while adding items
- add review routes
- bug hunt
- auth and user related routes
- get owner router
- filter json data sent through post requests
- add database hooks and middlewares