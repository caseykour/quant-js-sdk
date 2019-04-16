const assert = require('assert');
const historicalStockData = require('./data/stock-spy-15min.data.json').results;
const atrCalculator = require('../src/average-true-range.calculator');

describe('average-true-range.calculator', () => {
  it('should return average true range calculated value', () => {
    let averageTrueRange =
      atrCalculator.calculateAverageTrueRangePrice(
        historicalStockData,
        2
      );

    assert.equal(averageTrueRange, 0.25);
  });
});
