import RiskLevelDescriptionTable from './RiskLevelDescriptionTable'

function RiskLevelDescription() {
  return (
    <div className="risk_level_list_table">
      <RiskLevelDescriptionTable showPercentajeOnData={false} showRiskColumn={true} showPercentajeOnHeader={true}></RiskLevelDescriptionTable>
    </div>
  );
}

export default RiskLevelDescription;
