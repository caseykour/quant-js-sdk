'use strict'

function calculateRelativeStrengthIndex(historicalPrices, length) {
  length = length ? length : 14;

  if (historicalPrices.length < length + 1) {
    throw Error(`Requires a historicalPrices.length minimum of ${length + 1}.`);
  }

  let closingPrices = historicalPrices
    .slice(historicalPrices.length - (length + 1), historicalPrices.length)
    .map(m => m.c);

  let currentAverage = 
    averageSumOfPrices(
      closingPrices, 
      length
    );

  let previousAverage = 
    averageSumOfPrices(
      closingPrices.slice(0, closingPrices.length - 1),
      length
    );

  let averageGain = 
    ((previousAverage.averageSumOfGains * (length - 1)) + currentAverage.averageSumOfGains) / length;

  let averageLoss = 
    ((previousAverage.averageSumOfLosses * (length - 1)) + currentAverage.averageSumOfLosses) / length;

  let relativeStrength = (averageGain / averageLoss);
  
  let relativeStrengthIndex = 100 - (100 / (1 + relativeStrength));

  return relativeStrengthIndex;
}

function averageSumOfPrices(closingPrices, length) {
  let closingPricesLength = (closingPrices.length - 1);
  
  let deltaPriceGains = [];
  let deltaPriceLosses = [];

  for (let i = closingPricesLength; i > 1; i--) {
    let currentPrice = closingPrices[i];
    let previousPrice = closingPrices[i - 1];

    let deltaPrice = (currentPrice - previousPrice);

    if (deltaPrice > 0) {
      deltaPriceGains.push(deltaPrice);
    } else if (deltaPrice < 0) {
      deltaPriceLosses.push(Math.abs(deltaPrice));
    }
  }

  let averageSumOfGains = (deltaPriceGains.length > 0) 
    ? deltaPriceGains
        .reduce((a, c) => a + c) / length : 0;

  let averageSumOfLosses = (deltaPriceLosses.length > 0) 
    ? deltaPriceLosses
        .reduce((a, c) => a + c) / length : 0;

  return {
    averageSumOfGains : averageSumOfGains,
    averageSumOfLosses : averageSumOfLosses
  }
}

const calculator = {
  calculateRelativeStrengthIndex: calculateRelativeStrengthIndex
}

module.exports = calculator;
