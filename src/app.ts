import { Devvit } from '@devvit/framework';
import { config } from './config';
import { getUserPostCountToday, removePost, notifyUser } from './utils';

const bot = new Devvit();

bot.on('post:submit', async (post) => {
  const today = new Date().getUTCDay();

  // Only process posts with the configured promo flair
  if (post.flair !== config.promoFlair) {
    return;
  }

  // Check day (promo posts only allowed on configured day)
  if (today !== config.promoDay) {
    await removePost(post.id);
    await notifyUser(post.author, `Posts with the "${config.promoFlair}" flair are only allowed on Saturdays.`);
    return;
  }

  // Check max posts for today (only one promo post per Saturday)
  const count = await getUserPostCountToday(post.author, config.promoFlair);
  if (count >= config.maxPostsPerUser) {
    await removePost(post.id);
    await notifyUser(post.author, `You already posted with the "${config.promoFlair}" flair today. Only one is allowed each Saturday.`);
    return;
  }
});

bot.start();