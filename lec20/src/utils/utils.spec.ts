import { addItemToTheEnd, compileAndroidCode, reverseStr, sum } from './utils';

describe('Utils functions', () => {
  describe('Sum function', () => {
    it('should return 4 when 2 and 2 passed', () => {
      const result = sum(2, 2);
      expect(result).toBe(4);
    });

    it('should return 5 when 2 and 3 passed', () => {
      const result = sum(2, 3);
      expect(result).toBe(5);
    });

    it('should return 0.3 when 0.1 and 0.2 passed', () => {
      const result = sum(0.1, 0.2);
      expect(result).toBeCloseTo(0.3);
    });
  });

  describe('ReverseString function', () => {
    it('should return olleh when hello passed', () => {
      const result = reverseStr('hello');
      expect(result).toBe('olleh');
    });
  });

  describe('Array Test', () => {
    it('should be [1,2,3, 4] when 4 is passed', () => {
      const arr = [1, 2, 3];
      const result = addItemToTheEnd(4, arr);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('object test', () => {
      const obj1 = {
        a: 'test',
        b: [
          {
            c: {
              d: 'test',
            },
            e: undefined,
          },
        ],
      };
      const obj2 = {
        a: 'test',
        b: [
          {
            c: {
              d: 'test',
            },
            e: undefined,
          },
        ],
      };
      expect(obj1).toEqual(obj2);
    });
  });

  describe('compile android code', () => {
    it('shond thwor error', () => {
        expect(() => {
            compileAndroidCode()
        }).toThrow(Error)
    })
  })
});
