import a1 from "./a1.png";
import a2 from "./a2.png";
import a3 from "./a3.png";
import b1 from "./b1.png";
import b2 from "./b2.png";
import b3 from "./b3.png";
import c1 from "./c1.jpg";
import c2 from "./c2.jpg";
import c3 from "./c3.jpg";
import c4 from "./c4.jpg";
import c5 from "./c5.jpg";
import c6 from "./c6.jpg";
import c7 from "./c7.jpg";
import c8 from "./c8.jpg";
import c9 from "./c9.jpg";
import c10 from "./c10.webp";
import c11 from "./c11.webp";
import c12 from "./c12.webp";
import c13 from "./c13.jpg";
import c14 from "./c14.jpg";
import c15 from "./c15.jpg";
import c16 from "./c16.jpg";
import c17 from "./c17.jpg";
import c18 from "./c18.jpg";
import blog1 from "./blog1.png";
import blog2 from "./blog2.png";
import blog3 from "./blog3.png";
import blog4 from "./blog4.png";
import blog5 from "./blog5.png";
import blog6 from "./blog6.png";
import blog7 from "./blog7.png";
import blog8 from "./blog8.png";
import blog9 from "./blog9.png";
import blog10 from "./blog10.png";
import d1 from "./d1.png";
import d2 from "./d2.png";
import d3 from "./d3.png";
import d4 from "./d4.jpg";
import d5 from "./d5.png";
import d6 from "./d6.png";
import d7 from "./d7.webp";
import d8 from "./d8.jpg";
import d9 from "./d9.jpg";
import d10 from "./d10.jpg";
import d11 from "./d11.jpg";
import d12 from "./d12.jpg";
import d13 from "./d13.jpg";
import d14 from "./d14.jpg";
import d15 from "./d15.jpg";
import d16 from "./d16.jpg";
import d17 from "./d17.jpg";
import d18 from "./d18.jpg";
import d19 from "./d19.jpg";
import d20 from "./d20.jpg";
import f1 from "./f1.png";
import ringtone from "./alert-33762.mp3";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcDinersClub } from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm, SiAmazonpay,SiRazorpay } from "react-icons/si";
export const homeImages = [a1, a2, a3];
export const shopImages = [
    {
        title: "Living Room",
        image1: b1,
        content1: "Discover cozy and stylish living room furniture that makes your space inviting and comfortable.",

    },
    {
        title: "Bedroom",
        image1: b2,
        content1: "Find the perfect bedroom sets and accessories to create a relaxing and elegant retreat.",
    },
    {
        title: "Kitchen",
        image1: b3,
        content1: "Upgrade your kitchen with modern furniture and functional decor to make cooking and dining a delight.",
    }

];
export const categoriesData = [
  {
    name: "By Room",
    subcategories: [
      {
        name: "Living Room",
        subcategories: [
          "Sofas & Sectionals",
          "Coffee Tables",
          "TV Units / Media Consoles",
          "Recliners & Lounge Chairs",
          "Side Tables",
          "Shelving & Storage",
        ],
      },
      {
        name: "Bedroom",
        subcategories: [
          "Beds",
          "Mattresses",
          "Nightstands",
          "Dressers & Wardrobes",
          "Vanity Tables",
        ],
      },
      {
        name: "Dining Room",
        subcategories: [
          "Dining Tables",
          "Dining Chairs",
          "Bar Stools",
          "Sideboards & Buffets",
          "Dining Sets",
        ],
      },
      {
        name: "Home Office",
        subcategories: [
          "Desks",
          "Office Chairs",
          "Bookcases",
          "Filing Cabinets",
        ],
      },
      {
        name: "Outdoor",
        subcategories: [
          "Patio Furniture",
          "Outdoor Dining Sets",
          "Lounge Chairs",
          "Garden Storage",
          "Umbrellas & Shades",
        ],
      },
    ],
  },
  {
    name: "By Furniture Type",
    subcategories: [
      "Seating",
      "Tables",
      "Storage",
      "Beds & Bedroom Furniture",
      "Office Furniture",
      "Outdoor Furniture",
    ],
  },
{
    name: "By Material/Style",
    subcategories: [
      "Wood",
      "Metal",
      "Plastic",
      "Glass",
      "Fabric",
      "Leather",
      "Modern",
      "Contemporary",
      "Traditional",
      "Vintage",
      "Industrial",
      "Minimalist",
    ],  
},
  {
    name: "By Price / Promotion",
    subcategories: [
      "Under $100",
      "Mid-Range",
      "Luxury",
      "Sale / Clearance",
      "New Arrivals",
      "Best Sellers",
    ],
  },
  {
    name: "Accessories & Décor",
    subcategories: [
      "Lighting",
      "Rugs & Carpets",
      "Mirrors",
      "Cushions & Throws",
      "Wall Art",
      "Storage Baskets & Organizers",
    ],
  },
];
export const categories = [
  {
    names: 'Leather Sofas',
    image: c1,
    description: 'Premium leather sofas that combine comfort and style for your living room.',
    price: 1200,
    rating: 4.5,
  },
  {
    names: 'Leatherette Sofas',
    image: c2,
    description: 'Affordable leatherette sofas with modern designs and easy maintenance.',
    price: 900,
    rating: 4.2,
  },
  {
    names: 'Fabric Sofas',
    image: c3,
    description: 'Soft and durable fabric sofas that suit any living room decor.',
    price: 800,
    rating: 4.3,
  },
  {
    names: 'Reclining Sofas',
    image: c4,
    description: 'Comfortable reclining sofas perfect for relaxation and entertainment.',
    price: 1500,
    rating: 4.6,
  },
  {
    names: 'Dining Sets',
    image: c5,
    description: 'Elegant dining sets to enhance your dining space and family meals.',
    price: 700,
    rating: 4.4,
  },
  {
    names: 'Beds',
    image: c6,
    description: 'Sturdy and comfortable beds for a restful night’s sleep.',
    price: 1100,
    rating: 4.5,
  },
  {
    names: 'Office Chair',
    image: c7,
    description: 'Ergonomic office chairs designed for long hours of work.',
    price: 250,
    rating: 4.3,
  },
  {
    names: 'Coffee & Center Tables',
    image: c8,
    description: 'Stylish coffee and center tables for a modern living room look.',
    price: 300,
    rating: 4.2,
  },
  {
    names: 'Living Chairs',
    image: c9,
    description: 'Comfortable living chairs in a variety of designs and colors.',
    price: 200,
    rating: 4.1,
  },
  {
    names: 'Dining Chairs',
    image: c10,
    description: 'Durable dining chairs that complement any dining table.',
    price: 150,
    rating: 4.0,
  },
  {
    names: 'Sofa Cum Beds',
    image: c11,
    description: 'Multi-functional sofa cum beds perfect for small spaces.',
    price: 950,
    rating: 4.4,
  },
  {
    names: 'Bed Side Tables',
    image: c12,
    description: 'Compact bedside tables with storage for convenience and style.',
    price: 120,
    rating: 4.2,
  },
  {
    names: 'Desks',
    image: c13,
    description: 'Modern desks suitable for home offices and study rooms.',
    price: 350,
    rating: 4.3,
  },
  {
    names: 'Side & End Tables',
    image: c14,
    description: 'Elegant side and end tables to complement sofas and beds.',
    price: 180,
    rating: 4.1,
  },
  {
    names: 'TV Units & Media Units',
    image: c15,
    description: 'Functional TV and media units to organize your entertainment space.',
    price: 450,
    rating: 4.4,
  },
  {
    names: 'Shoe Racks',
    image: c16,
    description: 'Practical and stylish shoe racks to keep your entryway organized.',
    price: 100,
    rating: 4.0,
  },
  {
    names: 'Study Tables',
    image: c17,
    description: 'Durable and ergonomic study tables for students and professionals.',
    price: 250,
    rating: 4.3,
  },
  {
    names: 'Dining Storage',
    image: c18,
    description: 'Storage units for dining essentials, combining style and functionality.',
    price: 400,
    rating: 4.2,
  },
];
export const blogsData = [
  {
    id: 1,
    category: "Furniture Tips",
    title: "How to Choose the Perfect Sofa",
    description: "Learn how to choose a sofa that fits your space, lifestyle, and comfort needs.",
    img: blog1,
    likes: "1.2K",
    comments: 18,
  },
  {
    id: 2,
    category: "Interior Design",
    title: "Modern Furniture Trends 2025",
    description: "Explore the trending furniture styles dominating 2025 interior design.",
    img: blog2,
    likes: "2.3K",
    comments: 12,
  },
  {
    id: 3,
    category: "Home Decor",
    title: "10 Ways to Style Your Living Room",
    description: "Easy and affordable ways to enhance your living room with modern decor.",
    img: blog3,
    likes: "1.4K",
    comments: 16,
  },
  {
    id: 4,
    category: "Bedroom Ideas",
    title: "Create a Cozy Bedroom With These Tips",
    description: "Transform your bedroom into a cozy retreat with smart furniture choices.",
    img: blog4,
    likes: "1.5K",
    comments: 14,
  },
  {
    id: 5,
    category: "Wood Furniture",
    title: "Why Solid Wood Furniture Lasts Longer",
    description: "Understand why solid wood remains the best choice for durability and style.",
    img: blog5,
    likes: "1.6K",
    comments: 15,
  },
  {
    id: 6,
    category: "Office Furniture",
    title: "Best Chairs for Long Working Hours",
    description: "These ergonomic chairs help reduce back pain and improve posture.",
    img: blog6,
    likes: "1.7K",
    comments: 13,
  },
  {
    id: 7,
    category: "Kitchen Ideas",
    title: "Minimalist Kitchen Furniture Guide",
    description: "Design a clean and functional kitchen using minimalist furniture.",
    img: blog7,
    likes: "1.8K",
    comments: 11,
  },
  {
    id: 8,
    category: "Kids Room",
    title: "Furniture Ideas for Kids’ Bedrooms",
    description: "Fun and safe furniture ideas your kids will love.",
    img: blog8,
    likes: "1.9K",
    comments: 10,
  },
  // {
  //   id: 9,
  //   category: "Outdoor Furniture",
  //   title: "How to Maintain Outdoor Wooden Furniture",
  //   description: "Keep your outdoor furniture in top condition year-round.",
  //   img: blog9,
  //   likes: "2.0K",
  //   comments: 9,
  // },
  // {
  //   id: 10,
  //   category: "DIY Furniture",
  //   title: "Build Your Own Coffee Table",
  //   description: "A simple step-by-step guide for DIY beginners.",
  //   img: blog10,
  //   likes: "2.1K",
  //   comments: 8,
  // },
];
export const furnitureProducts = [
  { id: 1, name: "Modern Sofa", description: "Comfortable 3-seater sofa with plush cushions", color: ["Gray"], size: "Large", price: 95000, image: d1 },
  { id: 2, name: "Wooden Chair", description: "Solid oak chair with ergonomic design", color: ['Brown'], size: "Medium", price: 45000, image: d2 },
  { id: 3, name: "Dining Table", description: "Spacious dining table for family meals", color: ["Natural"], size: "Large", price: 78000, image: d3 },
  { id: 4, name: "Office Desk", description: "Ergonomic office desk with drawers", color:["Black"], size: "Medium", price: 52000, image: d4 },
  { id: 5, name: "Bookshelf", description: "5-tier wooden bookshelf for books and decor", color: ["White"], size: "Large", price: 48000, image: d5 },
  { id: 6, name: "Recliner Chair", description: "Comfortable recliner with adjustable back", color: ["Beige"], size: "Large", price: 69000, image: d6 },
  { id: 7, name: "Coffee Table", description: "Modern coffee table with glass top", color: ["Black"], size: "Medium", price: 43000, image: d7 },
  { id: 8, name: "Wardrobe", description: "Spacious 3-door wardrobe with shelves", color: "Walnut", size: "Large", price: 88000, image: d8 },
  { id: 9, name: "Nightstand", description: "Bedside nightstand with drawer", color: "White", size: "Small", price: 40000, image: d9 },
  { id: 10, name: "TV Stand", description: "Entertainment center with storage", color: "Brown", size: "Medium", price: 52000, image: d10 },
  { id: 11, name: "Sectional Sofa", description: "L-shaped sectional sofa with soft fabric", color: "Blue", size: "Large", price: 99000, image: d11 },
  { id: 12, name: "Accent Chair", description: "Stylish accent chair for living room", color: "Green", size: "Medium", price: 47000, image: d12 },
  { id: 13, name: "Dining Chair", description: "Set of 2 dining chairs with cushioned seats", color: "Gray", size: "Small", price: 42000, image: d13 },
  { id: 14, name: "Console Table", description: "Elegant console table for hallway", color: "Black", size: "Medium", price: 46000, image: d14 },
  { id: 15, name: "Bed Frame", description: "Queen size bed frame with headboard", color: "White", size: "Large", price: 90000, image: d15 },
  { id: 16, name: "Desk Chair", description: "Comfortable swivel desk chair", color: "Black", size: "Medium", price: 45000, image: d16 },
  { id: 17, name: "Storage Bench", description: "Multipurpose storage bench for entryway", color: "Brown", size: "Medium", price: 43000, image: d17 },
  { id: 18, name: "Bar Stool", description: "Modern bar stool with footrest", color: "Gray", size: "Small", price: 40000, image: d18 },
  { id: 19, name: "Side Table", description: "Compact side table for living room", color: "Natural", size: "Small", price: 41000, image: d19 },
  { id: 20, name: "Armchair", description: "Cozy armchair with soft upholstery", color: "Beige", size: "Medium", price: 55000, image: d20 },
];
export const products = [
  {
    brand: "FURNIHOME",
    name: "Modern Wooden Chair",
    image: d2,
    price: 120,
    rating: 4,
    reviews: 12,
  },
  {
    brand: "FURNIHOME",
    name: "Luxury Sofa",
    image: f1,
    price: 45000,
    rating: 5,
    reviews: 24,
  },
  {
    brand: "FURNIHOME",
    name: "Glass Coffee Table",
    image: d7,
    price: 220,
    rating: 43000,
    reviews: 8,
  },
  {
    brand: "FURNIHOME",
    name: "Office Desk",
    image: d4,
    price: 33000,
    rating: 4,
    reviews: 15,
  },
];
export   const upiApps = [
    { name: "GPay", icon: <SiGooglepay size={30} /> },
    { name: "PhonePe", icon: <SiPhonepe size={30} /> },
    { name: "Paytm", icon: <SiPaytm size={30} /> },
    { name: "AmazonPay", icon: <SiAmazonpay size={30} /> },
    { name: "Razorpay", icon: <SiRazorpay size={30} /> }, 
];
export   const cards = [
    { name: "Visa", icon: <FaCcVisa size={40} /> },
    { name: "Mastercard", icon: <FaCcMastercard size={40} /> },
    { name: "Amex", icon: <FaCcAmex size={40} /> },
    { name: "Discover", icon: <FaCcDiscover size={40} /> },
    { name: "Diners", icon: <FaCcDinersClub size={40} /> },
  ];

export const ringtones = [ringtone];