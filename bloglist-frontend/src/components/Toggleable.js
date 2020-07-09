import React, { useState, Fragment, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Toggleable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hiddenStyle = { display: visible ? 'none' : '' };
  const visibleStyle = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible((previous) => !previous);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <Fragment>
      <div style={hiddenStyle}>
        <Button inverted onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={visibleStyle}>
        {children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </Fragment>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Toggleable;
