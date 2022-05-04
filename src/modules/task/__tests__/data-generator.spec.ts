import { generateData } from '../data-generator';

describe('Генератор данных', () => {
  test(
    'Возвращает массив нужной длины',
    () => {
      const count = 3;
      const result = generateData(count, []);

      expect(result.length).toBe(count);
    },
  );

  test(
    'В каждом элементе результата есть слова из переданных слов',
    () => {
      const count = 3;
      const words = ['foo', 'bar', 'baz'];
      const result = generateData(count, words);

      expect(result.every((item) => words.includes(item.rand))).toBe(true);
    },
  );

  test(
    'Элементы имеют правильную структуру',
    () => {
      const count = 1;
      const word = 'test';
      const result = generateData(count, [word]);

      expect(result).toEqual([{
        id: 0,
        name: 'name0',
        rand: word,
      }]);
    },
  );
});
