import { describe, it, expect } from 'vitest';
import { uuid } from '@/utils/uuid';

describe('uuid()', () => {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  it('should return a valid UUID v4 formatted string', () => {
    const id = uuid();
    expect(typeof id).toBe('string');
    expect(id).toMatch(uuidV4Regex);
  });

  it('should generate different UUIDs on consecutive calls', () => {
    const first = uuid();
    const second = uuid();
    expect(first).not.toBe(second);
  });
});
