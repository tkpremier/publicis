import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { WizardContext } from './';

export const GetSenderAddress = (props) => {
  const { from } = useContext(WizardContext);
  const data = from;
  return (
    <form
      data={data}
    >
      <TextField
        defaultValue={data.name}
        label="Name"
        name="name"
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
      <input type="text" placeholder="name" value={data.name}/>
    </form>
  );
};

export const GetReceiverAddress = (props) => {
  const { to } = useContext(WizardContext);
  const data = to;
  return (
    <form
      data={data}
    >
      <TextField
        defaultValue={data.name}
        label="Name"
        name="name"
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
      <input type="text" placeholder="name" value={data.name}/>
    </form>
  );
};

export const GetWeight = (props) => {
  return (
    <div className="steps">Weight</div>
  );
};

export const GetShippingOption = (props) => {
  return (
    <div className="steps">Shipping Option</div>
  );
};

export const Confirm = (props) => {
  return (
    <div className="steps">Confirm</div>
  );
};