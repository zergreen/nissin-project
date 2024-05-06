const Login = require('../../models/Login');
// const Relation = require('../../models/Login');
// const { loginModel } = require('./repository');
class LoginProcess {

    addLoginProcess = async (loginModel, res) => {

        const LoginObjs = new Login({
            loginId: loginModel.loginId,
            username: loginModel.username,
            password: loginModel.password,
            lname: loginModel.lname,
            email: loginModel.email,
            year: loginModel.year,
            branch: loginModel.branch,

            createdAt: new Date(),
        })

        await LoginObjs.save();
        return res.status(201).send(LoginObjs);
        // return res.status(201).send({ response: "Create News Success" });
    }

    updateLoginProcess = async (loginModel, res) => {
        // console.log(RelationSchema.relateId);
        // const news = await News.findByIdAndUpdate(id, RelationSchema, { new: true });
        // if (!news) return res.status(404).send('News not found');
        // return res.send(news);
        // return res.status(200).send({ response: "Update News Success" });
        // return res.status(200).send({ response: RelationSchema.id });
        
        
        const findNews = await Login.findOne({ _id: loginModel.id });
        if (findNews) {
            findNews.username = loginModel.username
            findNews.password = loginModel.password || findNews.password;
            findNews.lname = loginModel.lname || findNews.lname;
            findNews.email = loginModel.email || findNews.email;
            findNews.year = loginModel.year || findNews.year;
            findNews.branch = loginModel.branch || findNews.branch;
 
            await findNews.save();
            return res.status(200).send(findNews);
        }
        else {
            return res.status(404).send({ response: "Not Found News" });
        }
    }

  
   }


module.exports = {
    LoginProcess
}
