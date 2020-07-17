import React from 'react';

import { Button, Typography, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { customTheme } from '../../theme/theme';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import { purple } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import WordCarousel from '../UI/CustomUI/WordCarousel/WordCarousel';

import classModule from './Home.module.css';
import ButtonTransition from '../UI/CustomUI/ButtonTransition/ButtonTransition';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: '30px',
  },
  header1: {
    padding: '1rem 0',
  },
  header2: {
    padding: '1rem 0',
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
  spacer: {
    margin: '24px 0',
  },
  button: {
    margin: '1rem',
    backgroundColor: customTheme.palette.primary.dark,
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const wordArray = ['Get What You Need', 'Today', 'And Pay Later'];

  return (
    <React.Fragment>
      <div className={classModule.Banner}>
        <div className={classModule.BannerCard}>
          <h3 className={classModule.BannerText}>Shop Now.</h3>
          <h3 className={classModule.BannerText}>Pay Later.</h3>
          <WordCarousel wordArray={wordArray} />
          <ButtonTransition>APPLY NOW</ButtonTransition>
        </div>
      </div>
      <div className={classModule.GridArea}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classModule.CardHeader}>
                  <Typography variant="h6" className={classes.header2}>
                    <span className={classModule.Darken}>Learn More </span>
                  </Typography>
                </div>
                <div className={classModule.CardBody}>
                  <div className={classModule.CardSection}>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consectetur
                      ratione nemo dicta quo. Deleniti sunt, fuga ipsum vitae nostrum earum officiis
                      autem mollitia, perspiciatis assumenda fugiat expedita voluptatum quasi.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classModule.CardHeader}>
                  <Typography variant="h6" className={classes.header2}>
                    <span className={classModule.Darken}>FAQ </span>
                  </Typography>
                </div>
                <div className={classModule.CardBody}>
                  <div className={classModule.CardSection}>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis consectetur
                      ratione nemo dicta quo. Deleniti sunt, fuga ipsum vitae nostrum earum officiis
                      autem mollitia, perspiciatis assumenda fugiat expedita voluptatum quasi.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Home;
