require('dotenv').config();
const Permission = require('../../modules/Permissions/schemas/permissions.schema');

// ✅ PERMISSIONS LIST
const permissions = [

  { name: 'SYSTEM ALL', code: 'SYSTEM_ALL' },

  // 📚 Books
  { name: 'READ BOOKS', code: 'READ_BOOKS' },
  { name: 'CREATE BOOK', code: 'CREATE_BOOK' },
  { name: 'UPDATE BOOK', code: 'UPDATE_BOOK' },
  { name: 'DELETE BOOK', code: 'DELETE_BOOK' },

  // 📂 Categories
  { name: 'READ CATEGORIES', code: 'READ_CATEGORIES' },
  { name: 'CREATE CATEGORY', code: 'CREATE_CATEGORY' },
  { name: 'UPDATE CATEGORY', code: 'UPDATE_CATEGORY' },
  { name: 'DELETE CATEGORY', code: 'DELETE_CATEGORY' },

  // 👤 Profile
  { name: 'READ PROFILE', code: 'READ_PROFILE' },
  { name: 'UPDATE PROFILE', code: 'UPDATE_PROFILE' },
  { name: 'DELETE PROFILE', code: 'DELETE_PROFILE' },

  // ❤️ Wishlist
  { name: 'READ WISHLIST', code: 'READ_WISHLIST' },
  { name: 'ADD TO WISHLIST', code: 'ADD_TO_WISHLIST' },
  { name: 'REMOVE FROM WISHLIST', code: 'REMOVE_FROM_WISHLIST' },

  // 🛒 Cart
  { name: 'READ CART', code: 'READ_CART' },
  { name: 'CREATE CART', code: 'CREATE_CART' },
  { name: 'UPDATE CART', code: 'UPDATE_CART' },
  { name: 'DELETE CART', code: 'DELETE_CART' },

  // 📦 Orders
  { name: 'PLACE ORDER', code: 'PLACE_ORDER' },
  { name: 'READ ORDERS', code: 'READ_ORDERS' },
  { name: 'UPDATE ORDER', code: 'UPDATE_ORDER' },
  { name: 'CANCEL ORDER', code: 'CANCEL_ORDER' },
  { name: 'DELETE ORDER', code: 'DELETE_ORDER' },

  // 💳 Payments
  { name: 'COMPLETE PAYMENT', code: 'COMPLETE_PAYMENT' },
  { name: 'READ PAYMENTS', code: 'READ_PAYMENTS' },
  { name: 'REFUND PAYMENT', code: 'REFUND_PAYMENT' },

  // ⭐ Reviews
  { name: 'READ REVIEWS', code: 'READ_REVIEWS' },
  { name: 'CREATE REVIEW', code: 'CREATE_REVIEW' },
  { name: 'UPDATE REVIEW', code: 'UPDATE_REVIEW' },
  { name: 'DELETE REVIEW', code: 'DELETE_REVIEW' },

  // 👥 Users
  { name: 'READ USERS', code: 'READ_USERS' },
  { name: 'CREATE USER', code: 'CREATE_USER' },
  { name: 'UPDATE USER', code: 'UPDATE_USER' },
  { name: 'DELETE USER', code: 'DELETE_USER' },
  { name: 'BLOCK USER', code: 'BLOCK_USER' },

  // 🔐 Roles & Permissions
  { name: 'READ ROLES', code: 'READ_ROLES' },
  { name: 'CREATE ROLE', code: 'CREATE_ROLE' },
  { name: 'UPDATE ROLE', code: 'UPDATE_ROLE' },
  { name: 'DELETE ROLE', code: 'DELETE_ROLE' },

  { name: 'READ PERMISSIONS', code: 'READ_PERMISSIONS' },
  { name: 'CREATE PERMISSION', code: 'CREATE_PERMISSION' },
  { name: 'UPDATE PERMISSION', code: 'UPDATE_PERMISSION' },
  { name: 'DELETE PERMISSION', code: 'DELETE_PERMISSION' },

  // 📊 Analytics
  { name: 'READ ANALYTICS', code: 'READ_ANALYTICS' },
  { name: 'READ DASHBOARD', code: 'READ_DASHBOARD' },

  // 📈 Inventory
  { name: 'READ INVENTORY', code: 'READ_INVENTORY' },
  { name: 'UPDATE INVENTORY', code: 'UPDATE_INVENTORY' },

  // 🚚 Shipping
  { name: 'READ SHIPPING', code: 'READ_SHIPPING' },
  { name: 'UPDATE SHIPPING', code: 'UPDATE_SHIPPING' },

  // 🏷️ Coupons
  { name: 'READ COUPONS', code: 'READ_COUPONS' },
  { name: 'CREATE COUPON', code: 'CREATE_COUPON' },
  { name: 'UPDATE COUPON', code: 'UPDATE_COUPON' },
  { name: 'DELETE COUPON', code: 'DELETE_COUPON' },

  // 📢 Notifications
  { name: 'READ NOTIFICATIONS', code: 'READ_NOTIFICATIONS' },
  { name: 'SEND NOTIFICATION', code: 'SEND_NOTIFICATION' },

  // 📄 Content / CMS
  { name: 'READ CONTENT', code: 'READ_CONTENT' },
  { name: 'CREATE CONTENT', code: 'CREATE_CONTENT' },
  { name: 'UPDATE CONTENT', code: 'UPDATE_CONTENT' },
  { name: 'DELETE CONTENT', code: 'DELETE_CONTENT' },

];

// ✅ SEED FUNCTION
async function seedPermissions(session) {
  try {

    for (const perm of permissions) {
      await Permission.updateOne(
        { code: perm.code }, // check by code
        { $set: perm },
        { upsert: true, session } // insert if not exists
      );
    }

    console.log('✅ Permissions seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding permissions:', error);
  }
}



// RUN
module.exports = seedPermissions;
