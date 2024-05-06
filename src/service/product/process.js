const Product = require('../../models/Product');
const { productModel } = require('./repository');
class ProductProcess {

    addProductProcess = async (productModel, res) => {
        console.log("process: " + productModel.image)

        const NewsObj = new Product({
            productId: productModel.productId,
            topic: productModel.topic,
            price: productModel.price,
            sizesCategory: productModel.sizesCategory, 
            count: productModel.count,
            branchCategory: productModel.branchCategory,
            category: productModel.category,
            image: productModel.image,
            createdAt: new Date(),
        })

        await NewsObj.save();
        return res.status(201).send(NewsObj);
        // return res.status(201).send({ response: "Create News Success" });
    }

    updateProductProcess = async (productModel, res) => {
        // console.log(RelationSchema.relateId);
        // const news = await News.findByIdAndUpdate(id, RelationSchema, { new: true });
        // if (!news) return res.status(404).send('News not found');
        // return res.send(news);
        // return res.status(200).send({ response: "Update News Success" });
        // return res.status(200).send({ response: RelationSchema.id });
        
        const findNews = await Product.findOne({ _id: productModel.id });
        if (findNews) {
            findNews.topic = productModel.topic
            findNews.price = productModel.price || findNews.price;
            findNews.sizesCategory = productModel.sizesCategory || findNews.sizesCategory;
            findNews.count = productModel.count || findNews.count;
            findNews.branchCategory = productModel.branchCategory || findNews.branchCategory;
            findNews.category = productModel.category || findNews.category;
            findNews.image = productModel.image || findNews.image;

            await findNews.save();
            return res.status(200).send(findNews);
        }
        else {
            return res.status(404).send({ response: "Not Found News" });
        }
    }

  
   }


module.exports = {
    ProductProcess
}
