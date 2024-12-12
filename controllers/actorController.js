const Actor = require('../models/actorModel')
const { grasp, handleError, sendResponse } = require("../utility/response-utility");

exports.createActor = grasp(async (req, res) => {
    try {
        const newActorData = await Actor.create(req.body);
        sendResponse(res, 201, "success", "New Actor added successfully!", newActorData)

    } catch (error) {
        handleError(res, error)
    }
})

exports.updateActor = grasp(async (req, res) => {
    try {
        const { id } = req.params;

        const updatedActorData = await Actor.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedActorData) {
            return sendResponse(res, 404, "fail", `Actor not found`);
        }
        sendResponse(res, 201, "success", "Actor Date updated successfully!", updatedActorData)

    } catch (error) {
        handleError(res, error)
    }
})