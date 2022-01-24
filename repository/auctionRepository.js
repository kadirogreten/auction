// MODEL
const Auction = require("../model/auction");

// pagination
const { paginationData } = require("../middlewares/paginationMiddleware");

// METHODS

getAllWithPagination = async (pageModel) => {
  let result;
  try {
    result = paginationData(Auction, pageModel.page, pageModel.limit);
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: result,
  };
};

findAuctionById = async (id) => {
  // return Promise result from MongoDB
  let result;
  try {
    result = await Auction.findById({
      _id: id,
    });
  } catch (error) {
    return {
      success: false,
      errorMessage: error,
    };
  }
  return {
    success: true,
    data: result,
  };
};

module.exports = {
  findAuctionById,
  getAllWithPagination,
};
