async function syncAllIndexes(connection) {
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "Skipping index sync in production",
    );

    return;
  }

  const models = connection.models;

  for (const modelName of Object.keys(models)) {
    try {
      const result =
        await models[modelName].syncIndexes();

      console.log(
        `Indexes synced for ${modelName}:`,
        result,
      );
    } catch (error) {
      console.error(
        `Failed to sync indexes for ${modelName}:`,
        error,
      );
    }
  }
}

module.exports = {
  syncAllIndexes,
};