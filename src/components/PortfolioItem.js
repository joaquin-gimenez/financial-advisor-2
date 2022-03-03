function PortfolioItem(props) {

    function generateName(key) {
        return key.replace(/[A-Z]/g, ' $&')
    }

    function formatDifference(number) {
      return Math.sign(number) !== -1 ? "+" +  number : number;
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
            <input type="text" className="risk-calculator-main-difference" disabled value={!props.inputsPending && (props.difference || props.difference === 0) ? formatDifference(props.difference) : ""}></input>
          </td>
          <td>
            <input type="text" className="risk-calculator-main-new" disabled value={!props.inputsPending && (props.newAmount || props.newAmount === 0) ? props.newAmount : ""}></input>
          </td>
          {props.outputTransfers &&
            <td className="recommendations" height="100" rowSpan="5">
              <div type="text" className="input risk-calculator-transfers">
                {!props.inputsPending &&
                    <ul>
                    {props.recommendedTransfers ? 
                      props.recommendedTransfers.map((message, index) => <li key={index}>{message}</li>)
                    : ""}
                    </ul>
                }
              </div>
            </td>
          }
      </tr>);
  }

  export default PortfolioItem; 