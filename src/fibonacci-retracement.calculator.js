'use strict'

function calculateFibonacciRetracement(historicalPrices, precisionValue) {
  let closingPrices = historicalPrices
    .map(m => m.c);

  let minPrice = closingPrices
    .reduce((a, c) => Math.min(a, c));

  let maxPrice = closingPrices
    .reduce((a, c) => Math.max(a, c));

  let offsetPrice = (maxPrice - minPrice);
  
  return {
    'minPrice': parseFloat(minPrice.toFixed(precisionValue)),
    'maxPrice': parseFloat(maxPrice.toFixed(precisionValue)),
    '61.8': parseFloat((maxPrice - (offsetPrice * 0.618)).toFixed(precisionValue)),
    '50.0': parseFloat((maxPrice - (offsetPrice * 0.500)).toFixed(precisionValue)),
    '38.2': parseFloat((maxPrice - (offsetPrice * 0.382)).toFixed(precisionValue)),
    '23.6': parseFloat((maxPrice - (offsetPrice * 0.236)).toFixed(precisionValue))
  }
}

const calculator = {
  calculateFibonacciRetracement: calculateFibonacciRetracement
}

module.exports = calculator;
