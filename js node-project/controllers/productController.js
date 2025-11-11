const Product = require("../models/productModel")

//getAllProducts
const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    if (!products || !products.length)
        return res.status(400).json({ message: 'no products found' })
    res.json(products)
}

//getProductById
const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id).lean()
    if (!product)
        return res.status(400).json({ message: "product not found" })
    res.json(product)
}

// getProductByCategory
const getProductByCategory = async (req, res) => {
    const { category } = req.params
    const products = await Product.find({ category }).lean()
    if (!products)
        return res.status(400).json({ message: 'no products found' })
    res.json(products)
}

//addProduct
const addProduct = async (req, res) => {
    const { name, description, details, category, size, color, picture, price } = req.body
    if (!name || !description || !category || !picture || !price)
        return res.status(400).json({ message: 'name, description, category, picture and price are required' })
    const product = await Product.create({ name, description, details, category, size, color, picture, price })
    if (product)
        return res.status(201).json({ message: `new product: ${name}, created` })
    res.status(400).json({ message: 'Product is not created' })
}

//updateProduct
const updateProduct = async (req, res) => {
    const { id, name, description, details, category, size, color, picture, price } = req.body
    if (!id)
        return res.status(400).json({ message: 'id is required' })
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).json({ message: 'product not found' })
    product.name = name
    product.description = description
    product.details = details
    product.category = category
    product.size = size
    product.color = color
    product.picture = picture
    product.price = price
    const updateProduct = await product.save()
    res.json({ message: `${name} updated` })
}

//deleteProduct
const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(400).json({ message: 'product not found' })
    const result = await product.deleteOne()
    res.json({ message: `${product.name} deleted succesfully` })
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    addProduct,
    updateProduct,
    deleteProduct
}