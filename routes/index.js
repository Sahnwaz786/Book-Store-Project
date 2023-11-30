
var express = require('express');
var router = express.Router();

const database = require("../models/bookModel");
// const books =[]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  database.create(req.body)
  .then(()=> {
    res.redirect('/show')
  })
  .catch((err)=>{
    res.send(err);
  })
  // books.push(req.body);
  // res.redirect('/show');
});

router.get('/show',async function(req, res, next) {
  try{
    const books = await database.find();
    res.render('show',{books:books});
  }
  catch(error){
    res.send(error)
  }
   
});


router.get('/details/:id', async function(req, res, next) {
  try{
    const Books = await database.findById(req.params.id);
    res.render('details',{books:Books});
  }
  catch(error){
    res.send(error);
  } 
  
  // const Books = books[req.params.id];
  // res.render('details',{ books : Books, index: req.params.id });
 
});

router.get('/delete/:id', async function(req, res, next){
  try {
    await database.findByIdAndDelete(req.params.id);
    res.redirect('/show');
  } catch(error) {
    res.send(error)
  }
  //  books.splice(req.params.index,1)
  //  res.redirect('/show');
})
router.get('/update/:id', async function(req, res, next) {
try {
  const book = await database.findById(req.params.id)
  res.render('update',{books:book})
} 
catch (error) {
  res.send(error);
}

  // const index = req.params.index;
  // const Books = books[index];
  // res.render('update',{ books : Books, index: req.params.index  });
 
});
router.post('/update/:id', async function(req, res, next) {

   try {
     await database.findByIdAndUpdate(req.params.id,req.body)
    res.redirect(`/details/${req.params.id}`)
   } 

   catch (error) {
    res.send(error)
   }

  // books[req.params.index] = req.body;
  // res.redirect(`/details/${req.params.index}`);

 
 
});
 

module.exports = router;
