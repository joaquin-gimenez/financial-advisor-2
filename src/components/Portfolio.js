import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import PortfolioItem from './PortfolioItem';

function Portfolio(props) {
  const riskLevels = useSelector((state) => state.riskLevel.riskLevels);
  const currentLevel = useSelector((state) => state.riskLevel.level);
  

  function currentAmountTotal() {
    return Object.entries(props.portfolio)
      .map(entry => {
        return entry[1];
      })
      .reduce((prev, current) => prev + (current ? parseInt(current) : 0), 0);
  }

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100
  }

  function calculateDifference(key) {
    let total = currentAmountTotal();

    return riskLevels
      .filter( riskLevel => {
        return riskLevel.level === currentLevel;
      })
      .map( riskLevel => {
        let idealPercentage = riskLevel[key];
        let currentNumber = props.portfolio[key];
        let idealNumber = (idealPercentage * total) / 100;
        return currentNumber > idealNumber ? 
          "-"+ roundToTwoDecimals(currentNumber - idealNumber) : 
          "+"+ roundToTwoDecimals(idealNumber - currentNumber);
      })
  }

  function calculateNewAmount(key) {
    let difference = calculateDifference(key)
    let currentNumber = props.portfolio[key];
    
    return roundToTwoDecimals(parseInt(currentNumber) + Number(difference));
  }

  function recommendedTransfers() {
    let currentDifference = [
      { bonds: },
      { largeCap: },
      { midCap: },
      { foreign: }, 
      { smallCap: },
    ]

  }

  // function generateName(key) {
  //     return key.replace(/[A-Z]/g, ' $&')
  // }
  

  function handleChange(key, value) {
    props.handleChange(key, value);
  }

  useEffect(() => {
    currentAmountTotal();
  }, [props.inputsPending]);

  return (
    <table className="portfolio">
      <thead>
        <tr>
          <th>Current Amount</th>
          <th>Difference</th>
          <th>New Amount</th>
          <th>Recommended Transfers</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props.portfolio).map((entry, index) => {
          let key = entry[0],
          value = entry[1]
          
          let attrs = {
            difference: calculateDifference(key),
            newAmount: calculateNewAmount(key),
            recommendedTransfers: ""
          };
          if (index === 0) {
            attrs.outputTransfers = true
          }

          return <PortfolioItem key={key} keyName={key} value={value} handleChange={handleChange} {...attrs} />
        })}
      </tbody>
    </table>
  );
}

export default Portfolio;
