import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import RiskLevelDescriptionTable from '../components/RiskLevelDescriptionTable';
import Portfolio from '../containers/Portfolio';

function Calculator() {
    const riskLevel = useSelector((state) => state.riskLevel.level)

    const [portfolio, setPortfolio] = useState({
      bonds: null,
      largeCap: null,
      midCap: null,
      foreign: null,
      smallCap: null,
    });

    const [triggerDataUpdate, setTriggerDataUpdate] = useState(false);

    function inputsPending() {
      return Object.entries(portfolio).some((entry) => {
        return !entry[1] && entry[1] !== 0;
      })
    }

    function handleChange(key, value) {
      setPortfolio({
        ...portfolio,
        [key]: value
      })
    }

    function rebalance() {
      if (!inputsPending()) {
        setTriggerDataUpdate(!triggerDataUpdate);
      }
    }

    return (
      <div>
        <h2>Personalized Portfolio</h2>
        <h3 className="text-left">Risk Level {riskLevel}</h3>
        <RiskLevelDescriptionTable riskLevel={riskLevel} showRiskColumn={false} showPercentajeOnHeader={false} showPercentajeOnData={true}></RiskLevelDescriptionTable>
        <div className="rebalance_button_wrapper">
          <h3>Please Enter Your Current Portfolio</h3>
          <button className="btn" disabled={inputsPending()} onClick={rebalance}>Rebalance</button>
        </div>
        <Portfolio 
          portfolio={portfolio} 
          handleChange={handleChange}
          inputsPending={inputsPending()}
          triggerDataUpdate={triggerDataUpdate}/>
      </div>
    );
  }
  
  export default Calculator;
  