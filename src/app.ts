import { Devvit } from '@devvit/public-api';
import { config } from './config';
import { getUserPostCountToday } from './utils';

Devvit.configure({
  redditAPI: true,
  kvStore: true,
});

Devvit.addTrigger({
  event: 'PostSubmit',
  async onEvent(event, context) {
    const { reddit, kvStore } = context;
    const post = event.post;
    const author = event.author;

    if (!post || !author) return;

    const allowedFlairs = Array.isArray(config.promoFlair)
      ? config.promoFlair
      : [config.promoFlair];

    if (!allowedFlairs.includes(post.linkFlair?.text ?? '')) return;

    const today = new Date().getUTCDay();

    const notify = async (username: string, message: string) => {
      try {
        await reddit.sendPrivateMessage({
          to: username,
          subject: 'Post Removed - Promo Guard',
          text: message,
        });
      } catch {
        try {
          await reddit.submitComment({
            id: post.id,
            text: `Hey u/${username}, ${message}`,
          });
        } catch {
          console.log(`Could not notify ${username}`);
        }
      }
    };

    if (today !== config.promoDay) {
      await reddit.remove(post.id, false);
      
      const now = new Date();
      const utcTime = now.toUTCString().split(' ')[4];
      const utcTimeShort = utcTime.slice(0, 5);
      const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][now.getUTCDay()];
    
      await notify(
        author.name,
        `Your post was removed. It is currently ${utcTimeShort} UTC on a ${dayName} — Developer Saturday posts are only allowed during Saturdays (UTC). See you next Saturday!`
      );
      return;
    }

    const count = await getUserPostCountToday(kvStore, author.name, allowedFlairs);
    if (count >= config.maxPostsPerUser) {
      await reddit.remove(post.id, false);
      await notify(author.name, `Your post was removed — you've already shared your Developer Saturday post for this week. See you next Saturday!`);
      return;
    }

    // Welcome comment for valid Saturday posts
    try {
      await reddit.submitComment({
        id: post.id,
        text: `🎉 Welcome to Developer Saturday, u/${author.name}! Your project is now live for the community to check out. Upvote, give feedback, and show some love to your fellow devs! 🚀`,
      });
    } catch {
      console.log(`Could not post welcome comment for ${author.name}`);
    }
  },
});

export default Devvit;