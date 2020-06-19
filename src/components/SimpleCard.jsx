import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard({vocab}) {

    const classes = useStyles();

    const [cardState, setCardState] = useState(false)


   function handleFlip() {
        console.log(cardState.bool)
     !cardState ? setCardState(true): setCardState(false)
   }



    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title}>
                    {cardState? vocab.name : <p>Hidden</p> }
                </Typography>

                <Typography variant="body2" component="p">
                    {cardState ? vocab.message : <p>Hidden</p>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleFlip}>Learn More</Button>
            </CardActions>
        </Card>
    );
}
