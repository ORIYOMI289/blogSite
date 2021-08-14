const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs') ;
const mongoose = require('mongoose') ;
const articles = require('./routes/articles') ;


mongoose.connect('mongodb://localhost/blogsite', {
    useNewUrlParser: true ,
    useUnifiedTopology: true 
})
.then( () => console.log('connected to mongodb'))
.catch( err => console.log('could not connect to mongodb', err)) ;

const app = express() ;

const articlesContent = [{ 
    title: "new post",
    subtitle: "subtitle",
    content: "text description",
    date: new Date() 
}]


app.use(express.urlencoded({ extended: false })) ;
app.use(express.static('public')) ;
app.use(methodOverride('_method'))
app.use(articles);

app.set('view engine', 'ejs') ;




// app.get('/articles', (req, res) => {
//     res.render('articlesDisplay', {Articles: articlesContent})
// })







// app.get('/about', (req, res) => {
//     res.render('about')
// })

// app.get('/contact', (req, res) => {
//     res.render('contact')
// })
app.get('/post', (req, res) => {
    res.render('post')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("app is running")
}) 