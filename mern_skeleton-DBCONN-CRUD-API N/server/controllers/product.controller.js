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
        product = Object.assign(product, req.body);
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

const removeAll = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "All products deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const findByName = async (req, res) => {
    try {
        let products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } }); // case-insensitive search
        res.json(products);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

export default { create, productByID, read, list, remove, update, removeAll, findByName };
