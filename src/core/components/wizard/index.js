import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Steps from '../../../features/shipping-label-maker/steps';
import '../../../app.css';


const Wizard = ({ steps,
  currentStep: initCurrentStep,
  requiredKeys,
  stepsCompleted: initStepsCompleted
}) => {
  const [ currentStep, getNextStep ] = useState(initCurrentStep);
  const [ stepsCompleted, validateStep ] = useState(initStepsCompleted);

  const Child = Steps[steps[currentStep]];
  const handleValidate = (name) => {
    console.log('name: ', name);
    if ((stepsCompleted.indexOf(name) === -1) && (requiredKeys.indexOf(name) > -1)) {
      validateStep([ ...stepsCompleted, name]);
    }
  }
  return (
  <Container    
      fixed
      maxWidth="sm"
    >
      <h2>Shipping Label Maker</h2>
      <LinearProgress
        value={20}
        variant='determinate'
      />
      <Child
        name={steps[currentStep]}
        getNextStep={getNextStep}
        setValidate={handleValidate}
      />
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