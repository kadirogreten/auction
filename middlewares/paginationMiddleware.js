const paginationData = async (model, pageNumber, maxlimit) => {
  if (pageNumber == 0 || pageNumber == null || pageNumber == undefined) {
    pageNumber = 1;
  }

  if (maxlimit == 0 || maxlimit == null || maxlimit == undefined) {
    maxlimit = 5;
  }
  const page = parseInt(pageNumber);
  const limit = parseInt(maxlimit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};
  results.totalCount = await model.countDocuments().exec();
  results.totalPages = Math.ceil(await model.countDocuments().exec() / limit);
  if (startIndex > 0) {
    results.previousPage = {
      page: page - 1,
      limit: limit,
    };
  } else {
    results.previousPage = {
      page: null,
      limit: limit,
    };
  }

  if (endIndex < (await model.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  } else {
    results.next = {
      page: null,
      limit: limit,
    };
  }
  try {
    results.result = await model.find().limit(limit).skip(startIndex).exec();

    return results;
  } catch (error) {
    return res.status(500).json({
      errorMessage: error,
      success: false,
    });
  }
};

module.exports = {
  paginationData,
};
