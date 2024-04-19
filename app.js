var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const session = require('express-session');
const sequelize = require('./db');
const Listing = require('./models/Listing');
const Orders = require('./models/Orders');
const User = require('./models/User');

var indexRouter = require('./routes/index');
var aboutUsRouter = require('./routes/about_us');
var adminListingsRouter = require('./routes/admin_listings');
var adminUsersRouter = require('./routes/admin_users');
var checkoutRouter = require('./routes/checkout');
var contactUsRouter = require('./routes/contact_us');
var faqRouter = require('./routes/faq');
var orderHistoryRouter = require('./routes/order_history');
var productDetailsRouter = require('./routes/product_details');
var profileRouter = require('./routes/profile');
var shopInventoryRouter = require('./routes/shop_inventory');
var shopOrdersRouter = require('./routes/shop_orders');
var shoppingCartRouter = require('./routes/shopping_cart');
var signInRouter = require('./routes/signin');
var signUpRouter = require('./routes/signup');
var storefrontContactRouter = require('./routes/storefront_contact');
var storefrontInfoRouter = require('./routes/storefront_info.js');
var storefrontShopRouter = require('./routes/storefront_shop');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about_us', aboutUsRouter);
app.use('/admin_listings', adminListingsRouter);
app.use('/admin_users', adminUsersRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact_us', contactUsRouter);
app.use('/faq', faqRouter);
app.use('/order_history', orderHistoryRouter);
app.use('/product_details', productDetailsRouter);
app.use('/profile', profileRouter);
app.use('/shop_inventory', shopInventoryRouter);
app.use('/shop_orders', shopOrdersRouter);
app.use('/shopping_cart', shoppingCartRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/storefront_contact', storefrontContactRouter);
app.use('/storefront_info', storefrontInfoRouter);
app.use('/storefront_shop', storefrontShopRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup() {
  const meganadmin = await User.create({username: "meganadmin", password: "1234", usertype: "Admin", email: "megan.carver@wsu.edu"})
  console.log("Megan Admin instance created");
  const meganbuyer = await User.create({username: "meganbuyer", password: "1234", usertype: "Buyer", email: "megan.carver@wsu.edu"})
  console.log("Megan Buyer instance created");
  const meganseller = await User.create({username: "meganseller", password: "1234", usertype: "Seller", email: "megan.carver@wsu.edu"})
  console.log("Megan Seller instance created");

  const listing1 = await Listing.create({listingid: "1", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing One", listingprice: "$90.00", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "90in", listingheight: "70in", listingdepth: "50in", listingseller: "meganseller"})
  const listing2 = await Listing.create({listingid: "2", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing Two", listingprice: "$39.99", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "120in", listingheight: "70in", listingdepth: "60in", listingseller: "meganseller"})
  const listing3 = await Listing.create({listingid: "3", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing Three", listingprice: "$124.99", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "150in", listingheight: "90in", listingdepth: "75in", listingseller: "meganseller"})
}

sequelize.sync({ force: true }).then(() => {
  console.log("Sequelize Sync Completed...")
  setup().then(()=> console.log("Admin, Buyer, and Seller setup completed."));
})

module.exports = app;
