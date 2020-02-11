import React, { createRef, Fragment, useState } from 'react';
import serialize from 'form-serialize';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const addressKeys = [
  'name',
  'street',
  'city',
  'state',
  'zip'
];
const names = [
  'from',
  "to",
  'weight',
  'shippingOption'
];

const flex = {
  display: 'flex'
};
const justifyContentCenter = {
  justifyContent: 'center'
};
const marginTop = {
  marginTop: '15px'
};
const marginLeft = {
  marginLeft: '10px'
};
const stylesObject = {
  boxContainer: {
    ...flex,
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    ...marginTop
  },
  flex,
  inputBoxCenter: {
    ...flex,
    ...justifyContentCenter
  },
  marginTop,
  marginLeft
}

const GetSenderAddress = ({ data, name, getNextStep }) => {
  const formRef = createRef();
  const styles = makeStyles(stylesObject);
  const classes = styles();
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
        className={classes.marginLeft}
        defaultValue={data.state}
        label="State"
        name="state"
        required
      />
      <TextField
        className={classes.marginLeft}
        defaultValue={data.zip}
        label="Zip"
        name="Zip"
        required
      />
      <Box
        className={classes.boxContainer}
      >
        <Button
          color="primary"
          onClick={(e) => {
            const data = serialize(formRef.current, { hash: true });
            if (Object.keys(data).length === addressKeys.length) {
              if (Object.keys(data).length === addressKeys.length) {
                e.preventDefault();
                getNextStep({
                  type: 'GET_NEXT_STEP',
                  payload: { 'from': data, nextStep: 1, stepCompleted: 'from' }
                });
              }      
            }        
          }}
          variant="contained"
          type="submit"
        >
          Next
        </Button>
      </Box>
      
    </form>
  );
};

const GetReceiverAddress = ({ data, name, getNextStep }) => {
  const formRef = createRef();
  const styles = makeStyles(stylesObject);
const classes = styles();
  return (
    <form
      data={data}
      name={name}
      ref={formRef}
    >
      <h2>Enter the receiver's address</h2>
      <TextField
        defaultValue={data.name}
        fullWidth
        label="Name"
        name="name"
        required
      />
      <TextField
        defaultValue={data.street}
        fullWidth
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
        className={classes.marginLeft}
        defaultValue={data.state}
        label="State"
        name="state"
        required
      />
      <TextField
        className={classes.marginLeft}
        defaultValue={data.zip}
        label="zip"
        name="zip"
        required
      />
      <Box
        className={classes.boxContainer}
      >
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          onClick={() => {
            const data = serialize(formRef.current, { hash: true });
            if (Object.keys(data).length === addressKeys.length) {
              getNextStep({
                type: 'GET_NEXT_STEP',
                payload: { 'to': data, nextStep: 0, stepCompleted: 'to' }
              });
            }       
          }}
        >
          Prev
        </Button>
        <Button
        color="primary"
        variant="contained"
          onClick={() => {
            const data = serialize(formRef.current, { hash: true });
            if (Object.keys(data).length === addressKeys.length) {
              getNextStep({
                type: 'GET_NEXT_STEP',
                payload: { 'to': data, nextStep: 2, stepCompleted: 'to' }
              });
            }       
          }}
          type="submit"
        >
          Next
        </Button>
      </Box>
      
    </form>
  );
};

