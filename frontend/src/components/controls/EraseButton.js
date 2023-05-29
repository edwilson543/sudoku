import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

export default function EraseButton() {
  return (
    <div className={"action-button"}>
      <div className={"action-button-icon-wrapper"}>
        <FontAwesomeIcon icon={faEraser} className={"action-button-icon"} />
      </div>
      <span className={"action-button-text"}>Erase</span>
    </div>
  );
}
