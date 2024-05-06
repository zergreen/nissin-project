const News = require('../../models/News');
const { newsModel } = require('./repository');
class NewsProcess {

    addNewsProcess = async (newsModel, res) => {
        console.log("process: " + newsModel.image)
        console.log("process: " + newsModel)

        const NewsObj = new News({
            newsId: newsModel.newsId,
            topic: newsModel.topic,
            date: newsModel.date,
            detail: newsModel.detail,
            category: newsModel.category,
            image: newsModel.image,
            link: newsModel.link,
            createdAt: new Date(),
        })

        console.log(newsModel)

        await NewsObj.save();
        return res.status(201).send(NewsObj);
        // return res.status(201).send({ response: "Create News Success" });
    }

    updateNewsProcess = async (newsModel, res) => {
        // console.log(newsSchema.newsId);
        // const news = await News.findByIdAndUpdate(id, newsSchema, { new: true });
        // if (!news) return res.status(404).send('News not found');
        // return res.send(news);
        // return res.status(200).send({ response: "Update News Success" });
        // return res.status(200).send({ response: newsSchema.id });
        
        console.log(newsModel.id)
        console.log(newsModel.detail);
        
        const findNews = await News.findOne({ _id: newsModel.id });
        if (findNews) {
            findNews.topic = newsModel.topic
            findNews.date = newsModel.date || findNews.date;
            findNews.detail = newsModel.detail || findNews.detail;
            findNews.category = newsModel.category || findNews.category;
            findNews.image = newsModel.image || findNews.image;
            findNews.link = newsModel.link || findNews.link;

            await findNews.save();
            return res.status(200).send(findNews);
        }
        else {
            return res.status(404).send({ response: "Not Found News" });
        }
    }

  
   }


module.exports = {
    NewsProcess
}
