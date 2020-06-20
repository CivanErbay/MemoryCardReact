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
        flexDirection: 'row',
        padding: theme.spacing(10),
    },


}));

export default function CenteredGrid() {
    const classes = useStyles();

    const [vocabs, setVocabs] = useState([])  //setze den useState mit den Daten aus fetchVocabs()

    // die handleFlip Methode wird zwar hier im Parent-Element definiert (Game.jsx) wird aber im Child-Element aufgerufen (SimpleCard.jsx)
    const handleFlip = id => {      //Je nachdem welche Karte aufgerufen wird, wird die id vergeben (da jede Karte eine eindeutige id aufweist)
        const updatedVocabs = vocabs.map(vocab => {  // es wird über vocabs gemapped und nur die Karte, auf die man gedrückt hat wird der flipState verändert, mithilfe des id-Abgleichs
            if (vocab.id === id)                       // der veränderte Wert wird als Array zurückgeben (aufgrund von .map()), d.h. der Array ist bis auf eine Stelle gleich
            {vocab.flipState = !vocab.flipState}
            return vocab
        })
        setVocabs(updatedVocabs)                // der veränderte Array wird das neue vocabs durch Aufruf der setVocabs Methode
    }

    // diese useEffect wird ausgeführt vor dem Rendern und nur EINMALIG
    useEffect(async () => {  //fetchVocabs in Kombination mit useEffect zieht sich alle Daten beim ersten Rendern
        let vocabs = await fetchVocabs()    //speichert alles in vocabs
        vocabs = vocabs.map(v => {          // mappt über jedes Element in vocabs
            return {...v, flipState: false} // "unwrapped" jedes einzelne Element UND addet eine weitere Property: flipstate mit Initialwert false
        })
        setVocabs(vocabs)                   //ruft die Methode setVocabs von useState auf (zeile 23) und addet die gefetchten Daten (welche mit flipState erweitert wurden)
    },[])                             // [] läuft nur einmal beim Start/ersten Render


    //diese useEffect-Methode wird ausgeführt, wenn vocabs verändert wird (vocabs wird eigentlich nur verändert, wenn handleFlip ausgeführt)
    useEffect(()=> {     //d.h. wenn handleFlip ausgeführt wird (in SimpleCard.jsx), dann wird immer auch dieser useEffect aufgerufen
        for(let i = 0; i < vocabs.length; i++) {        //Loop 1
            for(let j = i+1; j < vocabs.length; j++) {  //Loop 2
                if(vocabs[i].flipState === true && vocabs[j].flipState === true &&  vocabs[i].message === vocabs[j].message ) {
                    console.log("Oh yes oh yes") //Wenn zwei Karten true sind (also nicht versteckt sind, bzw "geöffnet wurden) und diese GLEICHZEITIG diesselbe message (Vergleichswert),
                    //dann gibt es ein match! und die Erfolgsmeldung "Oh yes oh yes" erfolgt in der Konsole! - MEMORY
                }
            }
        }
    } , [vocabs])    // benutzt diesen useEffect ausschließlich, wenn vocabs verändert werden.

    return (
        <div className={classes.root}>



                    {vocabs.map(vocab => <SimpleCard vocab={vocab} handleFlip={handleFlip}/> )
                    }


        </div>
    );
}

