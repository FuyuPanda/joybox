const express=require('express');
const router=express.Router();

const{getBooksBySubject,BorrowNewBooks}=require('../controllers/library');

router.get('/book/:subject',getBooksBySubject);
router.post('/book/borrow',BorrowNewBooks);

module.exports=router;