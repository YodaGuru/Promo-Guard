const promoTracker = new Map<string, string>();

export async function getUserPostCountToday(username: string, flair: string) {
  const today = new Date().toISOString().split('T')[0];
  const key = `${username}:${flair}`;

  const lastDate = promoTracker.get(key);

  if (lastDate === today) {
    return 1;
  }

  // record today's post
  promoTracker.set(key, today);
  return 0;
}

export async function removePost(postId: string) {
  // Placeholder for Devvit API call
  console.log(`Removing post ${postId}`);
}

export async function notifyUser(username: string, message: string) {
  // Placeholder for notifying the user
  console.log(`Notify ${username}: ${message}`);
}

function dayName(dayNumber: number) {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dayNumber];
}