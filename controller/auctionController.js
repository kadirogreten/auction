const { validationResult } = require('express-validator');
const AuctionService = require("../service/auctionService");


getAllAuctions = async (req, res, next) => {
    // check request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation Error!",
            errors: errors.array()
        });
    }

    const result = await AuctionService.getAll();
    res.send(result);
}

findAuctionById = async (req, res, next) => {
    // check request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errorMessage: "Validation Error!",
            errors: errors.array()
        });
    }

    const { id } = req.body;
    const result = await AuctionService.findAuctionById(id);

    res.send(result);
}


module.exports = {
    getAllAuctions,
    findAuctionById
}