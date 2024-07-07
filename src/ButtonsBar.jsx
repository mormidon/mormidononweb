import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function ButtonsBar({ buttonClick }) {
  return (
    <>
      <div className="flex-container">
        <Button onClick={buttonClick} variant="danger" size="lg">
          Duo
        </Button>
        <Button onClick={buttonClick} variant="warning" size="lg">
          Java
        </Button>
        <Button onClick={buttonClick} variant="secondary" size="lg">
          Flight
        </Button>
        <Button onClick={buttonClick} variant="primary" size="lg">
          Burp
        </Button>
        <Button onClick={buttonClick} variant="info" size="lg">
          Prog
        </Button>
        <Button onClick={buttonClick} variant="success" size="lg">
          edX
        </Button>
      </div>
    </>
  );
}

ButtonsBar.propTypes = { buttonClick: PropTypes.func.isRequired };

export default ButtonsBar;
