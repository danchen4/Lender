import React, {useState} from 'react';

import { Button, Typography, List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
  },
  list: {
    margin: 'auto',
    width: '500px',
    textAlign: 'center',
  },
  listItem: {
    textAlign: 'center',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  }
});


const FormConfirm = (props) => {
  console.log('<FormPersonal /> RENDER')

  const classes = useStyles();

  const { values }  = props;

  const nextStep = () => {
    props.history.push({ pathname: '/success' });
  };

  const prevStep = () => {
    props.history.push({ pathname: '/contactinfo' });
  };

  const valueArray = [];
  for (let key in values) {
    valueArray.push({
      id: key,
      value: values[key]
    })
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="secondary">Confirm Your Information</Typography>
      <List className={classes.list}>
        <ListSubheader component="div">Your Information</ListSubheader>  
        {valueArray.map(item=>{
          return (
          <ListItem key={item.id} component="div" className={classes.listItem}>
            <ListItemText 
              primary={item.id}
              secondary={item.value} />
          </ListItem>
          );
        })}
      </List>
        <br />
        <br />
        <Button 
        className={classes.button}
        variant="contained" 
        color="secondary" 
        size="large"
        onClick={prevStep}>Back</Button> 
        <Button 
        variant="contained" 
        color="secondary" 
        size="large"
        onClick={nextStep}>Confirm</Button> 

    </div>
  )
}

export default FormConfirm;