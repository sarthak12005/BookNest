// seeds/author.seed.js
require("dotenv").config();

const mongoose = require("mongoose");
const Author = require("../../modules/Books/schemas/author.schema");

const MONGO_URI = process.env.MONGO_URI;

const authors = [
  {
    name: "James Clear",
    slug: "james-clear",
    bio: "Author of Atomic Habits and expert on habit formation and productivity.",
    image: "https://example.com/authors/james-clear.jpg",
    genres: ["Self Help", "Productivity"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Morgan Housel",
    slug: "morgan-housel",
    bio: "Author focused on psychology, money, investing, and human behavior.",
    image: "https://example.com/authors/morgan-housel.jpg",
    genres: ["Finance", "Psychology"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Robert Kiyosaki",
    slug: "robert-kiyosaki",
    bio: "Businessman and author of Rich Dad Poor Dad.",
    image: "https://example.com/authors/robert-kiyosaki.jpg",
    genres: ["Finance", "Business"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Napoleon Hill",
    slug: "napoleon-hill",
    bio: "Known for Think and Grow Rich and personal success philosophy.",
    image: "https://example.com/authors/napoleon-hill.jpg",
    genres: ["Self Help", "Success"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: false,
    isActive: true,
  },

  {
    name: "Paulo Coelho",
    slug: "paulo-coelho",
    bio: "Brazilian novelist and author of The Alchemist.",
    image: "https://example.com/authors/paulo-coelho.jpg",
    genres: ["Fiction", "Philosophy"],
    nationality: "Brazilian",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Robin Sharma",
    slug: "robin-sharma",
    bio: "Leadership expert and author of The Monk Who Sold His Ferrari.",
    image: "https://example.com/authors/robin-sharma.jpg",
    genres: ["Leadership", "Self Help"],
    nationality: "Canadian",
    followers: [],
    followersCount: 0,
    isFeatured: false,
    isActive: true,
  },

  {
    name: "Stephen Covey",
    slug: "stephen-covey",
    bio: "Author of The 7 Habits of Highly Effective People.",
    image: "https://example.com/authors/stephen-covey.jpg",
    genres: ["Leadership", "Productivity"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Mark Manson",
    slug: "mark-manson",
    bio: "Author of The Subtle Art of Not Giving a F*ck.",
    image: "https://example.com/authors/mark-manson.jpg",
    genres: ["Self Help", "Psychology"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },

  {
    name: "Cal Newport",
    slug: "cal-newport",
    bio: "Computer science professor and author of Deep Work.",
    image: "https://example.com/authors/cal-newport.jpg",
    genres: ["Productivity", "Technology"],
    nationality: "American",
    followers: [],
    followersCount: 0,
    isFeatured: false,
    isActive: true,
  },

  {
    name: "Simon Sinek",
    slug: "simon-sinek",
    bio: "Motivational speaker and author of Start With Why.",
    image: "https://example.com/authors/simon-sinek.jpg",
    genres: ["Leadership", "Business"],
    nationality: "British-American",
    followers: [],
    followersCount: 0,
    isFeatured: true,
    isActive: true,
  },
];

const seedAuthors = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ MongoDB Connected");

    // optional delete old authors
    await Author.deleteMany();

    console.log("🧹 Old authors removed");

    await Author.insertMany(authors);

    console.log("🎉 Authors Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedAuthors();