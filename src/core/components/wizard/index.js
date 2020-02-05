import React, {
  Fragment,
  useState
} from 'react';
import PropTypes from 'prop-types';
import {
  Confirm,
  GetReceiverAddress,
  GetSenderAddress,
  GetShippingOption,
  GetWeight
} from '../../../features/shipping-label-maker/steps';

const Steps = {
  Confirm,
  GetReceiverAddress,
  GetSenderAddress,
  GetShippingOption,
  GetWeight
};

const Wizard = ({ steps, currentStep: initCurrentStep , form }) => {
  const [ currentStep, getNextStep ] = useState(initCurrentStep);

  const Child = Steps[steps[currentStep]];

  return (
    <Fragment>
      <Child />
      <button
        onClick={() => getNextStep(currentStep - 1)}
        type="button"
      >
        Prev
      </button>
      <button
        onClick={() => getNextStep(currentStep + 1)}

      type="button">
        Next
      </button>
    </Fragment>
  );
};

Wizard.propTypes = {
  header: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  wizardContext: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
}

export default Wizard;