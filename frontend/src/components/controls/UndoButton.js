import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function UndoButton() {
  return (
    <div className={"action-button"}>
      <div className={"action-button-icon-wrapper"}>
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          className={"action-button-icon"}
        />
      </div>
      <span className={"action-button-text"}>Undo</span>
    </div>
  );
}
