import React from "react";
import NavBar from "./NavBar";
import { Game } from "./Game";
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import CreateGame from "./CreateGame";

const App = () => {

    // state
    const gameState = useSelector(state => state.game);

    if (gameState.game_created === true && gameState.game_waiting === false) {
        return(
            <Grid container justify="center" alignItems="center" spacing={2}>
                <NavBar />
                <Grid item align="center" xs={12} >
                    <Game />
                </Grid>
            </Grid>
        )
    } else {
        return(
            <Grid container justify="center" alignItems="center" spacing={2}>
                <NavBar />
                <Grid item align="center" xs={12} >
                    <CreateGame />
                </Grid>
            </Grid>
        )
    }

};

export default App;