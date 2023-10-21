// import User from '../models/user.model.js'
// 	import extend from 'lodash/extend.js'
// 	// import errorHandler from './error.controller.js'
// 	const create = async (req, res) => { 
// const user = new User(req.body) 
// try {
// await user.save()
// return res.status(200).json({ 
// message: "Successfully signed up!"
// })
// } catch (err) {
// return res.status(400).json({
// error: errorHandler.getErrorMessage(err) 
// })
// } 
// }
// 	const list = async (req, res) => { 
// 	try {
// 	let users = await User.find().select('name email 	updated created') 
// 	res.json(users)
// 	} catch (err) {
// 	return res.status(400).json({
// 	error: errorHandler.getErrorMessage(err) 
// 	})
// 	} 
// 	}
// 	const userByID = async (req, res, next, id) => { 
// try {
// let user = await User.findById(id) 
// if (!user)
// return res.status('400').json({ 
// error: "User not found"
// })
// req.profile = user 
// next()
// } catch (err) {
// return res.status('400').json({ 
// error: "Could not retrieve user"
// }) 
// }
// }
// 	const read = (req, res) => {
// 	req.profile.hashed_password = undefined 
// 	req.profile.salt = undefined
// 	return res.json(req.profile) 
// 	}

// 	const update = async (req, res) => { 
// try {
// let user = req.profile
// user = extend(user, req.body) 
// user.updated = Date.now() 
// await user.save()
// user.hashed_password = undefined 
// user.salt = undefined
// res.json(user) 
// } catch (err) {
// return res.status(400).json({
// error: errorHandler.getErrorMessage(err) 
// })
// } 
// }
// 	const remove = async (req, res) => { 
// try {
// let user = req.profile
// let deletedUser = await user.deletOne()
// deletedUser.hashed_password = undefined 
// deletedUser.salt = undefined
// res.json(deletedUser) 
// } catch (err) {
// return res.status(400).json({
// error: errorHandler.getErrorMessage(err) 
// })
// } 
// }
// 	export default { create, userByID, read, list, remove, update }


import Product from '../models/product.model.js';

const create = async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        return res.status(200).json({ message: "Product successfully added!" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const list = async (req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const productByID = async (req, res, next, id) => {
    try {
        let product = await Product.findById(id);
        if (!product)
            return res.status(400).json({ error: "Product not found" });
        req.product = product;
        next();
    } catch (err) {
        return res.status(400).json({ error: "Could not retrieve product" });
    }
}

const read = (req, res) => {
    return res.json(req.product);
}

const update = async (req, res) => {
    try {
        let product = req.product;
        product = Object.assign(product, req.body); // update product fields
        await product.save();
        res.json(product);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const remove = async (req, res) => {
    try {
        let product = req.product;
        let deletedProduct = await product.deleteOne();
        res.json(deletedProduct);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export default { create, productByID, read, list, remove, update };

