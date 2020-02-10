import React, {
  useReducer,
  useState
} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Steps from '../../../features/shipping-label-maker/steps';
import '../../../app.css';

const Names = [
  'to',
  'from',
  'weight',
  'shippingOption'
];
const reducer = (state, action) => {
  switch(action.type) {

    default: return state;
  }
};
const Wizard = ({ steps,
  currentStep: initCurrentStep,
}) => {
  // state = { currentStep: int, stepsCompleted: []}
  const [ state, dispatch ] = useReducer(reducer, { currentStep: 0, stepsCompleted: [] });
  const Child = Steps[steps[currentStep]];
  return (
  <Container    
      fixed
      maxWidth="sm"
    >
      <h2>Shipping Label Maker</h2>
      <LinearProgress
        value={}
        variant='determinate'
      />
      <Child
        name={steps[currentStep]}
        getNextStep={dispatch}
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