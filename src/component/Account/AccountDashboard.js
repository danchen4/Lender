import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actionUserApp from '../../store/actions/index';
// Material UI
import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// Misc.
import withNetworkErrorHandler from '../../hoc/withNetworkErrorHandler';
// CSS
import classModule from './AccountDashboard.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
  },
  header1: {
    padding: '1rem 0',
  },
  header2: {
    padding: '0.5rem',
  },
  box: {
    padding: '0.5rem',
  },
  paper: {
    maxWidth: '600px',
    margin: 'auto',
    borderRadius: '6px',
    padding: theme.spacing(2),
  },
  spacer: {
    padding: '24px 0',
  },
  card: {
    boxShadow: '0 5px 10px -3px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  cardContent: {
    padding: '0',
    '&:last-child': {
      paddingBottom: 8,
    },
  },
  button: {
    margin: '1rem',
    backgroundColor: theme.palette.primary.dark,
  },
  buttonProgress: {
    color: purple[200],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const AccountDashboard = (props) => {
  console.log('<AccountDashboard /> RENDER');
  const classes = useStyles();

  const dispatch = useDispatch();
  const tokenREDUX = useSelector((state) => state.auth.token);
  const userIdREDUX = useSelector((state) => state.auth.userId);
  const applicationsREDUX = useSelector((state) => state.userApps.applications);
  const errorREDUX = useSelector((state) => state.userApps.error);

  // console.log('<AccountDashboard /> applicationsREDUX', applicationsREDUX);

  useEffect(() => {
    if (!errorREDUX) {
      dispatch(actionUserApp.fetchApplication(tokenREDUX, userIdREDUX));
      dispatch(actionUserApp.fetchUser(tokenREDUX));
    }
  }, [dispatch, tokenREDUX, userIdREDUX, errorREDUX]);

  // const userValueArray = [];
  // for (let key in personalDataREDUX) {
  //   userValueArray.push({
  //     id: key,
  //     label: personalDataREDUX[key].label,
  //     value: personalDataREDUX[key].value,
  //   });
  // }

  const startApplication = () => {
    props.history.push({ pathname: '/personalinfo' });
  };

  return (
    <div className={classes.root}>
      <Box component="div" className={classes.box}>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="body1" component="p" color="primary" className={classes.header1}>
            Need to start a new application?
          </Typography>
          <Button variant="contained" color="secondary" onClick={startApplication}>
            Start a New Application
          </Button>

          <Typography variant="h5" component="h2" color="primary" className={classes.header1}>
            Applications
          </Typography>

          {applicationsREDUX.map((application, index) => {
            return (
              <div className={classes.spacer} key={index}>
                <Card variant="outlined" className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <div className={classModule.CardHeader}>
                      <Typography variant="h6" className={classes.header2}>
                        Application ID:{' '}
                        <span className={classModule.Darken}>{application.appNumber} </span>
                      </Typography>
                    </div>
                    <div className={classModule.CardBody}>
                      <div className={classModule.CardSection}>
                        <div className={classModule.CardSectionHeader}>Date Submitted:</div>
                        <div>{application.appDate}</div>
                      </div>
                      <div className={classModule.CardSection}>
                        <div className={classModule.CardSectionHeader}>Application Status:</div>
                        <div>Pending</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </Paper>
      </Box>
      <br />
    </div>
  );
};

export default withNetworkErrorHandler(AccountDashboard);
