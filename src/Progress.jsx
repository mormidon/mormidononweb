import PropTypes from "prop-types";
import { ProgressBar } from "react-bootstrap";

function Progress({ percents = 0 }) {
  return (
    <>
      <ProgressBar
        striped
        animated
        now={percents}
        label={`${percents.toFixed(2)}%`}
        max={100}
        min={0}
      />
    </>
  );
}

Progress.propTypes = { percents: PropTypes.number };

export default Progress;
