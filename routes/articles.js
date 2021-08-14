const express = require('express');
const router = express.Router() ;
const articleModel = require('../model/newarticles') ;

// const articlesContent = [{
//     title: "new post",
//     subtitle: "subtitle",
//     content: "text description",
//     date: new Date() 
// }]

router.get('/newarticles', (req, res) => {
    res.render('newarticles')
})

router.get('/articleEdit/:id', async (req, res) => {
    const article = await articleModel.findById(req.params.id)
    res.render('Edit', {article : article })
}) ;


router.get('/articles', (req, res, next) => {
           next()
        }, ArticleCOntent("articlesDisplay"))

router.get('/userArticle', (req, res, next) => {
            next()
        }, ArticleCOntent('users'))

        // const routes = [ '/articles/:slug', '/articles/:id'] ;
router.get( '/articles/:slug', async (req, res) => {
    const Article = await articleModel.findOne({ slug: req.params.slug }) ;
    if (Article == null) return res.redirect('/articles') ;
    
    res.render('articleShow', {Articles: Article})
})

router.post( '/articles', (req, res, next) => {

    next() ;
}, postOrEditArticle('articleDisplay') )

router.put( '/articlesEdit/:id', (req, res, next) => {

    next() ;
}, postOrEditArticle('Edit') )

router.delete('/:id', async (req, res) => {
    await articleModel.findByIdAndDelete(req.params.id) 
    res.redirect('/articles')
})



function postOrEditArticle(path) {
    return async (req, res) => {
        let article = new articleModel({
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            markdown: req.body.markdown
        }) ;
    
        try { 
            article = await article.save() ;
            res.redirect(`/articles/${article.slug}`)
        } catch (err) {
            res.render(path, {article: article}) ; 
        }
    }
} ;
function ArticleCOntent(paths) {
    return async (req, res) => {
        const article = await articleModel.find().sort({ 
            createdAt: 'desc'
        }) ;
        try {
            res.render(paths, {Articles: article}) ;
           
        } catch(err) {
            console.log('go')
        }
       
    }
} ;

module.exports = router ;