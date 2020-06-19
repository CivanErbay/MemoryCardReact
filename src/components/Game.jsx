import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SimpleCard from "./SimpleCard";
import {fetchVocabs} from "../utils/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: 4,
        padding: theme.spacing(10),
    }

}));

export default function CenteredGrid() {
    const classes = useStyles();

    const [vocabs, setVocabs] = useState([])



    useEffect(() => {  //fetchVocabs in Kombination mit useEffect zieht sich alle Daten beim ersten Rendern
        fetchVocabs().then(setVocabs)
    },[])

    return (
        <div className={classes.root}>


                <Grid item xs={2}>
                    {vocabs.map(vocab => <SimpleCard className={classes.cardItem} vocab={vocab}/> )
                    }
                </Grid>

        </div>
    );
}

