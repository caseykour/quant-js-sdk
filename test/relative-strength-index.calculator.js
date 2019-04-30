const assert = require('assert');
const historicalStockData = require('./data/forex-usdcad-15min.data.json').results;
const rsiCalculator = require('../src/relative-strength-index.calculator');

describe('relative strength index calculator', () => {
  it('should return relative strength index calculated value', () => {
    let rsi = 
      rsiCalculator.calculateRelativeStrengthIndex(
        historicalStockData
      );
    
    assert.equal(53.25, rsi.toFixed(2));
  });
});
