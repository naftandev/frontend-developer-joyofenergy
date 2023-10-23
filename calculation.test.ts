import { getReadings } from './reading';
import {
  calculateCarbonFeetprint,
  calculateConsumption,
  calculateCost,
} from './calculation';

describe('#calculation', () => {
  let consumption = 0;
  let cost = 0;
  let carbonFeetprint = 0;

  beforeAll(() => {
    getReadings(5).then((readings) => {
      consumption = calculateConsumption(readings);
      cost = calculateCost(consumption);
      carbonFeetprint = calculateCarbonFeetprint(consumption);
    });
  });

  describe('#calculateConsumption', () => {
    test('should return a number', () => {
      expect(typeof consumption).toBe('number');
    });
    test('should be greater 0', () => {
      expect(consumption).toBeGreaterThan(0);
    });
  });

  describe('#calculateConsumption', () => {
    test('should return a number', () => {
      expect(typeof cost).toBe('number');
    });
    test('should be greater 0', () => {
      expect(cost).toBeGreaterThan(0);
    });
  });

  describe('#calculateConsumption', () => {
    test('should return a number', () => {
      expect(typeof carbonFeetprint).toBe('number');
    });
    test('should be greater 0', () => {
      expect(carbonFeetprint).toBeGreaterThan(0);
    });
  });
});
