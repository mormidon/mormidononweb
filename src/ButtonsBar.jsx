import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function ButtonsBar({ buttonClick }) {
  return (
    <>
      <div className="flex-container">
        <Button onClick={buttonClick} variant="danger" size="lg">
          ART
        </Button>
        <Button onClick={buttonClick} variant="warning" size="lg">
          FUN
        </Button>
        <Button onClick={buttonClick} variant="secondary" size="lg">
          SIN
        </Button>
        <Button onClick={buttonClick} variant="primary" size="lg">
          DOM
        </Button>
        <Button onClick={buttonClick} variant="info" size="lg">
          ORK
        </Button>
        <Button onClick={buttonClick} variant="success" size="lg">
          WIZ
        </Button>
      </div>
    </>
  );
}

ButtonsBar.propTypes = { buttonClick: PropTypes.func.isRequired };

export default ButtonsBar;
