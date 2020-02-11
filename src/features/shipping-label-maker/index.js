import React, { useState } from 'react';
import Wizard from '../../core/components/wizard';
import Steps from './steps';

const defaultContext = {
    from: {
        name: "Tommy Kim",
        street: "",
        city: "",
        state: "",
        zip: ""
    },
    shippingOption: 1,
    to: {
        name: "",
        street: "",
        city: "",
        state: "",
        zip: ""
    },
    weight: 2
};

const ShippingLabelMaker = () => {
  const [ complete, setComplete ] = useState(false);
  const [ data, setData ] = useState(defaultContext);
  const handleComplete = completeData => {
    setComplete(true);
    setData(completeData);
  };
  return complete
    ? (
      <p>complete</p>
    ) : (
      <Wizard
        onComplete={handleComplete}
        steps={Steps}
        wizardContext={data}
      />
    );
};

export default ShippingLabelMaker;