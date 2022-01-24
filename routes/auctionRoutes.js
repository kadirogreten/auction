const express = require("express");
const router = express.Router();
const { check } = require('express-validator'); // bunu body ve request leri validate etmek için kullanıyoruz

// Controller
const AuctionController = require("../controller/auctionController");

router.get("/all", AuctionController.getAllAuctions);

router.post("/find",
    check("id")
        .exists()
        .notEmpty(),
    AuctionController.findAuctionById // tüm validasyonlardan sonra artık controller a gönderiyoruz
);

module.exports = router;