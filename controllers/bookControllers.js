const Book = require('../models/bookModels').bookModel;
const limit = 2;
async function addBook(req,res,next){
   try{
      console.log('inside addBook method');
      const book = new Book(req.body);
      await book.save();
      return res.status(201).json(book);
   }catch(error){
     console.log('error occurred'); 
     next(error);
   }
}
async function deleteBook(req,res,next){
    try{
       const book = await Book.find({_id:req.params._id});
       console.log(book);
       if(book.length == 0){
         return res.status(404).json({message:'requested data not found'});
       }
       const delete_book = await Book.deleteOne({_id:req.params._id});
       console.log(book);
       return res.status(200).json(book);
    }catch(error){
       next(error);
    }
}
async function updateBook(req,res,next){
   try{
      const _id = req.params._id;

        const updatedData = req.body;
        const olderData = await Book.findById(_id);
        if(olderData===null){
         error.status = 404;
         error.message = 'requested data is not found';
         next(error);
        }
        console.log(olderData);
        const newData = await Book.findByIdAndUpdate(_id, updatedData, { new: true });
        res.status(200).json(newData);
   }catch(error){
      next(error);
   }
}
async function getAllBook(req,res,next){
   try{
      console.log('get all book api hit');
      let pageNo = req.params.pageNo;
      console.log(pageNo);
       let skip = (pageNo-1)*limit;
       const books = await Book.find().populate('user').skip(skip).limit(limit).sort({publishedDate:-1});
       return res.status(200).json(books);
   }catch(error){
       next(error);
   }
}
async function filterBookByNameOrAuthorName(req,res,next){
   try{
      let query = req.query;
      console.log(query);
      let pageNo = req.params.pageNo;
      let skip = (pageNo-1)*limit;
      const books = await Book.find(query).populate('user').skip(skip).limit(limit).sort({publishedDate:-1});
      return res.status(200).json(books);
   }catch(error){
       next(error);
   }
}
async function searchBook(req,res,next){
   try{
      console.log('search api hit');
      let query = req.query.author;
      console.log(query);
      let pageNo = req.params.pageNo;
      let skip = (pageNo-1)*limit;
      const results = await Book.find({ author: new RegExp(query, 'i') }).populate('user').skip(skip).limit(limit);
      return res.status(200).json(results);
   }catch(error){
      next(error);
   }
}
module.exports = {addBook,deleteBook,updateBook,getAllBook,filterBookByNameOrAuthorName,searchBook};