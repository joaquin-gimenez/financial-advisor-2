import React from 'react';

import PortfolioItem from './PortfolioItem';

function Portfolio(props) {


  function handleChange(key, value) {
    props.handleChange(key, value);
  }

  return (
    <table className="portfolio no-internal-borders">
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
            difference: props.differencesState[key],
            newAmount: props.newAmountsState[key],
            showErrorMessage: props.showErrorMessageState
          };
          if (index === 0) {
            attrs.outputTransfers = true
            attrs.recommendedTransfers = props.recommendedTransfersState;
          }

          return <PortfolioItem key={key} keyName={key} value={value} handleChange={handleChange} {...attrs} />
        })}
      </tbody>
    </table>
  );
}

export default Portfolio;
