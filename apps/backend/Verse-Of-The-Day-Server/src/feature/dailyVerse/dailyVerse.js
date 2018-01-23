import Promise from 'bluebird';
import compose from 'promise-compose';
import book from './books/books';
import chapter from './chapter/chapter';
import verse from './verse/verse';
import type { Verse } from './../../types/Verse.type';
import client from './../../utility/cache/client';

const views = [
  {
    theme: 'proverb',
    title: 'TODAY\'S PROVERB',
    bookName: 'Proverbs',
  },
  {
    theme: 'psalm',
    title: 'TODAY\'S PSALM',
    bookName: 'Psalm',
  },
  {
    theme: 'random',
    title: 'TODAY\'S VERSE',
    bookName: 'random',
  },
];

const getBook = compose(book, chapter().getRandomChapter, chapter().getFullChapter, verse());

async function getVerseOfTheDay(bibleID: string = 'eng-ESV'): Promise<Verse[]> {
  const addBibleID = v => Object.assign({}, v, { bibleID });
  return Promise.all(views.map(addBibleID).map(getBook)).tap(() => client().quit());
}

export { getVerseOfTheDay };
export default getVerseOfTheDay;
