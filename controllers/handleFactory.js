const { grasp, sendResponse, handleError } = require("../utility/response-utility");

exports.getAllData = (Model, limit) => grasp(async (req, res) => {
    try {
        let data;
        if (limit) {
            data = await Model.find().limit(limit)
        }else{
            data = await Model.find();
        }
        sendResponse(res, 200, "success", "Data successfully fetched!", data);
    } catch (err) {
        handleError(res, err);
    }
})