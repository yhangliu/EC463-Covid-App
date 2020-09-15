import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Info.module.css';

const Info = (stats) => {

    console.log("check4", stats.data.lastUpdateEt);
    return (
        <div className={styles.container}>
            <Grid container={2} justify="center">
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Daily Update (MA)</Typography>
                        <Typography varaint="h5"> Last Update Time: {stats.data.lastUpdateEt} </Typography>
                        <Typography varaint="h5"> Positive: {stats.data.positiveIncrease} </Typography>
                        <Typography varaint="h5"> Negative: {stats.data.negativeIncrease} </Typography>
                        <Typography varaint="h5"> Currently Hospitalized: {stats.data.hospitalizedCurrently} </Typography>
                        <Typography varaint="h5"> New Hospitalizations: {stats.data.hospitalizedIncrease} </Typography>
                        <Typography varaint="h5"> Deaths: {stats.data.deathIncrease} </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Total Stats (MA)</Typography>
                        <Typography varaint="h5"> Positive: {stats.data.positive} </Typography>
                        <Typography varaint="h5"> Negative: {stats.data.negative} </Typography>
                        <Typography varaint="h5"> Hospitalized: {stats.data.hospitalized} </Typography>
                        <Typography varaint="h5"> Deaths: {stats.data.death} </Typography>
                    </CardContent>
                </Grid>
            </Grid>
         </div>
                
    )
}

export default Info;