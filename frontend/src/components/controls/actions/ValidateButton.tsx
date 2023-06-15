import React, { SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

type ValidateButtonProps = {
  validationIsOn: boolean;
  setValidationIsOn: React.Dispatch<SetStateAction<boolean>>;
};

export default function ValidateButton({
  validationIsOn,
  setValidationIsOn,
}: ValidateButtonProps) {
  /* Button to toggle validation on / off */
  function toggleValidation(): void {
    setValidationIsOn(!validationIsOn);
  }

  const toggleClassName =
    "action-button-icon-wrapper" +
    (validationIsOn ? " validation-toggle-on" : "");

  return (
    <div className={"action-button"}>
      <button
        className={toggleClassName}
        onClick={toggleValidation}
        data-testid={"validate-button"}
      >
        <FontAwesomeIcon
          icon={faCheckCircle}
          className={"action-button-icon"}
        />
      </button>
      <span className={"action-button-text"}>check</span>
    </div>
  );
}
