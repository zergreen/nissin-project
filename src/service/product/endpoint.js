const { ProductProcess } = require('./process');
const repo = require('./repository')

class ProductEndpoint {

    constructor() {
        this.productModel = repo.productModel
        this.ProductSchema = repo.ProductSchema
    }

    addProductEndpoint = (req, res) => {
        this.productModel.productId = req.body.productId;
        this.productModel.topic = req.body.topic;
        this.productModel.price = req.body.price;
        this.productModel.sizesCategory = req.body.sizesCategory; // Directly assigning the array of sizes
        this.productModel.count = req.body.count;
        this.productModel.branchCategory = req.body.branchCategory; // Directly assigning the array of branches
        this.productModel.category = req.body.category;
        this.productModel.image = req.body.image;
    

        new ProductProcess().addProductProcess(this.productModel,res)
    }

    updateProductEndpoint = (req, res) => {
        this.productModel.productId = req.body.productId
        this.productModel.topic = req.body.topic
        this.productModel.sizesCategory = req.body.sizesCategory; // Directly assigning the array of sizes
        this.productModel.count = req.body.count
        this.productModel.branchCategory = req.body.branchCategory; // Directly assigning the array of branches
        this.productModel.category = req.body.category
        this.productModel.image = req.body.image
        this.productModel.price = req.body.price

        new ProductProcess().updateProductProcess(this.productModel,res)
    }
}

module.exports = {
    ProductEndpoint
}