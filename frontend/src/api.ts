import { ItemFormData, Match, UserActivity } from './types';
import { mockFoundItems, mockLostItems, mockUserActivity } from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Submit a lost item report and get potential matches from found items
 * TODO: Replace with real API call to POST /api/lost
 */
export async function submitLostItem(formData: ItemFormData): Promise<Match[]> {
  await delay(1500); // Simulate API call
  
  console.log('Submitting lost item:', formData);
  
  // Mock: Return 2-3 random matches from found items
  const matches: Match[] = mockFoundItems.slice(0, 2).map((item, index) => ({
    id: `match-${Date.now()}-${index}`,
    item,
    similarity: Math.floor(Math.random() * 30) + 65, // 65-95%
    status: index === 0 ? 'high' : 'possible',
  }));
  
  return matches;
}

/**
 * Submit a found item report and get potential matches from lost items
 * TODO: Replace with real API call to POST /api/found
 */
export async function submitFoundItem(formData: ItemFormData): Promise<Match[]> {
  await delay(1500); // Simulate API call
  
  console.log('Submitting found item:', formData);
  
  // Mock: Return 1-2 random matches from lost items
  const matches: Match[] = mockLostItems.slice(0, 2).map((item, index) => ({
    id: `match-${Date.now()}-${index}`,
    item,
    similarity: Math.floor(Math.random() * 25) + 70, // 70-95%
    status: index === 0 ? 'high' : 'possible',
  }));
  
  return matches;
}

/**
 * Fetch user's activity (lost/found items and matches)
 * TODO: Replace with real API call to GET /api/user/activity
 */
export async function fetchUserActivity(): Promise<UserActivity> {
  await delay(800); // Simulate API call
  
  console.log('Fetching user activity');
  
  return mockUserActivity;
}
