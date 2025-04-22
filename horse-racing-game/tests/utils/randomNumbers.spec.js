import { describe, it, expect, vi } from 'vitest'
import { randomNumbers } from '@/utils/randomNumbers'
import { shuffleArray } from '@/utils/shuffle'

vi.mock('@/utils/shuffle', () => ({
  shuffleArray: vi.fn(arr => arr)
}))

describe('randomNumbers()', () => {
  it('should return the requested count of numbers when count ≤ range', () => {
    const result = randomNumbers(3, 1, 5)
    expect(result).toHaveLength(3)
    expect(result).toEqual([1, 2, 3])
  })

  it('should return all numbers in range when count > range', () => {
    const result = randomNumbers(10, 1, 5)
    expect(result).toHaveLength(5)
    expect(result).toEqual([1, 2, 3, 4, 5])
  })

  it('should default to min=1 and max=100', () => {
    randomNumbers(5)
    expect(shuffleArray).toHaveBeenCalledWith(
      Array.from({ length: 100 }, (_, i) => i + 1)
    )
  })

  it('should return an empty array if count is zero', () => {
    const result = randomNumbers(0, 1, 10)
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })
})
