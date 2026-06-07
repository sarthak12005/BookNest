const Category = require('../../modules/Categories/schemas/categories.schema');

const categoriesData = [
  {
    name: 'Fiction',
    slug: 'fiction',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
    description: 'Fictional novels and literature',
    sortOrder: 1,
  },
  {
    name: 'Non-Fiction',
    slug: 'non-fiction',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500',
    description: 'Real world facts and information',
    sortOrder: 2,
  },
  {
    name: 'Self-Improvement',
    slug: 'self-improvement',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
    description: 'Personal growth and development',
    sortOrder: 3,
  },
  {
    name: 'Business',
    slug: 'business',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500',
    description: 'Business, finance and economics',
    sortOrder: 4,
  },
  {
    name: 'Rare Books',
    slug: 'rare-books',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500',
    description: 'Rare and collectable books',
    sortOrder: 5,
  },
];

async function seedCategories(session) {
  try {
    for (const cat of categoriesData) {
      await Category.findOneAndUpdate(
        { name: cat.name },
        {
          $set: {
            name: cat.name,
            slug: cat.slug,
            image: cat.image,
            description: cat.description,
            sortOrder: cat.sortOrder,
            isActive: true,
            isDeleted: false,
          },
        },
        { upsert: true, session, new: true }
      );
    }
    console.log('✅ Categories Seeded Successfully');
  } catch (error) {
    console.error('❌ Error Seeding Categories:', error);
    throw error;
  }
}

module.exports = seedCategories;
