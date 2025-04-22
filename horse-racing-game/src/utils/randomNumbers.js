import { shuffleArray } from '@/utils/shuffle'
export function randomNumbers(count, min = 1, max = 100) {
  const range = max - min + 1;
  const numbers = Array.from({ length: range }, (_, i) => i + min);
  const shuffled = shuffleArray(numbers)
  return shuffled.slice(0, Math.min(count, range));
}