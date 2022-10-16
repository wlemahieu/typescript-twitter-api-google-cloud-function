/**
 * index.ts
 *
 * This Google Cloud Function will connect to Twitter using
 * the provided Twitter Bearer token stored inside of Cloud
 * secrets and allow you to use the Twitter API!
 *
 * This example lists all Tweets for the provider username using tail-call recursion.
 */

import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';
import getUser from './api/getUser';
import getTweets from './api/getTweets';

const twitterUsername = 'wesleylemahieu';

export const run: HttpFunction = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const rowsPerPage = parseInt((req.query.rowsPerPage as string) || '100', 10);
  const nextToken = req.query.nextToken as string;

  const response = await getUser(twitterUsername);
  const myUserId = response?.data?.data?.id;

  if (!response?.data?.data?.id) {
    throw {
      status: 400,
      message: 'No user found, check your Twitter secrets!',
    };
  }

  const {newNextToken, tweets} = await getTweets(
    myUserId,
    rowsPerPage,
    nextToken
  );

  res.send({
    // likes: likes?.data,
    nextToken: newNextToken,
    tweets,
  });
};
