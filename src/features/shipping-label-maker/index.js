import React, { createContext, useEffect, useState } from 'react';
import Wizard from '../../core/components/wizard';

const wizardContext = {
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
    updateForm: () => {},
    weight: 2
};

export const WizardContext = createContext(wizardContext);

const defaultState = {
    steps: [
        "GetSenderAddress",
        "GetReceiverAddress",
        "GetWeight",
        "GetShippingOption",
        "Confirm"
    ],
    currentStep: 0
}

const ShippingLabelMaker = () => {
    return (
        <WizardContext.Provider value={wizardContext}>
            <Wizard {...defaultState} />
        </WizardContext.Provider>
    );
};

export default ShippingLabelMaker;