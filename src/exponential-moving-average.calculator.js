'use strict'

function calculateExponentialMovingAveragePrice(historicalPrices, precisionValue, length) {
  if (historicalPrices.length < length) {
    throw Error(`Requires a historicalPrices.length minimum of ${length}.`);
  }

  let closingPrices = historicalPrices
    .slice(historicalPrices.length - length, historicalPrices.length)
    .map(m => m.c);

  let prevSMA = closingPrices
    .slice(0, closingPrices.length - 1)
    .reduce((a, c) => a + c) / (length - 1);

  let currentClosingPrice = closingPrices[closingPrices.length - 1];
  let smoothingWeight = (2 / (length + 1));

  let currentEMA = (currentClosingPrice - prevSMA) * smoothingWeight + prevSMA;

  return parseFloat(currentEMA.toFixed(precisionValue));
}

const calculator = {
  calculateExponentialMovingAveragePrice: calculateExponentialMovingAveragePrice
}

module.exports = calculator;
