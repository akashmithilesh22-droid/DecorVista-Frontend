import {
  FurnitureItem,
  ComplementaryItem,
  RoomOption,
  ClimateOption,
} from '../types';

/* ---------------- ROOM OPTIONS ---------------- */

export const roomOptions: RoomOption[] = [
  {
    value: 'kitchen',
    label: 'Kitchen',
    image:
      'https://images.unsplash.com/photo-1610177534644-34d881503b83?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'living',
    label: 'Living Room',
    image:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'bedroom',
    label: 'Bedroom',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'bathroom',
    label: 'Bathroom',
    image:
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'dining',
    label: 'Dining Room',
    image:
      'https://images.unsplash.com/photo-1616486886892-ff366aa67ba4?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'office',
    label: 'Home Office',
    image:
      'https://images.unsplash.com/photo-1614598389565-8d56eddd2f48?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'kids',
    label: 'Kids Room',
    image:
      'https://images.unsplash.com/photo-1600493505500-afac3fc363e6?auto=format&fit=crop&w=1080&q=80',
  },
  {
    value: 'balcony',
    label: 'Balcony/Patio',
    image:
      'https://images.unsplash.com/photo-1661024768242-5fd7c8f1e3c5?auto=format&fit=crop&w=1080&q=80',
  },
];

/* ---------------- CLIMATE OPTIONS ---------------- */

export const climateOptions: ClimateOption[] = [
  {
    value: 'tropical',
    label: 'Tropical/Humid',
    description: 'High humidity, moisture-resistant materials needed',
  },
  {
    value: 'dry',
    label: 'Dry/Arid',
    description: 'Low humidity, dust-resistant materials recommended',
  },
  {
    value: 'temperate',
    label: 'Temperate',
    description: 'Moderate climate, versatile materials work well',
  },
  {
    value: 'cold',
    label: 'Cold',
    description: 'Low temperatures, insulated and warm materials preferred',
  },
];

/* ---------------- FURNITURE DATABASE ---------------- */

export const furnitureDatabase: FurnitureItem[] = [
  // Living Room
  {
    id: 'liv-1',
    name: 'Modern L-Shaped Sofa',
    description: 'Comfortable 6-seater sofa with premium fabric upholstery',
    price: 45000,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['living'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 15,
    category: 'seating',
    whyThis:
      'Spacious seating ideal for families with durable fabric upholstery',
  },
  {
    id: 'liv-2',
    name: 'Compact 3-Seater Sofa',
    description: 'Space-saving sofa ideal for smaller living rooms',
    price: 28000,
    image:
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['living'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 8,
    maxArea: 15,
    category: 'seating',
    whyThis: 'Compact footprint without sacrificing comfort',
  },
  {
    id: 'liv-3',
    name: 'Glass Coffee Table',
    description: 'Contemporary tempered glass table with wooden legs',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['living'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 8,
    category: 'table',
    whyThis: 'Easy maintenance and visually light design',
  },
  {
    id: 'liv-4',
    name: 'TV Unit with Storage',
    description: 'Modern entertainment unit with ample storage space',
    price: 22000,
    image:
      'https://images.unsplash.com/photo-1593430980369-68efc5a5eb34?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['living'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 10,
    category: 'storage',
    whyThis: 'Keeps living rooms organized and clutter-free',
  },

  // Kitchen
  {
    id: 'kit-1',
    name: 'Modular Kitchen Cabinets',
    description: 'Complete set of upper and lower cabinets with drawers',
    price: 85000,
    image:
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['kitchen'],
    climateCompatible: ['tropical', 'temperate'],
    minArea: 6,
    category: 'storage',
    whyThis: 'Water-resistant cabinets ideal for humid kitchens',
  },
  {
    id: 'kit-2',
    name: 'Kitchen Island with Seating',
    description: 'Multi-functional island with breakfast bar',
    price: 55000,
    image:
      'https://images.unsplash.com/photo-1556912167-f556f1f39df1?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['kitchen'],
    climateCompatible: ['tropical', 'dry', 'temperate'],
    minArea: 12,
    category: 'storage',
    whyThis: 'Adds prep space and casual dining',
  },
  {
    id: 'kit-3',
    name: 'Compact Dining Set',
    description: '4-seater dining table with chairs',
    price: 24000,
    image:
      'https://images.unsplash.com/photo-1611633332753-d1e2f695aa3c?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['kitchen', 'dining'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 8,
    maxArea: 15,
    category: 'dining',
    whyThis: 'Perfect for smaller dining spaces',
  },

  // Bedroom
  {
    id: 'bed-1',
    name: 'Queen Size Bed with Storage',
    description: 'Elegant bed frame with hydraulic storage',
    price: 42000,
    image:
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['bedroom'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 12,
    category: 'bed',
    whyThis: 'Combines comfort with hidden storage',
  },
  {
    id: 'bed-2',
    name: 'King Size Bed',
    description: 'Luxurious king-size bed with upholstered headboard',
    price: 58000,
    image:
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['bedroom'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 15,
    category: 'bed',
    whyThis: 'Ideal for spacious master bedrooms',
  },
  {
    id: 'bed-3',
    name: 'Sliding Door Wardrobe',
    description: '6-door wardrobe with mirror and organizers',
    price: 48000,
    image:
      'https://images.unsplash.com/photo-1630699144552-b2b60b277b75?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['bedroom'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 10,
    category: 'storage',
    whyThis: 'Space-efficient wardrobe with large capacity',
  },
  {
    id: 'bed-4',
    name: 'Bedside Tables (Pair)',
    description: 'Matching nightstands with drawers',
    price: 15000,
    image:
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1080&q=80',
    roomTypes: ['bedroom'],
    climateCompatible: ['tropical', 'dry', 'temperate', 'cold'],
    minArea: 8,
    category: 'storage',
    whyThis: 'Adds symmetry and convenience',
  },
];

/* ---------------- COMPLEMENTARY ITEMS ---------------- */

export const complementaryItems: ComplementaryItem[] = [
  {
    id: 'acc-1',
    name: 'Wool Area Rug (6x9 ft)',
    description: 'Handwoven contemporary design rug',
    price: 12000,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1080&q=80',
    category: 'accessory',
  },
  {
    id: 'acc-2',
    name: 'Modern Table Lamp',
    description: 'Adjustable LED table lamp',
    price: 3500,
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1080&q=80',
    category: 'accessory',
  },
  {
    id: 'acc-3',
    name: 'Wall Art Set (3 pieces)',
    description: 'Abstract canvas prints with frames',
    price: 8500,
    image:
      'https://images.unsplash.com/photo-1624611943960-12d51727906f?auto=format&fit=crop&w=1080&q=80',
    category: 'accessory',
  },
  {
    id: 'acc-4',
    name: 'Indoor Plant Collection',
    description: 'Set of 3 air-purifying plants with pots',
    price: 4500,
    image:
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1080&q=80',
    category: 'accessory',
  },
  {
    id: 'acc-5',
    name: 'Decorative Mirror',
    description: 'Large wall mirror with ornate frame',
    price: 9500,
    image:
      'https://images.unsplash.com/photo-1616627989394-6f4a3fa6c3b7?auto=format&fit=crop&w=1080&q=80',
    category: 'accessory',
  },
];
