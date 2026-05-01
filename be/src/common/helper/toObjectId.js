const mongoose = require('mongoose');

const toObjectIdOrThrow = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid ObjectId');
    error.statusCode = 400;
    throw error;
  }

  return new mongoose.Types.ObjectId(id);
};

module.exports = { toObjectIdOrThrow };
