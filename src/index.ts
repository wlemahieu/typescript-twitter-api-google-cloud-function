/**
 * This Google Cloud Function will connect to Twitter using
 * the provided Twitter Bearer token stored inside of Cloud
 * secrets and allow you to use the Twitter API!
 *
 * Example #1 fetches the 20th Tweet ever recorded in history but @jack
 * Example #2 lists all of your own Tweets using tail-call recursion
 */
import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import {Client} from 'twitter-api-sdk';

const getTweets = async (
  client: Client,
  myUserId: string,
  perPage: number,
  nextToken?: string
) => {
  let tweets: Array<any> = [];

  const results = await client.tweets.usersIdTweets(myUserId, {
    max_results: perPage,
    pagination_token: nextToken,
  });

  const data: any = results?.data;
  tweets = [...tweets, ...data];

  if (results?.meta?.next_token?.length) {
    console.log('Getting more tweets!');
    await getTweets(client, myUserId, perPage, results.meta?.next_token);
  }
  return tweets;
};

export const run: HttpFunction = async (_req, res) => {
  console.log('Connecting to Twitter API...');

  const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

  // get the 20th ever tweet!
  console.log('Fetching an old tweet by Jack...');
  const tweet = await client.tweets.findTweetById('20');
  console.log(tweet?.data?.text);

  // get all my tweets and liked tweets
  try {
    console.log('Fetching all my tweets...');
    const myUser = await client.users.findUserByUsername('WesleyLeMahieu');

    if (myUser.data) {
      // const likes = await client.tweets.usersIdLikedTweets(myUser.data.id);
      const tweets = await getTweets(client, myUser.data.id, 100);
      res.send({
        // likes: likes?.data,
        tweets,
      });
    } else {
      res.send('No user found, check your Twitter secrets!');
    }
  } catch (e) {
    console.log(e);
  }
};
