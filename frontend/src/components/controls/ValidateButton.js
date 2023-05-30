import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function ValidateButton({ validationIsOn, setValidationIsOn }) {
  /* Button to toggle validation on / off */
  function toggleValidation() {
    setValidationIsOn(!validationIsOn);
  }

  const toggleClassName =
    "action-button-icon-wrapper" +
    (validationIsOn ? " validation-toggle-on" : "");

  return (
    <div className={"action-button"}>
      <div className={toggleClassName} onClick={toggleValidation}>
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={"action-button-icon"}
        />
      </div>
      <span className={"action-button-text"}>Check</span>
    </div>
  );
}
