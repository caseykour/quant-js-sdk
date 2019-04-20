const assert = require('assert');
const historicalStockData = require('./data/stock-spy-15min.data.json').results;
const fibCalculator = require('../src/fibonacci-retracement.calculator');

describe('fibonacci retracement calculator', () => {
  it('should return fibonacci calculated values', () => {
    let fibRetracementLevels = 
      fibCalculator.calculateFibonacciRetracement(
        historicalStockData, 
        2
      );
    
    assert.equal(fibRetracementLevels['minPrice'], 279.1);
    assert.equal(fibRetracementLevels['maxPrice'], 285.08);
    assert.equal(fibRetracementLevels['61.8'], 281.39);
    assert.equal(fibRetracementLevels['50.0'], 282.09);
    assert.equal(fibRetracementLevels['38.2'], 282.8);
    assert.equal(fibRetracementLevels['23.6'], 283.67);
  });
});
