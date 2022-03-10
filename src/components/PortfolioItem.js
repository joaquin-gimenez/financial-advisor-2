
import {formatPortfolioName, isNegative} from '../Helpers';

function formatDifference(number) {
  return Math.sign(number) !== -1 ? "+" +  number : number;
}

let errorMessage = "Please use only positive digits or zero when entering current amounts. Please enter all inputs correctly."

function PortfolioItem(props) {

    function handleChange(event) {
      props.handleChange(event.target.dataset.key, event.target.value);
    }

    return (
      <tr key={props.keyName}>
          <td>
            <div>
              <span>{formatPortfolioName(props.keyName)} $:</span>
              <span>
                <input type="text" className="risk-calculator-main-input input--highlighted" data-key={props.keyName} value={props.value ? props.value : ""} onChange={handleChange}></input>
              </span>
            </div>
          </td>
          <td>
            <input type="text" className={isNegative(props.difference) ? "risk-calculator-main-difference text-red" : "risk-calculator-main-difference text-green"} disabled value={!props.inputsPending && (props.difference || props.difference === 0) ? formatDifference(props.difference) : ""}></input>
          </td>
          <td>
            <input type="text" className="risk-calculator-main-new text-blue" disabled value={!props.inputsPending && (props.newAmount || props.newAmount === 0) ? props.newAmount : ""}></input>
          </td>
          {props.outputTransfers &&
            <td className="recommendations" height="100" rowSpan="5">
              <div type="text" className="input risk-calculator-transfers">
                {!props.inputsPending &&
                  props.showErrorMessage ? <p class="text-red">{errorMessage}</p> : 
                  <ul>
                    {
                      props.recommendedTransfers ? 
                      props.recommendedTransfers.map((message, index) => <li key={index}>{message}</li>)
                      : ""
                    }
                  </ul>
                }
              </div>
            </td>
          }
      </tr>);
  }

  export default PortfolioItem; 