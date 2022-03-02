import React from 'react'
import { useSelector } from 'react-redux';

function RiskLevelDescriptionTable(props) {
  const riskLevels = useSelector((state) => state.riskLevel.riskLevels)
  const currentLevel = useSelector((state) => state.riskLevel.level)

  function generateHeader() {
        return(
          <tr>
            {props.showRiskColumn &&
              <th>Risk</th>
            }
            <th>Bonds {props.showPercentajeOnHeader ? " %" : ""}</th>
            <th>Large Cap {props.showPercentajeOnHeader ? " %" : ""}</th>
            <th>Mid Cap {props.showPercentajeOnHeader ? " %" : ""}</th>
            <th>Foreign {props.showPercentajeOnHeader ? " %" : ""}</th>
            <th>Small Cap {props.showPercentajeOnHeader ? " %" : ""}</th>
          </tr>
        )
  }

  function generateRows(){
    if (props.riskLevel) {
      return riskLevels
          .filter( riskLevel => {
            return riskLevel.level === props.riskLevel;
          })
          .map( riskLevel => {
            return <tr key={riskLevel.level}>
              {props.showRiskColumn &&
                <td>{riskLevel.level}</td>
              }
              <td>{riskLevel.bonds} {props.showPercentajeOnData ? "%" : ""}</td>
              <td>{riskLevel.largeCap} {props.showPercentajeOnData ? "%" : ""}</td>
              <td>{riskLevel.midCap} {props.showPercentajeOnData ? "%" : ""}</td>
              <td>{riskLevel.foreign} {props.showPercentajeOnData ? "%" : ""}</td>
              <td>{riskLevel.smallCap} {props.showPercentajeOnData ? "%" : ""}</td>
            </tr>
          })
    } else {
      return (
        <>
          {riskLevels.map( riskLevel => {
              return (
                <tr key={riskLevel.level} className={(!props.riskLevel && currentLevel === riskLevel.level) ?"highlight_row" : ""}>
                  {props.showRiskColumn &&
                    <td>{riskLevel.level}</td>
                  }
                  <td>{riskLevel.bonds}{props.showPercentajeOnData ? "%" : ""}</td>
                  <td>{riskLevel.largeCap} {props.showPercentajeOnData ? "%" : ""}</td>
                  <td>{riskLevel.midCap} {props.showPercentajeOnData ? "%" : ""}</td>
                  <td>{riskLevel.foreign} {props.showPercentajeOnData ? "%" : ""}</td>
                  <td>{riskLevel.smallCap} {props.showPercentajeOnData ? "%" : ""}</td>
                </tr>
            )
          })}
        </>
      )
    }
  }
  return (
    <table>
      <thead>
        {generateHeader()}
      </thead>
      <tbody>
        {generateRows()}
      </tbody>
    </table>
  );
}

export default RiskLevelDescriptionTable;
