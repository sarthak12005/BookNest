const mongoose = require("mongoose");

const toObjectIdOrThrow = async (id) => {

  // ❌ Empty check
  if (!id) {
    const error = new Error("Invalid ObjectId");
    error.statusCode = 400;
    throw error;
  }

  // ✅ Already ObjectId
  if (id instanceof mongoose.Types.ObjectId) {
    return id;
  }

  // ✅ Convert ObjectId-like values to string
  const stringId = id.toString();

  // ❌ Invalid ObjectId
  if (!mongoose.Types.ObjectId.isValid(stringId)) {
    const error = new Error("Invalid ObjectId");
    error.statusCode = 400;
    throw error;
  }

  // ✅ Convert string → ObjectId
  return new mongoose.Types.ObjectId(stringId);

};

module.exports = { toObjectIdOrThrow };