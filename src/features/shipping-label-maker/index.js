import React, { createContext, useEffect, useState } from 'react';
import Wizard from '../../core/components/wizard';

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

export const WizardContext = createContext(defaultContext);

const defaultState = {
  currentStep: 0,
  steps: [
      "GetSenderAddress",
      "GetReceiverAddress",
      "GetWeight",
      "GetShippingOption",
      "Confirm"
  ],
  stepsCompleted: []
}

const ShippingLabelMaker = () => {
  const [ formContext, updateContext ] = useState(defaultContext);

  const handleUpdates = (value) => {
    console.log('value: ', value);
    if (value) {
      updateContext({
        ...formContext,
        ...value
        });
    }
  }
  console.log('formContext: ', formContext);
    return (
        <WizardContext.Provider value={{ formContext, handleUpdates }}>
            <Wizard
            {...defaultState}
            requiredKeys={Object.keys(defaultContext)} />
        </WizardContext.Provider>
    );
};

export default ShippingLabelMaker;