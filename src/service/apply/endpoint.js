const { ApplyProcess } = require('./process');
const repo = require('./repository')

class ApplyEndpoint {

    constructor() {
        this.applyModel = repo.applyModel
        this.applySchema = repo.applySchema
    }

    addApplyEndpoint = (req, res) => {
        this.applyModel.applyId = req.body.applyId
        this.applyModel.username = req.body.username
        this.applyModel.name = req.body.name
        this.applyModel.branch = req.body.branch
        this.applyModel.year = req.body.year

        new ApplyProcess().addApplyProcess(this.applyModel,res)
    }

    updateApplyEndpoint = (req, res) => {
        this.applyModel.id = req.params.id 
        this.applyModel.username = req.body.username
        this.applyModel.name = req.body.name
        this.applyModel.branch = req.body.branch
        this.applyModel.year = req.body.year

        new ApplyProcess().updateApplyProcess(this.applyModel,res)
    }
}

module.exports = {
    ApplyEndpoint
}