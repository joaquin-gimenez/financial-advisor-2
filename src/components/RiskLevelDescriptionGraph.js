import React from 'react';
import { useSelector } from 'react-redux';

import PieChart from  './PieChart';

const colors = [ '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c' ];
const defaultValues = {bonds: 20, largeCap: 20, mideCap: 20, foreign: 20, smallCap: 20};

function RiskLevelDescriptionGraph() {

  const currentLevelData = useSelector((state) => {
    return state.riskLevel.riskLevels.filter(riskLevel => {
      return state.riskLevel.level === riskLevel.level;
    })
    .map(riskLevelb => {
      let riskLevelbCopy = {...riskLevelb}
      delete riskLevelbCopy.level;
      return riskLevelbCopy;
    })
  })[0];

  const riskLevel = useSelector((state) => {
    return state.riskLevel.level;
  })

  return (
    <PieChart 
      data={riskLevel ? currentLevelData : defaultValues}
      defaultLabel={riskLevel ? "" : "Select Level"}
      colors={colors}
      width={500}
      height={500}
      margin={0}
      innerRadius={120}
      />
  );
}

export default RiskLevelDescriptionGraph;
