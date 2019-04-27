const assert = require('assert');
const historicalStockData = require('./data/stock-spy-15min.data.json').results;
const emaCalculator = require('../src/exponential-moving-average.calculator');

describe('exponential moving average calculator', () => {
  it('should return exponential moving average calculated values', () => {
    let exponentialMovingAverage = 
      emaCalculator.calculateExponentialMovingAveragePrice(
        historicalStockData, 
        2, 
        9
      );

    assert.equal(279.4, exponentialMovingAverage);
  });
});
