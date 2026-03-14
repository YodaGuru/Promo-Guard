import { KVStore } from '@devvit/public-api';

export async function getUserPostCountToday(
  kvStore: KVStore,
  username: string,
  flair: string
): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const key = `${username}:${flair}`;
  const lastDate = await kvStore.get<string>(key);
  if (lastDate === today) {
    return 1;
  }
  await kvStore.put(key, today);
  return 0;
}