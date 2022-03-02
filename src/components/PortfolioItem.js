function PortfolioItem(props) {

    function generateName(key) {
        return key.replace(/[A-Z]/g, ' $&')
    }

    function handleChange(event) {
      props.handleChange(event.target.dataset.key, event.target.value);
    }

    return (
      <tr key={props.keyName}>
          <td>
            <div>
              <span>{generateName(props.keyName)} $:</span>
              <span>
                <input type="text" className="risk-calculator-main-input" data-key={props.keyName} value={props.value ? props.value : ""} onChange={handleChange}></input>
              </span>
            </div>
          </td>
          <td>
            <input type="text" className="risk-calculator-main-difference" disabled value={props.difference ? props.difference : ""}></input>
          </td>
          <td>
            <input type="text" className="risk-calculator-main-new" disabled value={props.newAmount ? props.newAmount : ""}></input>
          </td>
          {props.outputTransfers === 0 &&
            <td className="recommendations" height="100" rowSpan="5">
              <div type="text" className="input risk-calculator-transfers">
                {props.recommendedTransfers ? props.recommendedTransfers : ""}
              </div>
            </td>
          }
      </tr>);
  }

  export default PortfolioItem; 