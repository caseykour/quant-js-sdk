'use strict'

function calculateBollingerBandPrice(historicalPrices, length, numOfDeviation, precisionValue) {
  if (length > historicalPrices.length) {
    throw Error('Requires a length input less than historicalPrices.length');
  }
  
  let closingPrices = historicalPrices
    .slice(historicalPrices.length - length, historicalPrices.length)
    .map(m => m.c);

  let movingAverage = closingPrices
    .reduce((a, c) => a + c) / length;

  let variancePrice = closingPrices
    .map(m => Math.pow(m - movingAverage, 2))
    .reduce((a, c) => a + c) / length;

  let standardDeviation = Math.sqrt(variancePrice);
  let movingAveragePrice = parseFloat(movingAverage.toFixed(precisionValue));

  return {
    upperBandPrice: parseFloat((movingAveragePrice + (standardDeviation * numOfDeviation)).toFixed(precisionValue)),
    lowerBandPrice: parseFloat((movingAveragePrice - (standardDeviation * numOfDeviation)).toFixed(precisionValue)),
    movingAveragePrice: movingAveragePrice,
    length: length
  }
}

const calculator = {
  calculateBollingerBandPrice: calculateBollingerBandPrice
}

module.exports = calculator;
