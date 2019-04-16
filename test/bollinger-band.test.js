const assert = require('assert');
const historicalStockData = require('./data/stock-spy-15min.data.json').results;
const bbCalculator = require('../src/bollinger-band.calculator');

describe('bollinger-band.calculator', () => {
  it('should return bollinger band calculated values for length of 15 and 2 standard deviations', () => {
    let bollingerBand = 
      bbCalculator.calculateBollingerBandPrice(
        historicalStockData,
        15,
        2,
        2
      );
    
    assert.equal(bollingerBand.upperBandPrice, 279.69);
    assert.equal(bollingerBand.lowerBandPrice, 279.09);
    assert.equal(bollingerBand.movingAveragePrice, 279.39);
  });
});
