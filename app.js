var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./db');
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Listing = require('./models/Listing');
const Orders = require('./models/Orders');
const User = require('./models/User');
const crypto = require('crypto');
const flash = require('connect-flash');


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
app.use(session({ secret: 'TheWoodWorks', resave: false, saveUninitialized: false })); // Need to change secret key
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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

// Middleware function to make user object available globally
app.use((req, res, next) => {
  res.locals.user = req.user; // Assuming user object is attached to req during authentication
  next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup() {
  try {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString('hex');

    // Hash the password using the salt
    const hashPassword = (password) => {
      return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    };

    // Create Megan Admin with hashed password and salt
    const meganadminPassword = hashPassword("1234");
    const meganadmin = await User.create({
      username: "meganadmin",
      password: meganadminPassword,
      salt: salt, // Store the salt in the database
      usertype: "Admin",
      email: "megan.carver@wsu.edu"
    });
    console.log("Megan Admin instance created");

    // Similarly, create Megan Buyer and Megan Seller with hashed passwords and salts
    // Use the same salt for each user
    // (In practice, you might want to generate a separate salt for each user)
    const meganbuyerPassword = hashPassword("1234");
    const meganbuyer = await User.create({
      username: "meganbuyer",
      password: meganbuyerPassword,
      salt: salt,
      usertype: "Buyer",
      email: "megan.carver@wsu.edu"
    });
    console.log("Megan Buyer instance created");

    const megansellerPassword = hashPassword("1234");
    const meganseller = await User.create({
      username: "meganseller",
      password: megansellerPassword,
      salt: salt,
      usertype: "Seller",
      email: "megan.carver@wsu.edu",
      shopname: "Megan's Shop",
      shopdesc: "This is Megan's shop."
    });
    console.log("Megan Seller instance created");
  } catch (error) {
    console.error("Error while setting up users:", error);
  }

  const listing1 = await Listing.create({listingid: "1", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing One", listingprice: "$90.00", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "90in", listingheight: "70in", listingdepth: "50in", listingseller: "meganseller", spacecategory: "living room", productcategory: "tables and desks"})
  const listing2 = await Listing.create({listingid: "2", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing Two", listingprice: "$39.99", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "120in", listingheight: "70in", listingdepth: "60in", listingseller: "meganseller", spacecategory: "dining room", productcategory: "dishes and cutting boards"})
  const listing3 = await Listing.create({listingid: "3", image1: "/Images/Wireframe Placeholder Images/dresser.jpeg", image2: "/Images/Wireframe Placeholder Images/dresser2.jpeg", image3: "/Images/Wireframe Placeholder Images/dresser3.jpeg", image4: "/Images/Wireframe Placeholder Images/dresser4.jpeg", listingtitle: "Test Listing Three", listingprice: "$124.99", listingdesc: "This is a test listing to see if we can display the listings correctly. Do not purchase this listing.", listingwidth: "150in", listingheight: "90in", listingdepth: "75in", listingseller: "meganseller", spacecategory: "bedroom", productcategory: "dressers"})
}

sequelize.sync({ force: true }).then(() => {
  console.log("Sequelize Sync Completed...")
  setup().then(() => console.log("Admin, Buyer, and Seller setup completed."));
})

module.exports = app;
