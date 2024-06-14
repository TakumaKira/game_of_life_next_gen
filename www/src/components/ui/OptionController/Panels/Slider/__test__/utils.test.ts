import { valueToRate, rateToValue, getUpdatedRate, limitRate } from '../utils';

describe('Rate Conversion Utilities', () => {
  describe('valueToRate function', () => {
    it('should convert a value within a given range to a rate', () => {
      expect(valueToRate(50, [0, 100])).toEqual(0.5);
      expect(valueToRate(25, [0, 100])).toEqual(0.25);
    });

    it('should handle values outside the range', () => {
      expect(valueToRate(-10, [0, 100])).toEqual(-0.1);
      expect(valueToRate(110, [0, 100])).toEqual(1.1);
    });
  });

  describe('rateToValue function', () => {
    it('should convert a rate to a value within a given range', () => {
      expect(rateToValue(0.5, [0, 100])).toEqual(50);
      expect(rateToValue(0.25, [0, 100])).toEqual(25);
    });
  });

  describe('getUpdatedRate function', () => {
    let containerMock: DOMRect;
    let knobMock: DOMRect;

    beforeEach(() => {
      containerMock = { left: 10, width: 100 } as DOMRect;
      knobMock = { width: 20 } as DOMRect;
    });

    it('should calculate the correct updated rate based on mouse position', () => {
      expect(getUpdatedRate(60, containerMock, knobMock)).toBeCloseTo(0.5);
    });

    it('should never return a rate less than 0', () => {
      expect(getUpdatedRate(5, containerMock, knobMock)).toEqual(0);
    });

    it('should never return a rate more than 1', () => {
      expect(getUpdatedRate(150, containerMock, knobMock)).toEqual(1);
    });
  });

  describe('limitRate function', () => {
    it('should limit the rate to a minimum of 0 and a maximum of 1', () => {
      expect(limitRate(-0.1)).toEqual(0);
      expect(limitRate(1.2)).toEqual(1);
    });
  });
});
