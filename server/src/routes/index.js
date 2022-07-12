const express = require('express')

const router = express.Router()

// Controller
// const { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/products')
// const { addCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { addTransaction, getAllTransactionsAdmin } = require('../controllers/transaction')
const { addBooks, getAllBooks, getBook, getAllPromoBooks, deleteBook } = require('../controllers/books')
const { getProfile, updateProfile } = require('../controllers/profile')
const { register, login, checkAuth } = require('../controllers/auth')

// Middleware
// import middleware here
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

// Register & Login
router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth);

// Book Route
router.post('/book', auth, uploadFile.fields([{name:"bookattachment", maxCount:1},{name:"thumbnail", maxCount:1},]), addBooks)
router.get('/books', getAllBooks)
router.get('/promobooks', getAllPromoBooks)
router.get('/book/:id', auth, getBook)
router.delete('/book/:id', auth, deleteBook)

// // Transaction
router.post('/transaction', auth, addTransaction)
router.get('/transactionsadmin', auth, getAllTransactionsAdmin)

// // Create router for notification with POST method here ...
// router.post("/notification", notification);

// Profile
router.patch('/profile', auth, uploadFile.single("image"), updateProfile)
router.get('/profile', auth, getProfile)

module.exports = router