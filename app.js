const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.
const ejs = require('ejs');
const pageRoute = require('./routes/pageRoutes')
const postRoute = require('./routes/postRoute')
const categoryRoute = require('./routes/categoryRoutes')
const authRoute = require('./routes/authRoutes')

const app = express();

//CONNECT TO DB
mongoose.connect('mongodb+srv://admin:atakan123@cleanblog.3ldjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED")
})
.catch((err)=>{
    console.log(err)
})

//Tamplate Engine
app.set("view engine", "ejs");


//Middleware
app.use(fileUpload());   
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json());


//ROUTES
app.use('/',pageRoute)
app.use('/posts',postRoute)
app.use('/categories',categoryRoute)
app.use('/users',authRoute)








const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servis ${port} 'unda dinleniyor.`)
})