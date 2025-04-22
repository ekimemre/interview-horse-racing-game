import { describe, it, expect } from 'vitest'
import { shuffleArray } from '@/utils/shuffle'

describe('shuffleArray()', () => {
  const original = ['a', 'b', 'c', 'd', 'e'];

  it('should return a new array, not mutate the original', () => {
    const shuffled = shuffleArray(original);

    expect(shuffled).not.toBe(original);
    expect(original).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('should return an array with the same elements', () => {
    const shuffled = shuffleArray(original);

    expect(shuffled.sort()).toEqual([...original].sort());
  });

  it('should return identical array when given one element', () => {
    const shuffled = shuffleArray(['x']);
    expect(shuffled).toEqual(['x']);
  });

  it('should return empty array when given empty array', () => {
    const shuffled = shuffleArray([]);
    expect(shuffled).toEqual([]);
  });
});