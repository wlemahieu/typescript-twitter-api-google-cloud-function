import * as Sentiment from 'sentiment';

const sentiment = new Sentiment();
const calculateSentiment = (text: string) => sentiment.analyze(text);

export default calculateSentiment;
