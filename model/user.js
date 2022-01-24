const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "User",
        enum: ["User", "Moderator", "Admin", "Superuser"],
    },

    address: {
        type: String,
        required: false,
    },


    identityNumber: {
        type: String,
    },

    taxNumber: {
        type: String,
    },

    taxOffice: {
        type: String,
    },

    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
    }],

    myWinAuction: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auction'
    }],

    createdAt: {
        type: Date,
        required: false,
    },

    updatedAt: {
        type: Date,
        required: false,
    },

    deletedAt: {
        type: Date,
        required: false,
    },
}, {
    timestamp: true,
});

module.exports = mongoose.model("User", schema);