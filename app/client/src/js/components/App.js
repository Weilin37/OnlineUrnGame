import React from "react";
import NavBar from "./NavBar";
import { Game } from "./Game";
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";
import CreateGame from "./CreateGame";
import Quiz from "./Quiz";
import Typography from '@material-ui/core/Typography';

const App = () => {

    // state
    const gameState = useSelector(state => state.game);

    if (gameState.game_created === true && gameState.game_waiting === false && gameState.quiz_taken) {
        return(
            <div>
                <NavBar />
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={12} >
                        <Game />
                    </Grid>
                </Grid>
            </div>
        )
    } else if (gameState.game_created === true && gameState.game_waiting === false && !gameState.quiz_taken) {
        return(
            <div>
                <NavBar />
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={12} >
                        <Quiz />
                    </Grid>
                </Grid>
            </div>
        )
    } else {
        return(
            <div>
                <NavBar />
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={12} >
                        <Typography variant="h2" gutterBottom>
                            Welcome
                        </Typography>
                    </Grid>
                    <Grid item align="center" xs={12} >
                        <CreateGame id="creategame"/>
                    </Grid>
                </Grid>
            </div>
        )
    }

};

export default App;