const express = require('express');
const router = express.Router() ;
const articleModel = require('../model/newarticles') ;

const articlesContent = [{
    title: "new post",
    subtitle: "subtitle",
    content: "text description",
    date: new Date() 
}]

router.get('/newarticles', (req, res) => {
    res.render('newarticles')
})

router.get('/articles', async (req, res) => {
    const article = await articleModel.find().sort({ 
        createdAt: 'desc'
    })
    res.render("articlesDisplay", {Articles: article}) 
}) ;

router.get('/articles/:slug', async (req, res) => {
    const Article = await articleModel.findOne({ slug: req.params.slug }) ;
    if (Article == null) return res.redirect('/articles') ;
    res.render('articleShow', {Articles: Article})
})

router.post( '/articles', async (req, res) => {
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
        res.render('newarticles', {article: article}) ; 
    }
    
})

router.delete('/:id', async (req, res) => {
    await articleModel.findByIdAndDelete(req.params.id) 
    res.redirect('/articles')
})

router.get('/userArticle',async (req, res) => {
    const article = await articleModel.find().sort({ 
        createdAt: 'desc'
    })
    res.render("users", {Articles: article}) ;
}) ;

module.exports = router ;