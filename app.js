const express = require('express')
const AboutController = require('./controllers/admin/AboutController')
const AdminController = require('./controllers/admin/AdminController')
const BlogController = require('./controllers/admin/BlogController')
const CategoryController = require('./controllers/admin/CategoryController')
const ContactController = require('./controllers/admin/ContactController')
const FrontController = require('./controllers/frontcontroller')
const connectdb = require('./db/connectdb')
const authentication = require('./middleware/auth')
//get token
const cookieParser = require('cookie-parser')


//message show
const session = require('express-session')
const flash = require('connect-flash')

//console.log(express)
const app = express()
const port = 3000
const fileUpload = require("express-fileupload");
app.use(fileUpload({useTempFiles: true}));

app.use(cookieParser())

app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());

//connection db
connectdb()
app.use(express.urlencoded({extended:false}))

//setup ejs
app.set('view engine','ejs')

//static files path
app.use(express.static('public'))


app.get('/',authentication,FrontController.home)
app.get('/about',authentication,FrontController.about)
app.get('/blog',authentication,FrontController.blog)
app.get('/contact',authentication,FrontController.contact)
app.get('/login',FrontController.login)
app.get('/detail/:id',authentication,FrontController.detail)

//AdminController
app.get('/admin/dashboard',authentication,AdminController.dashboard)
app.get('/register',AdminController.register)
app.post('/register1',AdminController.register1)
app.post('/verifylogin',AdminController.verifylogin)
app.get('/logout',authentication,AdminController.logout)

//admin/BlogController
app.get('/admin/blog/display',authentication,BlogController.display)
app.post('/bloginsert',BlogController.bloginsert)
app.get('/blogview/:id',authentication,BlogController.blogview)
app.get('/blogedit/:id',authentication,BlogController.blogedit)
app.post('/blogupdate/:id',BlogController.blogupdate)
app.get('/blogdelete/:id',authentication,BlogController.blogdelete)

//admin/CategoryController
app.get('/admin/categorydisplay',authentication,CategoryController.display)
app.post('/categoryinsert',CategoryController.categoryinsert)
app.get('/categoryview/:id',authentication,CategoryController.categoryview)
app.get('/categoryedit/:id',authentication,CategoryController.categoryedit)
app.post('/categoryupdate/:id',CategoryController.categoryupdate)
app.get('/categorydelete/:id',authentication,CategoryController.categorydelete)

//admin/contactcontroller
app.get('/admin/contactdisplay',authentication,ContactController.display)
app.post('/contactinsert',ContactController.contactinsert)
app.get('/contactview/:id',authentication,ContactController.contactview)
app.get('/contactedit/:id',authentication,ContactController.contactedit)
app.post('/contactupdate/:id',ContactController.contactupdate)
app.get('/contactdelete/:id',authentication,ContactController.contactdelete)

//admin/AboutController
app.get('/admin/aboutdisplay',authentication,AboutController.display)
app.post('/aboutinsert',AboutController.aboutinsert)
app.get('/aboutview/:id',authentication,AboutController.aboutview)
app.get('/aboutedit/:id',authentication,AboutController.aboutedit)
app.post('/aboutupdate/:id',AboutController.aboutupdate)
app.get('/aboutdelete/:id',authentication,AboutController.aboutdelete)







// route
// app.get('/', (req, res) => {
//     res.send('Home Page')
//   })
//   app.get('/about', (req, res) => {
//     res.send('About Page')
//   })
//   app.get('/contact', (req, res) => {
//     res.send('Contact Page')
//   })  




// server create
app.listen(port, () => {
    console.log(`Server is running localhost : ${port}`)
  })