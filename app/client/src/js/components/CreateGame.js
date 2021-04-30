import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { createNewGame, updateWaitingRoom, updateOnlineStatus, resumeGame, joinGame, getNewGame, setAlias, setPlayer, setGameWaiting, setGameCreated } from "../features/gameSlice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

const CreateGame = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    // state
    const gameState = useSelector(state => state.game);
    const [timer, setTimer] = React.useState(0);

    const interval = setTimeout(() => {
        setTimer(timer+1);
    }, 1000);

    // Get Open Games
    useEffect(() => {
        if (gameState.game_waiting) {
            batch(() => {
                dispatch(updateWaitingRoom("/api/get/updatewaitingroom?room="+gameState.room));
                dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room+'&round=1'));
            });
        } else {
            dispatch(getNewGame("/api/get/newgame"));
        }
    }, [timer]);


    // Resume game
    function handleResumeGame() {
        var alias = document.getElementById("resume_alias").value;
        var room = document.getElementById("resume_room").value;

        if (alias.length === 0) {alert('Enter your alias first'); return}
        if (room.length === 0) {alert('Enter your room code first'); return}

        batch(() => {
            dispatch(setAlias(alias));
            dispatch(resumeGame('/api/get/resumegame?room='+room+'&alias='+alias));
        });
    }

    // create new game
    function handleCreateNewGame() {
        var alias = document.getElementById("alias").value;
        if (alias.length === 0) {alert('Enter your alias first'); return}
        var room;
        var player1;
        var player2;

        if (gameState.game_waiting_data.length>0) {
            room = gameState.game_waiting_data[0]['room'];
            player1 = gameState.game_waiting_data[0]['player1name'];
            player2 = gameState.game_waiting_data[0]['player2name'];
        }

        var coin_toss = (Math.floor(Math.random() * 2) === 0);
        var player;

        if (!player1 && !player2) {
            if (coin_toss) {player = 'player1'}
            else {player = 'player2'}

            batch(() => {
                dispatch(getNewGame('/api/get/creategame?player='+player+'&alias='+alias));
                dispatch(setAlias(alias));
                dispatch(setPlayer(player));
                dispatch(setGameWaiting(true));
            });
        } else if (player1.length > 0 && player2 === '') {
            player = 'player2'

            batch(() => {
                dispatch(joinGame('/api/get/joinGame?player='+player+'&alias='+alias+'&room='+room));
                dispatch(setAlias(alias));
                dispatch(setPlayer(player));
                dispatch(setGameWaiting(true));
            });
        } else if (player1 === '' && player2.length >0) {
            player = 'player1'

            batch(() => {
                dispatch(joinGame('/api/get/joinGame?player='+player+'&alias='+alias+'&room='+room));
                dispatch(setAlias(alias));
                dispatch(setPlayer(player));
                dispatch(setGameWaiting(true));
            });
        }
    }

    // render component
    if (gameState.game_waiting === true) {
        return (
            <Grid container spacing={2}>
                <Grid item align="center" xs={12} >
                    <Typography variant="h5">Waiting for next player to join...</Typography>
                </Grid>
                <Grid item align="center" xs={12} >
                    <Typography variant="h5">Room code (Write this down): {gameState.room}</Typography>
                </Grid>
                <Grid item align="center" xs={12} >
                    <Typography variant="h5">Your alias (Write this down): {gameState.alias}</Typography>
                </Grid>
                <Grid item align="center" xs={12} >
                    <Typography variant="h5">You will join the game as {gameState.player}</Typography>
                </Grid>
            </Grid>
        );
    } else {
        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid item align="center" xs={12} >
                            <Typography className={classes.spacing} variant="subtitle1">
                                If you are a new player, the please enter your alias and press the left button here
                            </Typography>
                        </Grid>
                        <Grid item align="center" xs={12} >
                            <TextField id="alias" label="Enter Your Alias (Required)" variant="outlined" />
                        </Grid>
                        <Grid item align="center" xs={12} >
                            <Button className={classes.spacing} variant="contained" color="primary" onClick={handleCreateNewGame}>
                                Enter New Game
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Grid item align="center" xs={12} >
                            <Typography className={classes.spacing} variant="subtitle1">
                                If you are a returning player, then please enter your room code and the alias you used and press the right button here
                            </Typography>
                        </Grid>
                        <Grid item align="center" xs={12} >
                            <TextField id="resume_alias" label="Enter Your Alias (Required)" variant="outlined" />
                            <TextField id="resume_room" label="Enter Your Room Code (Required)" variant="outlined" />
                        </Grid>
                        <Grid item align="center" xs={12} >
                            <Button className={classes.spacing} variant="contained" color="primary" onClick={handleResumeGame}>
                                Resume Game
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default CreateGame;