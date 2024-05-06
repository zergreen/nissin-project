const { NewsProcess } = require('./process');
const repo = require('./repository')

class NewsEndpoint {

    constructor() {
        this.newsModel = repo.newsModel
        this.newsSchema = repo.newsSchema
    }

    addNewsEndpoint = (req, res) => {
        this.newsModel.newsId = req.body.newsId
        this.newsModel.topic = req.body.topic
        this.newsModel.date = req.body.date
        this.newsModel.detail = req.body.detail
        this.newsModel.category = req.body.category
        this.newsModel.image = req.body.image
        this.newsModel.link = req.body.link

        // console.log(req.body.newsId);
        // console.log(req.body.image)

        console.log("request body");
        console.log(req.body);
        console.log("new model");
        console.log(this.newsModel);

        new NewsProcess().addNewsProcess(this.newsModel,res)
    }

    updateNewsEndpoint = (req, res) => {
        this.newsModel.id = req.params.id 
        this.newsModel.topic = req.body.topic
        this.newsModel.date = req.body.date
        this.newsModel.detail = req.body.detail
        this.newsModel.category = req.body.category
        this.newsModel.image = req.body.image
        this.newsModel.link = req.body.link

        // console.log(req.body.image)


        new NewsProcess().updateNewsProcess(this.newsModel,res)
    }
}

module.exports = { NewsEndpoint } 