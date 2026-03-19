import { KVStore } from '@devvit/public-api';

export async function getUserPostCountToday(
  kvStore: KVStore,
  username: string,
  flairs: string[] // Changed from string to string[]
): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  
  // Create a unique key for this user on this specific day
  // Uses a generic 'promo' identifier so it counts across ALL allowed flairs
  const key = `count:${username}:${today}`;
  
  // Get current count, defaulting to 0 if null
  const currentCount = (await kvStore.get<number>(key)) ?? 0;
  
  // Increment the count in the database
  await kvStore.put(key, currentCount + 1);
  
  return currentCount; 
}