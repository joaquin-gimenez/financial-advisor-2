import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { selectRiskLevel } from '../redux/riskLevel/riskLevel.actions'

function RiskLevelSelector() {

    const riskLevel = useSelector((state) => state.riskLevel.level)
    const dispatch = useDispatch();

    function updateRiskLevel(e) {
        dispatch(selectRiskLevel(parseInt(e.target.dataset.key)))
    };

  return (
    <div className="risk_level_selector">
        <h2>Please Select A Risk Level For Your Investment Portfolio</h2>
        <div className="risk_level_selector">
        <div className="left">
            <div className="risk_level_selector__range">
                <span>Low</span>
                <span>High</span>
            </div>
            <ul className="risk_level_selector__levels">
                 {Array(10).fill(1).map((el, i) => {
                        let key = i + 1;
                        return <li className={riskLevel === key ? "risk_level_selector__current" : ""} onClick={updateRiskLevel} key={key} data-key={key}>{key}</li>
                    }
                )}
            </ul>
        </div>
        <div className="right">
            <Link to="/calculator" className="btn">Continue</Link>
        </div>
        </div>
    </div>
  );
}

export default RiskLevelSelector;
