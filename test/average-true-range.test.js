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

  it('should return keltner channel calculated value', () => {
    let keltnerChannel =
      atrCalculator.calculateKeltnerChannel(
        historicalStockData,
        2,
        9,
        1
      );

    assert.equal(0.25, keltnerChannel.currentAverageTrueRange);
    assert.equal(279.4, keltnerChannel.currentEMA);
    assert.equal(279.65, keltnerChannel.upperBand);
    assert.equal(279.15, keltnerChannel.lowerBand);
  });
});
