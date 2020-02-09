import React, { useContext, useState, Fragment, } from 'react';
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
  const {
    getNextStep,
    name,
    setValidate } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { from } = formContext;
  const data = from;
  const handleSubmit = (e) => {
    console.log('e.currentTarget: ', e.currentTarget);
    e.preventDefault();
    const serialized = serialize(e.target, { hash: true });
    const keys = Object.keys(serialized);
    if (keys.length === addressKeys.length) {
      setValidate(name);
    }
  }
  return (
    <form
      data={data}
      name={name}
      onSubmit={handleSubmit}
    >
      <h2>Enter the receiver's address</h2>
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
        // onClick={() => getNextStep(4)}
        type="submit"
      >
        Prev
      </button>
      <button
        onClick={() => getNextStep(1)}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

const GetReceiverAddress = (props) => {
  const {
    getNextStep,
    name,
    setValidate } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { to } = formContext;
  const data = to;
  const handleSubmit = (e) => {
    e.preventDefault();
    const serialized = serialize(e.target, { hash: true });
    const keys = Object.keys(serialized);
    if (keys.length === addressKeys.length) {
      setValidate(name);
    }
  }
  return (
    <form
      data={data}
      name={name}
      onSubmit={handleSubmit}
    >
      <h2>Enter the sender's address</h2>
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
        onClick={() => { getNextStep(0);}}
      >
        Prev
      </button>
      <button
        onClick={(e) => { getNextStep(2);}}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

const GetWeight = (props) => {
  const {
    getNextStep,
    name,
    setValidate } = props;
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { weight } = formContext;
  return (
    <Fragment>
      <TextField
        defaultValue={weight}
        label="Weight"
        name={name}
        onChange={setValidate}
        required
        
      />
      <button
        type="button"
        onClick={() => getNextStep(1)}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => getNextStep(3)}
      >
        Next
      </button>
    </Fragment>
  );
};

const GetShippingOption = (props) => {
  const { getNextStep, name, setValidate } = props;
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
          name={props.name}
          select
          label="Shipping Options"
          helperText="Please select a shipping option"
          defaultValue={shippingOption}
          onChange={setValidate}
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
        onClick={() => getNextStep(1)}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => getNextStep(3)}
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