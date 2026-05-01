const mongoose = require('mongoose');
require('dotenv').config();

// ✅ IMPORT MODEL (VERY IMPORTANT)
const Permission = require('../../modules/Permissions/schemas/permissions.schema');

// ✅ DB CONNECT
async function connectDB() {
  console.log(process.env.MONGO_URI)
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ DB Connected');
}

// ✅ PERMISSIONS LIST
const permissions = [
  { name: 'READ BOOKS', code: 'READ_BOOKS' },
  { name: 'READ CATEGORIES', code: 'READ_CATEGORIES' },
  { name: 'COMPLETE PAYMENT', code: 'COMPLETE_PAYMENT' },
  { name: 'READ PROFILE', code: 'READ_PROFILE' },
  { name: 'UPDATE PROFILE', code: 'UPDATE_PROFILE' },
  { name: 'DELETE PROFILE', code: 'DELETE_PROFILE' },
  { name: 'READ CART', code: 'READ_CART' },
  { name: 'CREATE CART', code: 'CREATE_CART' },
  { name: 'UPDATE CART', code: 'UPDATE_CART' },
  { name: 'DELETE CART', code: 'DELETE_CART' },
  { name: 'SYSTEM ALL', code: 'SYSTEM_ALL' },
];

// ✅ SEED FUNCTION
async function seedPermissions() {
  try {
    await connectDB();

    for (const perm of permissions) {
      await Permission.updateOne(
        { code: perm.code }, // check by code
        { $set: perm },
        { upsert: true } // insert if not exists
      );
    }

    console.log('✅ Permissions seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding permissions:', error);
    process.exit(1);
  }
}

// RUN
seedPermissions();
