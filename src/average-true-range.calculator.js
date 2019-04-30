'use strict'

const emaCalculator = require('./exponential-moving-average.calculator');

function calculateAverageTrueRangePrice(historicalPrices, precisionValue, length) {
  length = length ? length : 14;

  if (historicalPrices.length < length) {
    throw Error(`Requires a historicalPrices.length minimum of ${length}.`);
  }

  let rangePrices = historicalPrices
    .slice(historicalPrices.length - length, historicalPrices.length);

  let currentPrice = rangePrices[rangePrices.length - 1];
  let previousPrice = rangePrices[rangePrices.length - 2];
  let priorPreviousPrice = rangePrices[rangePrices.length - 3];

  let currentTrueRange =
    calculateTrueRange(
      previousPrice,
      currentPrice
    );

  let previousTrueRange =
    calculateTrueRange(
      priorPreviousPrice,
      previousPrice
    );

  let offSetLength = length - 1;
  let averageTrueRange = ((previousTrueRange * offSetLength) + currentTrueRange) / length;

  return parseFloat(averageTrueRange).toFixed(precisionValue);
}

function calculateKeltnerChannel(historicalPrices, precisionValue, length, multiplierValue) {
  multiplierValue = multiplierValue ? multiplierValue : 1;

  let currentAverageTrueRange = 
    calculateAverageTrueRangePrice(
      historicalPrices, 
      precisionValue, 
      length
    );

  let currentEMA = emaCalculator
    .calculateExponentialMovingAveragePrice(
      historicalPrices, 
      precisionValue, 
      length
    );

  let upperBand = currentEMA + (multiplierValue * currentAverageTrueRange);
  let lowerBand = currentEMA - (multiplierValue * currentAverageTrueRange);

  return {
    currentEMA : currentEMA,
    currentAverageTrueRange: currentAverageTrueRange,
    upperBand: parseFloat(upperBand.toFixed(precisionValue)),
    lowerBand: parseFloat(lowerBand.toFixed(precisionValue))
  }
}

function calculateTrueRange(previousPrice, currentPrice) {
  return Math.max(
    currentHighLessCurrentLow(currentPrice),
    currentHighLessPreviousClose(previousPrice, currentPrice),
    currentLowLessPreviousClose(previousPrice, currentPrice)
  );
}

function currentHighLessCurrentLow(currentPrice) {
  return currentPrice.h - currentPrice.l;
}

function currentHighLessPreviousClose(previousPrice, currentPrice) {
  return Math.abs(currentPrice.h - previousPrice.c);
}

function currentLowLessPreviousClose(previousPrice, currentPrice) {
  return Math.abs(currentPrice.l - previousPrice.c);
}

const calculator = {
  calculateAverageTrueRangePrice: calculateAverageTrueRangePrice,
  calculateKeltnerChannel: calculateKeltnerChannel
}

module.exports = calculator;
