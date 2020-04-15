import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../hooks/useStylesApp';
import { PropsJob } from '../interfaces';
import { Grid } from '@material-ui/core';

const Job = (props: PropsJob) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={4} md={3} className={classes.card}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        className={classes.card_media}
                        image={props.job.company_logo}
                        title={props.job.title}
                        component="img"
                        alt={props.job.title}
                        src={props.job.company_logo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.card_title}>
                            {props.job.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.card_location}>
                            {props.job.location}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.card_actions}>
                    <Button size="small" variant="contained" color="primary" href={props.job.company_url} target="_blank">
                        Postuler
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Job;