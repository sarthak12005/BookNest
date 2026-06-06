const dotenv = require('dotenv');
dotenv.config({ path: 'd:/My_Projects/BookStore/be/.env' });
const mongoose = require('mongoose');

const Category = require('../../modules/Categories/schemas/categories.schema');
const Book = require('../../modules/Books/schemas/books.schema');
const Author = require('../../modules/Books/schemas/author.schema');

const MONGO_URI = process.env.MONGO_URI;

const categoriesData = [
  { name: 'Fiction', slug: 'fiction', image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', description: 'Fictional novels and literature' },
  { name: 'Non-Fiction', slug: 'non-fiction', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500', description: 'Real world facts and information' },
  { name: 'Self-Improvement', slug: 'self-improvement', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500', description: 'Personal growth and development' },
  { name: 'Business', slug: 'business', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500', description: 'Business, finance and economics' },
  { name: 'Rare Books', slug: 'rare-books', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500', description: 'Rare and collectable books' }
];

const booksRaw = [
  {
    title: "The Psychology of Money",
    authorName: "Morgan Housel",
    description: "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.",
    shortDescription: "Timeless lessons on wealth, greed, and happiness.",
    isbn: "9780857197689",
    publisher: "Harriman House",
    publicationDate: "2020-09-08",
    language: "English",
    categorySlug: "business",
    tags: ["finance", "psychology", "wealth", "business"],
    price: 699,
    discountPrice: 516,
    stock: 50,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 12450
  },
  {
    title: "Atomic Habits",
    authorName: "James Clear",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    shortDescription: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    isbn: "9781847941831",
    publisher: "Random House Business",
    publicationDate: "2018-10-18",
    language: "English",
    categorySlug: "self-improvement",
    tags: ["habits", "self-help", "productivity", "success"],
    price: 799,
    discountPrice: 509,
    stock: 35,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.9,
    totalReviews: 34120
  },
  {
    title: "Deep Work",
    authorName: "Cal Newport",
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time. Deep Work will make you better at what you do and provide the sense of true fulfillment that comes from craftsmanship.",
    shortDescription: "Rules for Focused Success in a Distracted World",
    isbn: "9781455586691",
    publisher: "Grand Central Publishing",
    publicationDate: "2016-01-05",
    language: "English",
    categorySlug: "self-improvement",
    tags: ["focus", "productivity", "deep work", "career"],
    price: 650,
    discountPrice: 470,
    stock: 20,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 8940
  },
  {
    title: "The Alchemist",
    authorName: "Paulo Coelho",
    description: "Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
    shortDescription: "A fable about following your dream",
    isbn: "9780062315007",
    publisher: "HarperOne",
    publicationDate: "1993-04-25",
    language: "English",
    categorySlug: "fiction",
    tags: ["fiction", "philosophy", "motivation", "dreams"],
    price: 499,
    discountPrice: 349,
    stock: 60,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 24215
  },
  {
    title: "Rich Dad Poor Dad",
    authorName: "Robert Kiyosaki",
    description: "Rich Dad Poor Dad is Robert's story of growing up with two dads — his real father and the father of his best friend, his rich dad — and the ways in which both men shaped his thoughts about money and investing.",
    shortDescription: "What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
    isbn: "9781612681139",
    publisher: "Plata Publishing",
    publicationDate: "2017-04-11",
    language: "English",
    categorySlug: "business",
    tags: ["finance", "wealth", "money", "investing"],
    price: 599,
    discountPrice: 399,
    stock: 15,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.6,
    totalReviews: 15400
  },
  {
    title: "The 5 AM Club",
    authorName: "Robin Sharma",
    description: "Legendary leadership and elite performance expert Robin Sharma introduced The 5am Club concept over twenty years ago, based on a revolutionary morning routine that has helped his clients maximize their productivity, activate their best health and bulletproof their serenity in this age of overwhelming complexity.",
    shortDescription: "Own Your Morning. Elevate Your Life.",
    isbn: "9781443456629",
    publisher: "HarperCollins",
    publicationDate: "2018-12-04",
    language: "English",
    categorySlug: "self-improvement",
    tags: ["productivity", "morning routine", "success", "discipline"],
    price: 699,
    discountPrice: 520,
    stock: 25,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71zytzrg6lL.jpg"],
    status: "published",
    isFeatured: false,
    averageRating: 4.5,
    totalReviews: 9280
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    authorName: "Mark Manson",
    description: "In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be 'positive' all the time so that we can truly become better, happier people.",
    shortDescription: "A Counterintuitive Approach to Living a Good Life",
    isbn: "9780062457714",
    publisher: "Harper",
    publicationDate: "2016-09-13",
    language: "English",
    categorySlug: "self-improvement",
    tags: ["self-help", "mindset", "life", "motivation"],
    price: 620,
    discountPrice: 430,
    stock: 30,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71tBAL595FL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.4,
    totalReviews: 18400
  },
  {
    title: "Zero to One",
    authorName: "Simon Sinek",
    description: "The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. If you are copying these guys, you aren’t learning from them.",
    shortDescription: "Notes on Startups, or How to Build the Future",
    isbn: "9780804139298",
    publisher: "Currency",
    publicationDate: "2014-09-16",
    language: "English",
    categorySlug: "business",
    tags: ["startup", "business", "innovation", "entrepreneurship"],
    price: 750,
    discountPrice: 540,
    stock: 18,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.6,
    totalReviews: 6150
  },
  {
    title: "Klara and the Sun",
    authorName: "Kazuo Ishiguro",
    description: "Klara and the Sun, the first novel by Kazuo Ishiguro since he was awarded the Nobel Prize in Literature, tells the story of Klara, an Artificial Friend with outstanding observational qualities, who, from her place in the store, watches carefully the behavior of those who come in to browse, and of those who pass on the street outside.",
    shortDescription: "A novel about love, humanity, and AI",
    isbn: "9780593318171",
    publisher: "Knopf",
    publicationDate: "2021-03-02",
    language: "English",
    categorySlug: "fiction",
    tags: ["fiction", "sci-fi", "dystopian", "nobel"],
    price: 699,
    discountPrice: 549,
    stock: 12,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71478u75J-L.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 4215
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    authorName: "Yuval Noah Harari",
    description: "Destined to become a modern classic, Sapiens is a thrilling, provocative, and popular narrative of our history from the perspective of evolutionary biology and anthropology.",
    shortDescription: "A brief history of humankind",
    isbn: "9780062316097",
    publisher: "Harper",
    publicationDate: "2015-02-10",
    language: "English",
    categorySlug: "non-fiction",
    tags: ["history", "anthropology", "science", "non-fiction"],
    price: 599,
    discountPrice: 450,
    stock: 40,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 28400
  },
  {
    title: "The Lean Startup",
    authorName: "Eric Ries",
    description: "Most startups fail. But many of those failures are preventable. The Lean Startup is a new approach being adopted across the globe, changing the way companies are built and new products are launched.",
    shortDescription: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
    isbn: "9780307887894",
    publisher: "Crown Business",
    publicationDate: "2011-09-13",
    language: "English",
    categorySlug: "business",
    tags: ["startup", "business", "entrepreneurship", "management"],
    price: 750,
    discountPrice: 590,
    stock: 22,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/81-KBpQWxaL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 8900
  },
  {
    title: "Thinking, Fast and Slow",
    authorName: "Daniel Kahneman",
    description: "Daniel Kahneman, recipient of the Nobel Prize in Economic Sciences, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    shortDescription: "A masterclass in human decision making and cognitive psychology",
    isbn: "9780374275631",
    publisher: "Farrar, Straus and Giroux",
    publicationDate: "2011-10-25",
    language: "English",
    categorySlug: "business",
    tags: ["psychology", "decision-making", "economics", "business"],
    price: 899,
    discountPrice: 620,
    stock: 15,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/61f1YfCxL1L.jpg"],
    status: "published",
    isFeatured: false,
    averageRating: 4.6,
    totalReviews: 12150
  },
  {
    title: "The Power of Now",
    authorName: "Eckhart Tolle",
    description: "To make the journey into the Power of Now we will need to leave our analytical mind and its false created self, the ego, behind. From the very first page of this extraordinary book, we travel to a significantly higher altitude where we breathe a lighter air.",
    shortDescription: "A Guide to Spiritual Enlightenment",
    isbn: "9781577314804",
    publisher: "New World Library",
    publicationDate: "1999-10-06",
    language: "English",
    categorySlug: "self-improvement",
    tags: ["spirituality", "self-help", "mindfulness", "mindset"],
    price: 450,
    discountPrice: 320,
    stock: 28,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/7149-Vn5jHL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 14210
  },
  {
    title: "Siddhartha",
    authorName: "Paulo Coelho",
    description: "A novel about Santiago, a shepherd boy, who journeys to find a treasure, but learns to search within his soul instead. Re-curated to show Coelho style spiritual quest.",
    shortDescription: "The classic spiritual journey novel",
    isbn: "9780553208849",
    publisher: "Bantam Books",
    publicationDate: "1981-06-01",
    language: "English",
    categorySlug: "fiction",
    tags: ["fiction", "philosophy", "spirituality"],
    price: 299,
    discountPrice: 199,
    stock: 45,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/7180qjOWK1L.jpg"],
    status: "published",
    isFeatured: false,
    averageRating: 4.6,
    totalReviews: 6840
  },
  {
    title: "1984",
    authorName: "George Orwell",
    description: "Winston Smith reins in his rebellion against the Party's omnipresent leader, Big Brother. George Orwell's classic dystopian vision is a chilling reminder of government surveillance and control.",
    shortDescription: "The ultimate dystopian classic",
    isbn: "9780451524935",
    publisher: "Signet Classic",
    publicationDate: "1950-07-01",
    language: "English",
    categorySlug: "fiction",
    tags: ["fiction", "dystopian", "politics", "classic"],
    price: 399,
    discountPrice: 299,
    stock: 50,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71kxaZqdWYI.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.8,
    totalReviews: 32150
  },
  {
    title: "A Brief History of Time",
    authorName: "Stephen Hawking",
    description: "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores the most complex concepts of physics and cosmology.",
    shortDescription: "From the Big Bang to Black Holes",
    isbn: "9780553380163",
    publisher: "Bantam",
    publicationDate: "1998-09-01",
    language: "English",
    categorySlug: "non-fiction",
    tags: ["science", "physics", "cosmology", "non-fiction"],
    price: 650,
    discountPrice: 499,
    stock: 18,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/81+GB+y9EGL.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 8940
  },
  {
    title: "Man's Search for Meaning",
    authorName: "Viktor Frankl",
    description: "Psychiatrist Viktor Frankl's memoir of life in Nazi death camps has riveted generations of readers with its descriptions of life in Nazi death camps and its lessons for spiritual survival.",
    shortDescription: "An introduction to logotherapy and survival",
    isbn: "9780807014295",
    publisher: "Beacon Press",
    publicationDate: "2006-06-01",
    language: "English",
    categorySlug: "non-fiction",
    tags: ["psychology", "memoir", "philosophy", "non-fiction"],
    price: 499,
    discountPrice: 350,
    stock: 32,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/6115q6x4ePL.jpg"],
    status: "published",
    isFeatured: false,
    averageRating: 4.8,
    totalReviews: 19420
  },
  {
    title: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    description: "Written for J.R.R. Tolkien's own children, The Hobbit met with instant critical acclaim when published. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar.",
    shortDescription: "The prelude to The Lord of the Rings",
    isbn: "9780547928227",
    publisher: "Houghton Mifflin Harcourt",
    publicationDate: "2012-09-18",
    language: "English",
    categorySlug: "rare-books",
    tags: ["fantasy", "fiction", "classic", "adventure"],
    price: 999,
    discountPrice: 799,
    stock: 5,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.9,
    totalReviews: 28900
  },
  {
    title: "Start with Why",
    authorName: "Simon Sinek",
    description: "Simon Sinek started a movement to help people become more inspired at work, and in turn inspire their colleagues and customers. Start With Why is his first book, detailing how great leaders inspire action.",
    shortDescription: "How great leaders inspire everyone to take action",
    isbn: "9781591846444",
    publisher: "Portfolio",
    publicationDate: "2011-12-27",
    language: "English",
    categorySlug: "business",
    tags: ["leadership", "business", "motivation", "success"],
    price: 650,
    discountPrice: 480,
    stock: 24,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/713mM-b855L.jpg"],
    status: "published",
    isFeatured: true,
    averageRating: 4.7,
    totalReviews: 18450
  },
  {
    title: "Crime and Punishment",
    authorName: "Fyodor Dostoevsky",
    description: "Raskolnikov, a destitute and desperate former student, wanders through the slums of St. Petersburg and commits a random murder without remorse. Only the love of a devoted woman can help redeem him.",
    shortDescription: "The psychological masterpiece of guilt and redemption",
    isbn: "9780140449136",
    publisher: "Penguin Classics",
    publicationDate: "2002-11-26",
    language: "English",
    categorySlug: "fiction",
    tags: ["fiction", "classics", "psychology", "philosophical"],
    price: 499,
    discountPrice: 350,
    stock: 15,
    coverImages: ["https://images-na.ssl-images-amazon.com/images/I/71O2XIyig3L.jpg"],
    status: "published",
    isFeatured: false,
    averageRating: 4.8,
    totalReviews: 14200
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding");

    // Clean up
    await Category.deleteMany({});
    console.log("Deleted old categories");
    await Book.deleteMany({});
    console.log("Deleted old books");

    // Seed categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`Seeded ${createdCategories.length} categories`);

    // Map of slug -> categoryId
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });

    // Fetch authors to link by name
    const authors = await Author.find({});
    console.log(`Found ${authors.length} authors in DB`);

    const authorMap = {};
    authors.forEach(auth => {
      authorMap[auth.name.toLowerCase()] = auth._id;
    });

    // Seed books
    const booksToInsert = [];
    for (const b of booksRaw) {
      const catId = categoryMap[b.categorySlug];
      if (!catId) {
        console.error(`Category slug ${b.categorySlug} not found!`);
        continue;
      }

      // Try to find author by name
      let authorId = authorMap[b.authorName.toLowerCase()];
      if (!authorId) {
        // If not found, look up by partial name or create a placeholder
        console.log(`Author ${b.authorName} not found in map, looking up or creating...`);
        const foundAuth = await Author.findOne({ name: new RegExp(b.authorName, 'i') });
        if (foundAuth) {
          authorId = foundAuth._id;
        } else {
          // Create new author
          const slug = b.authorName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
          const newAuth = await Author.create({
            name: b.authorName,
            slug: slug,
            bio: `Author bio for ${b.authorName}`,
            isActive: true
          });
          authorId = newAuth._id;
          authorMap[b.authorName.toLowerCase()] = authorId;
          console.log(`Created new author: ${b.authorName}`);
        }
      }

      booksToInsert.push({
        title: b.title,
        slug: b.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        author: authorId,
        description: b.description,
        shortDescription: b.shortDescription,
        isbn: b.isbn,
        publisher: b.publisher,
        publicationDate: new Date(b.publicationDate),
        language: b.language,
        category: catId,
        tags: b.tags,
        price: b.price,
        discountPrice: b.discountPrice,
        stock: b.stock,
        coverImages: b.coverImages,
        status: b.status,
        isFeatured: b.isFeatured,
        averageRating: b.averageRating,
        totalReviews: b.totalReviews,
        searchKeywords: [b.title.toLowerCase(), b.authorName.toLowerCase(), ...b.tags]
      });
    }

    const createdBooks = await Book.insertMany(booksToInsert);
    console.log(`Seeded ${createdBooks.length} books successfully!`);

    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
