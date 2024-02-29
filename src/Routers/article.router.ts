import { Router } from "express";
import { sample_articles } from "../data/data_articles";
import { sample_items } from "../data/data_items";
import { sample_matching } from "../data/data_matching";
const router = Router();

//AllItems
router.get('/api/items/', (req,res)=>{
    res.send(sample_items);
});

//ByName
router.get('/api/items/search/:searchTerm', (req,res)=>{
   const searchTerm = req.params.searchTerm;
   const items = sample_items
   .filter(item => item.nom.toLowerCase()
   .includes(searchTerm.toLowerCase())); 
   res.send(items);
});

//ById
router.get('/items/:itemId', (req,res)=>{
    const itemId = req.params.itemId;
    const item = sample_items.find(item => item.id_modele.toLowerCase() == itemId.toLowerCase());
    res.send(item);
})

//------------------------------------
router.get('/api/articles/search/:searchTerm', (req,res)=>{
    const searchTerm = req.params.searchTerm;
    const articles = sample_articles
    .filter(article => article.id_modele.toLowerCase()
    .includes(searchTerm.toLowerCase())); 
    res.send(articles);
 });

 router.get('/api/matchs/', (req,res)=>{
    res.send(sample_matching);
});

 //ById
 router.get('/articles/:articleId', (req,res)=>{
    const articleId = req.params.articleId;
    const article= sample_articles.find(article => article.id_article.toLowerCase() == articleId.toLowerCase());
    res.send(article);
})

////ById
router.get('/matchs/:matchId', (req,res)=>{
    const matchId = req.params.matchId;
    const match= sample_matching.find(match => match.id_article.toLowerCase() == matchId.toLowerCase());
    let idMatch = [match.matching1, match.matching2, match.matching3]
    console.log(idMatch);
    let articles = sample_articles
    .filter(article => article.id_article == idMatch[0] || article.id_article == idMatch[1] || article.id_article == idMatch[2]  ) 
    res.send(articles);
})

export default router;