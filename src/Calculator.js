import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import RiskLevelDescriptionTable from './components/RiskLevelDescriptionTable';
import Portfolio from './components/Portfolio';

function Calculator() {
    const riskLevel = useSelector((state) => state.riskLevel.level)

    const [portfolio, setPortfolio] = useState({
      bonds: null,
      largeCap: null,
      midCap: null,
      foreign: null,
      smallCap: null,
    });

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

    return (
      <div>
        <h2>Personalized Portfolio</h2>
        <h3>Risk Level {riskLevel}</h3>
        <RiskLevelDescriptionTable riskLevel={riskLevel} showRiskColumn={false} showPercentajeOnHeader={false} showPercentajeOnData={true}></RiskLevelDescriptionTable>
        <h3>Please Enter Your Current Portfolio</h3>
        <button className="btn" disabled={inputsPending()}>Rebalance</button>
        <Portfolio 
          portfolio={portfolio} 
          handleChange={handleChange}
          inputsPending={inputsPending()}/>
      </div>
    );
  }
  
  export default Calculator;
  