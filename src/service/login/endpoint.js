const { LoginProcess } = require('./process');
const repo = require('./repository')

class LoginEndpoint {

    constructor() {
        this.loginModel = repo.loginModel
        this.loginSchema = repo.loginSchema
    }

    addLoginEndpoint = (req, res) => {
        this.loginModel.loginId = req.body.loginId
        this.loginModel.username = req.body.username
        this.loginModel.password = req.body.password
        this.loginModel.lname = req.body.lname
        this.loginModel.email = req.body.email
        this.loginModel.year = req.body.year
        this.loginModel.branch = req.body.branch
        
        new LoginProcess().addLoginProcess(this.loginModel,res)
    }

    updateLoginEndpoint = (req, res) => {
        this.loginModel.id = req.params.id 
        this.loginModel.username = req.body.username
        this.loginModel.password = req.body.password
        this.loginModel.lname = req.body.lname
        this.loginModel.email = req.body.email
        this.loginModel.year = req.body.year
        this.loginModel.branch = req.body.branch

        new LoginProcess().updateLoginProcess(this.loginModel,res)
    }
}

module.exports = {
    LoginEndpoint
}