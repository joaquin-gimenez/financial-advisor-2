import { useState } from 'react';

import RiskLevelDescriptionTable from './RiskLevelDescriptionTable'
import RiskLevelDescriptionGraph from './RiskLevelDescriptionGraph'

import tableImg from '../assets/images/chartlogo.jpeg';
import chartImg from '../assets/images/donutlogo.png';

const tableMode = "table"
const graphMode = "graph"

function RiskLevelDescription() {
  const [viewMode, setViewMode] = useState(tableMode);

  function toggleViewMode() {
    setViewMode(viewMode === tableMode ? graphMode : tableMode);
  }

  return (
    <div className="risk_level_list_table_wrapper">
      <div className="risk_level_list_table">
        {viewMode === tableMode ?
          <RiskLevelDescriptionTable showPercentajeOnData={false} showRiskColumn={true} showPercentajeOnHeader={true}></RiskLevelDescriptionTable>
          : <RiskLevelDescriptionGraph />
        }
      </div>
      <button id="view-logo" onClick={toggleViewMode}>
        <img src={viewMode === tableMode ? chartImg : tableImg }></img>
      </button>
    </div>
  );
}

export default RiskLevelDescription;
