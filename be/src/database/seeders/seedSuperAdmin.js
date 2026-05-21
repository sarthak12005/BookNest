const User = require('../../modules/Users/schema/users.schema');
const Role = require('../../modules/Roles/schemas/roles.schema');
require('dotenv').config();
const seedSuperAdmin = async (session) => {
  try {
    const role = await Role.findOne({
      code: process.env.ADMIN_ROLE_NAME,
    }).session(session);

    if (!role) {
      console.log('❌ ADMIN role not found');
      return;
    }

    const existingAdmin = await User.findOne({
      email: process.env.SUPER_ADMIN_EMAIL,
    }).session(session);

    if (existingAdmin) {
      console.log('✅ Super Admin Already Exists');
      return;
    }

    await User.create(
      [
        {
          fullName: 'Super Admin',
          username: 'superadmin',
          email: process.env.SUPER_ADMIN_EMAIL,
          password: process.env.SUPER_ADMIN_PASS,
          role: role._id,
          profilePic: '',
          isVerified: true,
          isActive: true,
          blocked: false,
          deleted: false,
          bio: 'System Super Administrator',
          wishlist: [],
          purchasedBooks: [],
        },
      ],
      { session }
    );

    console.log('✅ Admin Created');
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedSuperAdmin;
