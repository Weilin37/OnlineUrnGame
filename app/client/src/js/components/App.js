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
        if (gameState.data.length > 0) {
            if (gameState.data[0]['player1_online'] && gameState.data[0]['player2_online']) {
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
                            Not all players are online
                        </Grid>
                    </Grid>
                )
            }

        }
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