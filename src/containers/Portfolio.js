import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PortfolioComponent from '../components/Portfolio';
import { roundToTwoDecimals } from '../Helpers';

function Portfolio(props) {

  const riskLevels = useSelector((state) => state.riskLevel.riskLevels);
  const currentLevel = useSelector((state) => state.riskLevel.level);

  const [differencesState, setDifferencesState] = useState({})
  const [newAmountsState, setNewAmountsState] = useState({})
  const [recommendedTransfersState, setRecommendedTransfersState] = useState([])
  const [showErrorMessageState, setShowErrorMessageState] = useState(false)



  function updateState() {
    const newDifferences = updateDifference(differencesState);
    setDifferencesState({...newDifferences}); 
    setNewAmountsState({...updateNewAmount(newAmountsState)}); 
    setRecommendedTransfersState([...updateRecomendedTransfers(newDifferences)]);
    setShowErrorMessageState(false);
  }

  function updateDifference(differences) {
    let differenceCopy = {...differences}

    Object.entries(props.portfolio).map((entry) => {
      let key = entry[0];

      differenceCopy = {
        ...differenceCopy,
        [key]: calculateDifference(key)
      }; 
    })
    return differenceCopy; 
  }

  function updateNewAmount(newAmounts) {
    let newAmountCopy = {...newAmounts}

    Object.entries(props.portfolio).map((entry) => {
      let key = entry[0];

      newAmountCopy = {
        ...newAmountCopy,
        [key]: calculateNewAmount(key)
      }; 
    })
    return newAmountCopy; 
  }


  function updateRecomendedTransfers(differences) {
    let recommendedTransfersMessages = [];
  
    let newDifferencesState = {...differences}

    let positiveDifferences = Object.entries(newDifferencesState)
      .filter(entry => entry[1] > 0 )
      .sort((entryA, entryB) =>  entryA[1] - entryB[1]);
    let negativeDifferences = Object.entries(newDifferencesState)
      .filter(entry => entry[1] < 0 )
      .sort((entryA, entryB) => entryB[1] - entryA[1]);

        while (positiveDifferences.length && negativeDifferences.length) {
          for (var positiveIndex = positiveDifferences.length - 1; positiveIndex >= 0; positiveIndex--) {
            for (var negativeIndex = negativeDifferences.length - 1; negativeIndex >= 0; negativeIndex--) {

              let positiveKey = positiveDifferences[positiveIndex][0];
              let positiveValue = positiveDifferences[positiveIndex][1];
              
              let negativeKey = negativeDifferences[negativeIndex][0];
              let negativeValue = negativeDifferences[negativeIndex][1];
              let message = "";

              if (Math.abs(positiveValue) === Math.abs(negativeValue)) {
                message = `Transfer $${roundToTwoDecimals(Math.abs(negativeValue))} from ${negativeKey} to ${positiveKey}.`;
                positiveDifferences.splice(positiveIndex,1);
                positiveIndex = positiveIndex - 1;
                negativeDifferences.splice(negativeIndex,1);
                negativeIndex = negativeIndex - 1;
              } else if (Math.abs(positiveValue) > Math.abs(negativeValue)) {
                message = `Transfer $${roundToTwoDecimals(Math.abs(negativeValue))} from ${negativeKey} to ${positiveKey}.`;
                negativeDifferences.splice(negativeIndex,1);
                negativeIndex = negativeIndex - 1;
                
                positiveDifferences[positiveIndex][1] = roundToTwoDecimals(positiveDifferences[positiveIndex][1] - Math.abs(negativeValue));
              } else {
                message = `Transfer $${roundToTwoDecimals(Math.abs(positiveValue))} from ${negativeKey} to ${positiveKey}.`;
                positiveDifferences.splice(positiveIndex,1);
                positiveIndex = positiveIndex - 1;
                negativeDifferences[negativeIndex][1] = roundToTwoDecimals(negativeDifferences[negativeIndex][1] + positiveValue);
              }
              recommendedTransfersMessages.push(message) 
            }
          }
        }

        return recommendedTransfersMessages;
  }
  

  function currentAmountTotal() {
    return Object.entries(props.portfolio)
      .map(entry => {
        return entry[1];
      })
      .reduce((prev, current) => prev + (current ? parseInt(current) : 0), 0);
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

  function allValuesValid() {
    return Object.entries(props.portfolio).every((portfolio) => {
      if (portfolio[1]) {
        return portfolio[1].match(/^[0-9]+$/);
      } else { //it's empty
        return true;
      }
    })
  }

  function handleChange(key, value) {
    props.handleChange(key, value);
  }

  useEffect(() => {
    if (!props.inputsPending && allValuesValid()){
      updateState();
    } else if (!props.inputsPending && !allValuesValid()) {
      setRecommendedTransfersState([]);
      setShowErrorMessageState(true);
    }
  }, [props.triggerDataUpdate])

  return (
    <PortfolioComponent 
        handleChange={handleChange}
        portfolio={props.portfolio}
        inputsPending={props.inputsPending}
        differencesState={differencesState}
        newAmountsState={newAmountsState}
        showErrorMessageState={showErrorMessageState}
        recommendedTransfersState={recommendedTransfersState}
    />
  );
}

export default Portfolio;
