import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './progress.ass'

const styles = theme => ({
    root: {
        
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function Progress(props) {
    const { classes, className } = props;
    return (
        <div className={`${classes.root} ${className} 'progress'`}>
            <CircularProgress className={classes.progress} size={50} />
        </div>
    );
}



export default withStyles(styles)(Progress);
