const Role = require('../../modules/Roles/schemas/roles.schema');
const Permission = require('../../modules/Permissions/schemas/permissions.schema');

const USER_PERMISSION_CODES = [
  'READ_PROFILE',
  'UPDATE_PROFILE',

  'READ_BOOKS',
  'READ_CATEGORIES',

  'READ_WISHLIST',
  'ADD_TO_WISHLIST',
  'REMOVE_FROM_WISHLIST',

  'READ_CART',
  'CREATE_CART',
  'UPDATE_CART',
  'DELETE_CART',

  'PLACE_ORDER',
  'READ_ORDERS',
  'CANCEL_ORDER',

  'COMPLETE_PAYMENT',

  'READ_REVIEWS',
  'CREATE_REVIEW',
  'UPDATE_REVIEW',
  'DELETE_REVIEW',

  'READ_NOTIFICATIONS',
];

const seedRoles = async (session) => {
  try {

    const roleName = process.env.ADMIN_ROLE_NAME;

    // IMPORTANT
    // use same transaction session
    const allPermissions = await Permission.find()
      .session(session);

    const AdminRole = await Role.findOneAndUpdate(
      { code: roleName },
      {
        name: 'Authority',

        code: roleName,

        // MongoDB ObjectIds automatically
        permissions: allPermissions.map((p) => p._id),

        isActive: true,
      },
      {
        upsert: true,
        new: true,
        session,
      }
    );

    // USER PERMISSIONS
    const userPermissions = await Permission.find({
      code: { $in: USER_PERMISSION_CODES },
    }).session(session);

    const userRole = await Role.findOneAndUpdate(
      { code: 'USER' },
      {
        name: 'user',

        code: 'USER',

        permissions: userPermissions.map((p) => p._id),

        isActive: true,
      },
      {
        upsert: true,
        new: true,
        session,
      }
    );

    console.log('✅ Roles Seeded');

    return {
      AdminRole,
      userRole,
    };

  } catch (error) {

    throw error;

  }
};

module.exports = seedRoles;