const GetWeight = ({ data, name, getNextStep }) => {
  const ref = createRef();
  const styles = makeStyles(stylesObject);
  const classes = styles();
  return (
    <div>
      <h2>Enter the Item Weight</h2>
      <Box
        className={classes.inputBoxCenter}
      >
<  TextField
        defaultValue={data}
        label="Weight"
        name={name}
        required
        inputRef={ref}
        type="number"
      />
      </Box>
      <Box
        className={classes.boxContainer}
      >
      <Button
        color="secondary"
        variant="contained"
        type="button"
        onClick={() => {
          if (!isNaN(parseInt(ref.current.value, 10))) {
            getNextStep({
              type: 'GET_NEXT_STEP',
              payload: {
                'weight': parseInt(ref.current.value, 10),
                nextStep: 1,
                stepCompleted: 'weight'
              }
            })
          }
        }}
      >
        Prev
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={() => {
          console.log(ref.current.value);
          if (!isNaN(parseInt(ref.current.value, 10))) {
            getNextStep({
              type: 'GET_NEXT_STEP',
              payload: {
                'weight': parseInt(ref.current.value, 10),
                nextStep: 3,
                stepCompleted: 'weight'
              }
            })
          }
        }}
      >
        Next
      </Button>
        
      </Box>
    </div>
  );
};

const GetShippingOption = ({ data, name, getNextStep }) => {
  const ref = createRef();
  const { shippingOption: initShippingOption, weight } = data;
  const [ shippingOption, setOption ] = useState(initShippingOption);
  const ShippingOption = {
    ground: 1,
    priority: 2
  };
  const styles = makeStyles(stylesObject);
  const classes = styles();
  const calcShipping = (w, so) => {
    const shippingRate = 0.40;
    const cost = parseInt(so, 10) === 1 ? 1 : 1.5;
    return w * shippingRate * cost;
  };
  return (
    <Fragment>
      <h2>Choose your Shipping Option</h2>
      <Box
        className={classes.inputBoxCenter}
      >
<TextField
          name={name}
          select
          label="Shipping Options"
          helperText="Please select a shipping option"
          value={shippingOption}
          onChange={e => setOption(parseInt(e.target.value, 10))}
          inputRef={ref}
        >
          {Object.entries(ShippingOption).map(([key, val], i) => {
            return (
              <option key={key} value={val}>
                {key === 'ground' ? 'Ground' : 'Priority'}
              </option>
            );
          })} 
        </TextField>
        <div className={classes.marginLeft}>
          <p>{`Potential Weight: ${weight}`}</p>
          <p>{`Potential Cost: $${calcShipping(weight, shippingOption )}`}</p>
        </div>
      </Box>
      <Box
        className={classes.boxContainer}
      >
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={() => {
            getNextStep({
              type: 'GET_NEXT_STEP',
              payload: {
                shippingOption: parseInt(ref.current.value, 10),
                nextStep: 2,
                stepCompleted: 'shippingOption'
              }
            })
          }}
        >
          Prev
        </Button>
        <Button
        color="primary"
        variant="contained"
          type="button"
          onClick={() => {
            getNextStep(
              {
                type: 'GET_NEXT_STEP',
                payload: {
                  shippingOption: parseInt(ref.current.value, 10),
                  nextStep: 4,
                  stepCompleted: true
                }
              }
            );
          }}
        >
          Next
        </Button>
      </Box>
    </Fragment>
  );
};

const Confirm = ({ data, name, getNextStep, onComplete }) => {
  const styles = makeStyles(stylesObject);
  const classes = styles();
  return (
    <div className="steps">Confirm
      <Box
        className={classes.boxContainer}
      >
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={() => {
            getNextStep({
              type: 'GET_NEXT_STEP',
              payload: {
                nextStep: 3,
                stepCompleted: ''
              }
            })
          }}
        >
          Prev
        </Button>
        <Button
        color="primary"
        variant="contained"
          type="button"
          onClick={() => {
            
            onComplete(data);
            // getNextStep(
            //   {
            //     type: 'GET_NEXT_STEP',
            //     payload: {
            //       shippingOption: parseInt(ref.current.value, 10),
            //       nextStep: 4,
            //       stepCompleted: true
            //     }
            //   }
            // );
             
          }}
        >
          Confirm
        </Button>
      </Box>
    </div>
  );
};

const Steps = {
  GetSenderAddress,
  GetReceiverAddress,
  GetWeight,
  GetShippingOption,
  Confirm
};

export default Steps;