'use client';

import React, { Suspense, useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  description: string;
  year: string;
  medium: string;
  dimensions: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  sizes: { name: string; price: string; dimensions: string }[];
  frames: { name: string; price: string; image: string }[];
}

const mockProducts: Record<number, Product> = {
  1: {
    id: 1,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    price: "From $24.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    description: "The Starry Night is an oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village.",
    year: "1889",
    medium: "Oil on Canvas",
    dimensions: "73.7 cm × 92.1 cm",
    category: "Post-Impressionism",
    tags: ["Night", "Stars", "Village", "Swirls", "Blue", "Yellow"],
    rating: 4.9,
    reviews: 1247,
    inStock: true,
    sizes: [
      { name: "Small", price: "$24.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$39.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$59.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$89.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  2: {
    id: 2,
    title: "Sunflowers",
    artist: "Vincent van Gogh",
    price: "From $19.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/800px-Vincent_Willem_van_Gogh_127.jpg",
    description: "Sunflowers is the title of two series of still life paintings by Dutch painter Vincent van Gogh. The first series, executed in Paris in 1887, depicts the flowers lying on the ground, while the second set, made a year later in Arles, shows a bouquet of sunflowers in a vase.",
    year: "1888",
    medium: "Oil on Canvas",
    dimensions: "92.1 cm × 73 cm",
    category: "Post-Impressionism",
    tags: ["Flowers", "Yellow", "Still Life", "Vase", "Bright"],
    rating: 4.8,
    reviews: 892,
    inStock: true,
    sizes: [
      { name: "Small", price: "$19.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$34.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$54.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$79.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  3: {
    id: 3,
    title: "The Bedroom",
    artist: "Vincent van Gogh",
    price: "From $22.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/330px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
    description: "The Bedroom depicts van Gogh's bedroom at Arles with bold colors and striking perspective. It represents rest and simplicity, featuring his bed, chairs, and personal items.",
    year: "1888",
    medium: "Oil on Canvas",
    dimensions: "72 cm × 90 cm",
    category: "Post-Impressionism",
    tags: ["Bedroom", "Interior", "Furniture", "Blue", "Yellow"],
    rating: 4.7,
    reviews: 678,
    inStock: true,
    sizes: [
      { name: "Small", price: "$22.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$37.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$57.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$84.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  4: {
    id: 4,
    title: "Irises",
    artist: "Vincent van Gogh",
    price: "From $26.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/1280px-Irises-Vincent_van_Gogh.jpg",
    description: "Irises was painted during Van Gogh's stay at the Saint-Rémy asylum. The painting features vivid irises set against contrasting backgrounds, demonstrating Japanese woodblock influences.",
    year: "1889",
    medium: "Oil on Canvas",
    dimensions: "71 cm × 93 cm",
    category: "Post-Impressionism",
    tags: ["Flowers", "Irises", "Blue", "Green", "Nature"],
    rating: 4.8,
    reviews: 721,
    inStock: true,
    sizes: [
      { name: "Small", price: "$26.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$41.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$61.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$89.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  5: {
    id: 5,
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    price: "From $23.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Vincent_van_Gogh_%281853-1890%29_Caf%C3%A9terras_bij_nacht_%28place_du_Forum%29_Kr%C3%B6ller-M%C3%BCller_Museum_Otterlo_23-8-2016_13-35-40.JPG/330px-Vincent_van_Gogh_%281853-1890%29_Caf%C3%A9terras_bij_nacht_%28place_du_Forum%29_Kr%C3%B6ller-M%C3%BCller_Museum_Otterlo_23-8-2016_13-35-40.JPG",
    description: "Café Terrace at Night depicts a café in Arles under a starry sky. It was painted on location and shows Van Gogh's fascination with night scenes and bright contrasting colors.",
    year: "1888",
    medium: "Oil on Canvas",
    dimensions: "80.7 cm × 65.3 cm",
    category: "Post-Impressionism",
    tags: ["Night", "Café", "Stars", "Yellow", "Blue"],
    rating: 4.9,
    reviews: 812,
    inStock: true,
    sizes: [
      { name: "Small", price: "$23.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$38.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$58.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$86.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  6: {
    id: 6,
    title: "Almond Blossoms",
    artist: "Vincent van Gogh",
    price: "From $21.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/1280px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
    description: "Almond Blossoms was painted to celebrate the birth of Van Gogh’s nephew. The branches set against a blue sky convey hope and new life, inspired by Japanese prints.",
    year: "1890",
    medium: "Oil on Canvas",
    dimensions: "73.5 cm × 92 cm",
    category: "Post-Impressionism",
    tags: ["Flowers", "Blossoms", "Branches", "Blue", "White"],
    rating: 4.8,
    reviews: 645,
    inStock: true,
    sizes: [
      { name: "Small", price: "$21.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$36.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$56.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$84.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  7: {
    id: 7,
    title: "Water Lilies",
    artist: "Claude Monet",
    price: "From $25.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg/500px-Claude_Monet_-_The_Water_Lilies_-_Setting_Sun_-_Google_Art_Project.jpg",
    description: "Water Lilies is part of Monet’s famous series depicting his flower garden at Giverny. The paintings emphasize reflections and color over detail, pioneering Impressionism’s focus on perception.",
    year: "1919",
    medium: "Oil on Canvas",
    dimensions: "200 cm × 180 cm",
    category: "Impressionism",
    tags: ["Flowers", "Pond", "Reflection", "Nature", "Pink", "Green"],
    rating: 4.9,
    reviews: 1021,
    inStock: true,
    sizes: [
      { name: "Small", price: "$25.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$40.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$60.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$89.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  8: {
    id: 8,
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    price: "From $28.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg",
    description: "Impression, Sunrise depicts the port of Le Havre at sunrise. Its name gave the Impressionist movement its title, showcasing Monet’s focus on light and atmosphere over detail.",
    year: "1872",
    medium: "Oil on Canvas",
    dimensions: "48 cm × 63 cm",
    category: "Impressionism",
    tags: ["Sunrise", "Harbor", "Ships", "Orange", "Blue"],
    rating: 4.8,
    reviews: 899,
    inStock: true,
    sizes: [
      { name: "Small", price: "$28.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$43.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$63.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$91.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  9: {
    id: 9,
    title: "Rouen Cathedral",
    artist: "Claude Monet",
    price: "From $24.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/RouenCathedral_Monet_1894.jpg/250px-RouenCathedral_Monet_1894.jpg",
    description: "Rouen Cathedral is part of Monet’s series capturing the cathedral at different times of day and weather conditions, emphasizing light and color over architectural detail.",
    year: "1894",
    medium: "Oil on Canvas",
    dimensions: "100 cm × 65 cm",
    category: "Impressionism",
    tags: ["Cathedral", "Architecture", "Facade", "Light", "Color"],
    rating: 4.7,
    reviews: 654,
    inStock: true,
    sizes: [
      { name: "Small", price: "$24.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$39.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$59.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$87.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  10: {
    id: 10,
    title: "Poplar Trees",
    artist: "Claude Monet",
    price: "From $22.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/1891_Monet_The_four_trees_anagoria.JPG/250px-1891_Monet_The_four_trees_anagoria.JPG",
    description: "Poplar Trees is one of Monet’s series capturing poplars along the Epte River, painted at different seasons and times to study light and reflection.",
    year: "1888",
    medium: "Oil on Canvas",
    dimensions: "81 cm × 65 cm",
    category: "Impressionism",
    tags: ["Trees", "Landscape", "River", "Reflection", "Green"],
    rating: 4.6,
    reviews: 531,
    inStock: true,
    sizes: [
      { name: "Small", price: "$22.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$37.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$57.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$85.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  11: {
    id: 11,
    title: "Guernica",
    artist: "Pablo Picasso",
    price: "From $29.99",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/PicassoGuernica.jpg/1280px-PicassoGuernica.jpg",
    description: "Guernica is Picasso’s powerful anti-war mural depicting the bombing of Guernica during the Spanish Civil War. It uses monochromatic tones and distorted figures to convey suffering and chaos.",
    year: "1937",
    medium: "Oil on Canvas",
    dimensions: "349 cm × 776 cm",
    category: "Cubism",
    tags: ["War", "Monochrome", "Horses", "Bull", "Figures"],
    rating: 4.9,
    reviews: 1342,
    inStock: true,
    sizes: [
      { name: "Small", price: "$29.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$44.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$64.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$94.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  12: {
    id: 12,
    title: "The Old Guitarist",
    artist: "Pablo Picasso",
    price: "From $24.99",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Old_guitarist_chicago.jpg/330px-Old_guitarist_chicago.jpg",
    description: "The Old Guitarist was painted during Picasso’s Blue Period. It depicts an old blind musician with an elongated body and somber tones, reflecting themes of poverty and isolation.",
    year: "1903",
    medium: "Oil on Panel",
    dimensions: "122.9 cm × 82.6 cm",
    category: "Expressionism",
    tags: ["Blue Period", "Guitar", "Old Man", "Melancholy"],
    rating: 4.8,
    reviews: 987,
    inStock: true,
    sizes: [
      { name: "Small", price: "$24.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$39.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$59.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$87.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  13: {
    id: 13,
    title: "Les Demoiselles d'Avignon",
    artist: "Pablo Picasso",
    price: "From $27.99",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/800px-Les_Demoiselles_d%27Avignon.jpg",
    description: "Les Demoiselles d'Avignon is a revolutionary work marking the birth of Cubism. It portrays five nude female figures with fragmented and angular forms inspired by African masks.",
    year: "1907",
    medium: "Oil on Canvas",
    dimensions: "243.9 cm × 233.7 cm",
    category: "Cubism",
    tags: ["Nudes", "Cubism", "Angular", "Masks", "Figures"],
    rating: 4.7,
    reviews: 801,
    inStock: true,
    sizes: [
      { name: "Small", price: "$27.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$42.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$62.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$91.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  14: {
    id: 14,
    title: "Girl with a Mandolin",
    artist: "Pablo Picasso",
    price: "From $23.99",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/250px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg",
    description: "Girl with a Mandolin is an example of Picasso’s Analytical Cubism, showing a young woman playing the mandolin with fragmented planes and subtle color blending.",
    year: "1910",
    medium: "Oil on Canvas",
    dimensions: "100.3 cm × 73.6 cm",
    category: "Cubism",
    tags: ["Mandolin", "Girl", "Cubism", "Fragmentation"],
    rating: 4.6,
    reviews: 589,
    inStock: true,
    sizes: [
      { name: "Small", price: "$23.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$38.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$58.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$86.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  15: {
    id: 15,
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    price: "From $32.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg/1280px-Leonardo_da_Vinci_%281452-1519%29_-_The_Last_Supper_%281495-1498%29.jpg",
    description: "The Last Supper depicts Jesus’ final meal with his disciples, capturing their emotional reactions to his revelation of betrayal. It is renowned for its perspective and composition.",
    year: "1498",
    medium: "Tempera on Gesso",
    dimensions: "460 cm × 880 cm",
    category: "High Renaissance",
    tags: ["Jesus", "Disciples", "Religious", "Table", "Perspective"],
    rating: 5.0,
    reviews: 1712,
    inStock: true,
    sizes: [
      { name: "Small", price: "$32.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$47.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$67.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$99.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  16: {
    id: 16,
    title: "Vitruvian Man",
    artist: "Leonardo da Vinci",
    price: "From $26.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/800px-Da_Vinci_Vitruve_Luc_Viatour.jpg",
    description: "Vitruvian Man is a famous drawing that explores human body proportions, combining art and science to represent ideal human symmetry based on the works of Vitruvius.",
    year: "1490",
    medium: "Ink on Paper",
    dimensions: "34.4 cm × 25.5 cm",
    category: "High Renaissance",
    tags: ["Anatomy", "Proportions", "Drawing", "Symmetry"],
    rating: 4.9,
    reviews: 1183,
    inStock: true,
    sizes: [
      { name: "Small", price: "$26.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$41.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$61.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$89.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  17: {
    id: 17,
    title: "Lady with an Ermine",
    artist: "Leonardo da Vinci",
    price: "From $28.99",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/800px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
    description: "Lady with an Ermine portrays Cecilia Gallerani holding a white ermine. It demonstrates Da Vinci’s mastery in depicting textures, anatomy, and psychological depth.",
    year: "1489",
    medium: "Oil on Wood Panel",
    dimensions: "54 cm × 39 cm",
    category: "High Renaissance",
    tags: ["Portrait", "Woman", "Ermine", "Animals"],
    rating: 4.8,
    reviews: 943,
    inStock: true,
    sizes: [
      { name: "Small", price: "$28.99", dimensions: "12\" × 16\"" },
      { name: "Medium", price: "$43.99", dimensions: "18\" × 24\"" },
      { name: "Large", price: "$63.99", dimensions: "24\" × 36\"" },
      { name: "Extra Large", price: "$91.99", dimensions: "36\" × 48\"" }
    ],
    frames: [
      { name: "No Frame", price: "+$0", image: "" },
      { name: "Black Wood", price: "+$29.99", image: "" },
      { name: "White Wood", price: "+$29.99", image: "" },
      { name: "Gold Ornate", price: "+$49.99", image: "" }
    ]
  },
  
};
function ProductPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = parseInt(searchParams.get('id') || '1');

  const product = mockProducts[productId];

  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <button
            onClick={() => router.back()}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const calculateTotalPrice = () => {
    const sizePrice = parseFloat(product.sizes[selectedSize].price.replace('$', ''));
    const framePrice = parseFloat(product.frames[selectedFrame].price.replace('+$', ''));
    return ((sizePrice + framePrice) * quantity).toFixed(2);
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const sizePrice = parseFloat(product.sizes[selectedSize].price.replace('$', ''));
    const framePrice = parseFloat(product.frames[selectedFrame].price.replace('+$', ''));

    const newItem = {
      product,
      selectedSize,
      selectedFrame,
      quantity,
      totalPrice: (sizePrice + framePrice) * quantity,
    };

    const updatedCart = [...existingCart, newItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    router.push('/eCommerce/checkoutPage');
  };

  return (
    <div className="min-h-screen">
      <header className=" backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Gallery
          </button>
          <h1 className="text-2xl font-bold">Art Depot</h1>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-900 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-gray-400 mb-4">by {product.artist}</p>

            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedSize === index
                        ? 'border-white border-4'
                        : 'border-gray-600 border-2 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium">{size.name}</div>
                    <div className="text-xs text-gray-400">{size.dimensions}</div>
                    <div className="text-sm font-bold">{size.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Frame</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.frames.map((frame, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFrame(index)}
                    className={`p-3 rounded-lg transition-colors ${
                      selectedFrame === index
                        ? 'border-white border-4'
                        : 'border-gray-600 border-2 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-sm font-medium">{frame.name}</div>
                    <div className="text-sm text-gray-400">{frame.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold">
                ${calculateTotalPrice()}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-white text-black py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Truck size={16} />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={16} />
                <span>Premium quality guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={16} />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl mb-4">Loading...</h2>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductPageContent />
    </Suspense>
  );
}