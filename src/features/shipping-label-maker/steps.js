import React, { useContext, createRef, useRef, useState, Fragment, } from 'react';
import serialize from 'form-serialize';
import TextField from '@material-ui/core/TextField';
import { WizardContext } from './';

const addressKeys = [
  'name',
  'street',
  'city',
  'state',
  'zip'
];
const GetSenderAddress = (props) => {
  const formRef = createRef();

  const {
    getNextStep,
    name
    } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { from } = formContext;
  const data = from;
  return (
    <form
      data={data}
      name={name}
      ref={formRef}
    >
      <h2>Enter the Sender's address</h2>
      <TextField
        defaultValue={data.name}
        label="Name"
        name="name"
        onChange={handleUpdates}
        required
        fullWidth
      />
      <TextField
        defaultValue={data.street}
        label="Street"
        name="street"
        required
        fullWidth
      />
      <TextField
        defaultValue={data.city}
        label="City"
        name="city"
        required
      />
      <TextField
        defaultValue={data.state}
        label="State"
        name="state"
        required
      />
      <TextField
        defaultValue={data.zip}
        label="zip"
        name="zip"
        required
      />
      <button
        onClick={() => {
          console.log('from: ', serialize(formRef.current));
          const data = serialize(formRef.current, { hash: true });
          if (Object.keys(data).length === addressKeys.length) {
            handleUpdates({ 'from': data });
            getNextStep(1);
          }        
        }}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

const GetReceiverAddress = (props) => {
  const formRef = createRef();
  const {
    getNextStep,
    name
  } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { to } = formContext;
  const data = to;
  return (
    <form
      data={data}
      name={name}
      ref={formRef}
    >
      <h2>Enter the receiver's address</h2>
      <TextField
        defaultValue={data.name}
        label="Name"
        name="name"
        onChange={handleUpdates}
        required
      />
      <TextField
        defaultValue={data.street}
        label="Street"
        name="street"
        required
      />
      <TextField
        defaultValue={data.city}
        label="City"
        name="city"
        required
      />
      <TextField
        defaultValue={data.state}
        label="State"
        name="state"
        required
      />
      <TextField
        defaultValue={data.zip}
        label="zip"
        name="zip"
        required
      />
      <button
        data-dir="prev"
        type="submit"
        onClick={() => {
          const data = serialize(formRef.current, { hash: true });
          console.log('to: ', data);
          if (Object.keys(data).length === addressKeys.length) {
            handleUpdates({
              type: 'GET_NEXT_STEP',
              payload: { 'to': data, nextStep: 0 }
            });
          }       
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          const data = serialize(formRef.current, { hash: true });
          console.log('to: ', data);
          if (Object.keys(data).length === addressKeys.length) {
            handleUpdates({
              type: 'GET_NEXT_STEP',
              payload: { 'to': data, nextStep: 2 }
            });
          }       
        }}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

const GetWeight = (props) => {
  const ref = createRef();
  const {
    getNextStep,
    name
     } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { weight } = formContext;
  return (
    <Fragment>
      <TextField
        defaultValue={weight}
        label="Weight"
        name={name}
        required
        inputRef={ref}
        type="number"
      />
      <button
        type="button"
        onClick={() => {
          console.log('ref: ', ref.current);
          if (!isNaN(parseInt(ref.current.value, 10))) {
            handleUpdates({
              type: 'GET_NEXT_STEP',
              payload: {
                'weight': parseInt(ref.current.value, 10),
                nextStep: 1
              }
            })
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(ref.current.value);
          if (!isNaN(parseInt(ref.current.value, 10))) {
            handleUpdates({
              type: 'GET_NEXT_STEP',
              payload: {
                'weight': parseInt(ref.current.value, 10),
                nextStep: 3
              }
            })
          }
        }}
      >
        Next
      </button>
    </Fragment>
  );
};

const GetShippingOption = (props) => {
  const { getNextStep, name } = props;
  const ref = createRef();
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { shippingOption } = formContext;
  const ShippingOption = {
    ground: 1,
    priority: 2
  };
  return (
    <Fragment>
      <div className="shipping-options">
        <TextField
          name={name}
          select
          label="Shipping Options"
          helperText="Please select a shipping option"
          defaultValue={shippingOption}
          inputRef={ref}
        >
        {Object.entries(ShippingOption).map(([key, val], i) => {
          return (
            <option key={key} value={val}>
              {key}
            </option>
          );
        })} 
        </TextField>
        <span className="steps">Shipping Option</span>
      </div>
      <button
        type="button"
        onClick={() => {
          handleUpdates({
            type: 'GET_NEXT_STEP',
            payload: {
              shippingOption: parseInt(ref.current.value, 10),
              nextStep: 1
            }
          })
        }}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => {
          handleUpdates(
            {
              type: 'GET_NEXT_STEP',
              payload: {
                shippingOption: parseInt(ref.current.value, 10),
                nextStep: 3
              }
            }
          );
        }}
      >
        Next
      </button>
    </Fragment>
  );
};

const Confirm = (props) => {
  return (
    <div className="steps">Confirm</div>
  );
};

const Steps = {
  Confirm,
  GetReceiverAddress,
  GetSenderAddress,
  GetShippingOption,
  GetWeight
};

export default Steps;