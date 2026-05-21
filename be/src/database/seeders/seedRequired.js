const mongoose = require('mongoose');

const connectDB = require('../../config/db');

const seedPermissions = require('./seedPermissions');
const seedRoles = require('./seedRoles');
const seedSuperAdmin = require('./seedSuperAdmin');

const runSeeder = async () => {
  let session;

  try {
    await connectDB();

    // start transaction
    session = await mongoose.startSession();

    session.startTransaction();

    // pass session everywhere
    await seedPermissions(session);

    await seedRoles(session);

    await seedSuperAdmin(session);

    // commit transaction
    await session.commitTransaction();

    console.log('✅ All Seeders Executed Successfully');

    process.exit(0);

  } catch (error) {

    console.log('❌ Seeder Failed');
    console.log(error);

    // rollback everything
    if (session) {
      await session.abortTransaction();
    }

    console.log('🔄 Rolled Back All Changes');

    process.exit(1);

  } finally {

    if (session) {
      session.endSession();
    }

  }
};

runSeeder();