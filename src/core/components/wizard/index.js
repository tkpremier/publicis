import React, {
  useReducer,
  useState
} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../../../app.css';

const defaultState = {
  currentStep: 0,
  stepsCompleted: []
}

const names = [
  'from',
  "to",
  'weight',
  'shippingOption'
];
const reducer = (state, action) => {
  switch(action.type) {
    case 'GET_NEXT_STEP': return {
      ...state,
      ...action.payload,
      currentStep: action.payload.nextStep,
      stepsCompleted: state.stepsCompleted.indexOf(action.payload.stepCompleted) === -1 && names.indexOf(action.payload.stepCompleted > -1) 
        ? [ ...state.stepsCompleted, action.payload.stepCompleted]
        : state.stepsCompleted
    };
    default: return state;
  }
};
const Wizard = ({
  onComplete,
  steps,
  wizardContext
}) => {
  // state = { currentStep: int, stepsCompleted: []}
  const [ state, dispatch ] = useReducer(reducer, {
    ...defaultState,
    ...wizardContext
  });
  const { currentStep, stepsCompleted } = state;
  const stepNames = Object.keys(steps);
  const Child = steps[stepNames[currentStep]];
  const propertyName = names[currentStep];
  const getData = (state, name) => {
    switch(name) {
      case 'Confirm':
        return state;
      case 'GetShippingOption':
        return { weight: state.weight, shippingOption: state.shippingOption };
      default:
        return state[propertyName]
    }
  }
  return (
  <Container    
      fixed
      maxWidth="sm"
    >
      <h2>Shipping Label Maker</h2>
      <LinearProgress
        value={stepsCompleted.length * 25}
        variant='determinate'
      />
      <Child
        name={propertyName}
        data={getData(state, stepNames[currentStep])}
        getNextStep={dispatch}
        onComplete={onComplete}
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