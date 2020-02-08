import React, { useContext, useState, } from 'react';
import TextField from '@material-ui/core/TextField';
import { WizardContext } from './';

export const GetSenderAddress = (props) => {
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { from } = formContext;
  const data = from;
  return (
    <form
      data={data}
    >
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
      <input type="text" placeholder="name" value={data.name}/>
    </form>
  );
};

export const GetReceiverAddress = (props) => {
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { to } = formContext;
  const data = to;
  return (
    <form
      data={data}
    >
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
      <input type="text" placeholder="name" value={data.name}/>
    </form>
  );
};

export const GetWeight = (props) => {
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { weight } = formContext;
  return (
    <TextField
      defaultValue={weight}
      label="Weight"
      name="weight"
      onChange={handleUpdates}
      required
    />
  );
};

export const GetShippingOption = (props) => {
  const { formContext, handleUpdates } = useContext(WizardContext);
  const { shippingOption } = formContext;
  const ShippingOption = {
    ground: 1,
    priority: 2
  };
  return (
    <div className="shipping-options">
      <TextField
        select
        label="Shipping Options"
        helperText="Please select a shipping option"
        defaultValue={shippingOption}
        onChange={handleUpdates}
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
  );
};

export const Confirm = (props) => {
  return (
    <div className="steps">Confirm</div>
  );
};