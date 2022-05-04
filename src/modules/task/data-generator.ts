import { IAppItem } from './types';

/**
 * Функция, создающая набор данных для задачи.
 *
 * @param count - количество элементов в результате.
 * @param words - массив строк, используемых в качестве
 * значений поля `rand`.
 */
export const generateData = (
  count: number,
  words: string[],
): Array<IAppItem> => Array
  .from({ length: count }, (v, i) => i)
  .map((item) => ({
    id: item,
    name: `name${item}`,
    rand: words[Math.floor(Math.random() * words.length)],
  }));
