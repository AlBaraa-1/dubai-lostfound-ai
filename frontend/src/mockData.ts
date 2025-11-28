import { Item, UserActivity } from './types';

// Mock images - using placeholder image URLs
export const mockImages = {
  wallet: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop',
  headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
  keys: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop',
  phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
  sunglasses: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
};

export const mockFoundItems: Item[] = [
  {
    id: 'f1',
    type: 'found',
    imageUrl: mockImages.wallet,
    where: 'Mall',
    specificPlace: 'Dubai Mall, Level 2',
    when: 'Today',
    description: 'Black leather wallet with silver keychain',
    timestamp: new Date(),
  },
  {
    id: 'f2',
    type: 'found',
    imageUrl: mockImages.headphones,
    where: 'Metro',
    specificPlace: 'Red Line, Business Bay Station',
    when: 'Yesterday',
    description: 'White wireless headphones',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 'f3',
    type: 'found',
    imageUrl: mockImages.backpack,
    where: 'Airport',
    specificPlace: 'Terminal 3, Gate A12',
    when: 'Last 3 days',
    description: 'Blue backpack with laptop inside',
    timestamp: new Date(Date.now() - 172800000),
  },
];

export const mockLostItems: Item[] = [
  {
    id: 'l1',
    type: 'lost',
    imageUrl: mockImages.keys,
    where: 'Taxi',
    when: 'Today',
    description: 'Car keys with red keychain',
    timestamp: new Date(),
  },
  {
    id: 'l2',
    type: 'lost',
    imageUrl: mockImages.phone,
    where: 'Mall',
    specificPlace: 'Mall of the Emirates',
    when: 'Yesterday',
    description: 'iPhone 14 Pro with blue case',
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: 'l3',
    type: 'lost',
    imageUrl: mockImages.sunglasses,
    where: 'Event / Venue',
    specificPlace: 'Dubai Opera',
    when: 'Last week',
    description: 'Ray-Ban sunglasses, black frame',
    timestamp: new Date(Date.now() - 518400000),
  },
];

export const mockUserActivity: UserActivity = {
  lostItems: [mockLostItems[0], mockLostItems[1]],
  foundItems: [mockFoundItems[0]],
  matches: {
    'l1': [
      {
        id: 'm1',
        item: mockFoundItems[0],
        similarity: 82,
        status: 'high',
      },
    ],
    'l2': [
      {
        id: 'm2',
        item: mockFoundItems[1],
        similarity: 65,
        status: 'possible',
      },
    ],
  },
};
