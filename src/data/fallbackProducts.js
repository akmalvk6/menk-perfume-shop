export const fallbackProducts = [
  {
    id: "rose-oudh-attar",
    name: "Rose Oudh Attar",
    description:
      "A rich rose opening settled over warm oudh and soft amber. Designed for evening wear and gifting.",
    price: 1499,
    discountPrice: 1199,
    category: "Attar",
    imageUrl:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80",
    stock: 12,
    featured: true,
    newArrival: false,
    size: "12 ml",
    sizes: [
      { label: "3 ml", price: 499, discountPrice: 399 },
      { label: "6 ml", price: 899, discountPrice: 699 },
      { label: "12 ml", price: 1499, discountPrice: 1199 },
    ],
  },
  {
    id: "royal-oudh",
    name: "Royal Oudh",
    description:
      "Deep woody oudh with smoky spice and a long, elegant dry-down.",
    price: 2499,
    discountPrice: 0,
    category: "Oudh",
    imageUrl:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
    stock: 8,
    featured: true,
    newArrival: true,
    size: "50 ml",
    sizes: [
      { label: "12 ml", price: 999, discountPrice: 0 },
      { label: "25 ml", price: 1799, discountPrice: 0 },
      { label: "50 ml", price: 2499, discountPrice: 0 },
    ],
  },
  {
    id: "fresh-musk-perfume",
    name: "Fresh Musk Perfume",
    description:
      "Clean musk, citrus peel, and airy florals for everyday freshness.",
    price: 999,
    discountPrice: 799,
    category: "Perfume",
    imageUrl:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    stock: 20,
    featured: true,
    newArrival: true,
    size: "50 ml",
    sizes: [
      { label: "25 ml", price: 599, discountPrice: 0 },
      { label: "50 ml", price: 999, discountPrice: 799 },
      { label: "100 ml", price: 1699, discountPrice: 1399 },
    ],
  },
];

export const categories = ["All", "Attar", "Oudh", "Perfume"];
