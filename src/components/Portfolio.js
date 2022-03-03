import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PortfolioItem from './PortfolioItem';

function Portfolio(props) {

  const riskLevels = useSelector((state) => state.riskLevel.riskLevels);
  const currentLevel = useSelector((state) => state.riskLevel.level);

  const [localState, setLocalState] = useState({
    differences: {},
    newAmounts: {}
  })

  function updateState() {
    let newState = {
      differences: {},
      newAmounts: {}
    };
    Object.entries(props.portfolio).map((entry) => {
      let key = entry[0];

      newState.differences[key] = calculateDifference(key); 
      newState.newAmounts[key] = calculateNewAmount(key); 
    })
    setLocalState(newState);
  }
  

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
          Number("-"+ roundToTwoDecimals(currentNumber - idealNumber)) : 
          roundToTwoDecimals(idealNumber - currentNumber);
      })[0]
  }

  function calculateNewAmount(key) {
    let difference = calculateDifference(key)
    let currentNumber = props.portfolio[key];
    
    return roundToTwoDecimals(parseInt(currentNumber) + Number(difference));
  }

  function recommendedTransfers() {
    let newDifferencesState = {...localState.differences}
    let recommendedTransfersMessage = [];

    let positiveDifferences = Object.entries(newDifferencesState)
      .filter(entry => entry[1] > 0 )
      .sort((entryA, entryB) => entryB[1] - entryA[1]);
    let negativeDifferences = Object.entries(newDifferencesState)
      .filter(entry => entry[1] < 0 )
      .sort((entryA, entryB) => entryA[1] - entryB[1]);

        while (positiveDifferences.length && negativeDifferences.length) {
          positiveDifferences.map((positiveEntry, positiveIndex) => {


            negativeDifferences.map((negativeEntry, negativeIndex) => {
              let positiveKey = positiveDifferences[positiveIndex][0];
              let positiveValue = positiveDifferences[positiveIndex][1];


              let negativeKey = negativeDifferences[negativeIndex][0];
              let negativeValue = negativeDifferences[negativeIndex][1];
              let message = "";

              if (Math.abs(positiveValue) === Math.abs(negativeValue)) {
                message = `Transfer $${roundToTwoDecimals(Math.abs(negativeValue))} from ${negativeKey} to ${positiveKey}.`;
                positiveDifferences.splice(positiveIndex,1);
                negativeDifferences.splice(negativeIndex,1);
              } else if (Math.abs(positiveValue) > Math.abs(negativeValue)) {
                message = `Transfer $${roundToTwoDecimals(Math.abs(negativeValue))} from ${negativeKey} to ${positiveKey}.`;
                negativeDifferences.splice(negativeIndex,1);
                positiveDifferences[positiveIndex][1] = roundToTwoDecimals(positiveDifferences[positiveIndex][1] - Math.abs(negativeValue));
              } else {
                message = `Transfer $${roundToTwoDecimals(Math.abs(positiveValue))} from ${negativeKey} to ${positiveKey}.`;
                positiveDifferences.splice(positiveIndex,1);
                negativeDifferences[positiveIndex][1] = roundToTwoDecimals(negativeDifferences[negativeIndex][1] + positiveValue);
              }
              recommendedTransfersMessage.push(message) 

            })
            
          })
        }
        return recommendedTransfersMessage;
  }

  function handleChange(key, value) {
    props.handleChange(key, value);
  }

  useEffect(() => {
    if (!props.inputsPending){
      updateState();
    }
  }, [props.triggerDataUpdate])

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
            inputsPending: props.inputsPending,
            difference: localState.differences[key],
            newAmount: localState.newAmounts[key],
          };
          if (index === 0) {
            attrs.outputTransfers = true
            attrs.recommendedTransfers = recommendedTransfers();

          }

          return <PortfolioItem key={key} keyName={key} value={value} handleChange={handleChange} {...attrs} />
        })}
      </tbody>
    </table>
  );
}

export default Portfolio;
