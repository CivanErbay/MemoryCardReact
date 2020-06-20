import React from 'react'
import Grid from "@material-ui/core/Grid";
import Nav from "./Nav";
import Home from "./Home";
import Game from "./Game";
import About from "./About"
import {Route,Switch} from "react-router-dom";

export default function Landing() {

    return (
        <>
            <Nav/>
        <Grid
            container
            style={{
                backgroundImage: "url(" + "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80" + ")",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: "95vh",
            }}
        >
        <Switch>

            <Route path="/learn">
                <Game/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>

        </Grid>
        </>
        )

}