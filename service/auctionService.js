const AuctionRepository = require("../repository/auctionRepository");

getAll = async () => {
    return await AuctionRepository.getAllWithPagination();
}

findAuctionById = async (id) => {
    return await AuctionRepository.findAuctionById(id);
}


module.exports = {
    getAll,
    findAuctionById,
};