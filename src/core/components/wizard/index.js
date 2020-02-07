import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Confirm,
  GetReceiverAddress,
  GetSenderAddress,
  GetShippingOption,
  GetWeight
} from '../../../features/shipping-label-maker/steps';
import '../../../app.css';
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
    <Container
      fixed
      maxWidth="sm"
    >
      <LinearProgress
        value={20}
        variant='determinate'
      />
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
    </Container>
  );
};

Wizard.propTypes = {
  header: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  wizardContext: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
}

export default Wizard;