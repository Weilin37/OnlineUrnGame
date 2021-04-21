import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { createNewGame, updateOnlineStatus, joinGame, getNewGame, setAlias, setPlayer, setGameWaiting, setGameCreated } from "../features/gameSlice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CreateGame = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);

    // Get Open Games
    useEffect(() => {
      const interval = setInterval(() => {
        console.log(gameState.game_waiting);

        if (gameState.game_waiting) {
            batch(() => {
                dispatch(getNewGame("/api/get/newgame"));
                dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room));
            });
        } else {
            dispatch(getNewGame("/api/get/newgame"))
        }
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    // create new game
    function createNewGame() {
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
            <div>
                <p>Waiting for next player...</p>
                <p>Room code: {gameState.room}</p>
                <p>You are {gameState.player}</p>
                <p>Your alias: {gameState.alias}</p>
            </div>
        );
    } else {
        return(
            <div>
                <TextField id="alias" label="Enter Your Alias (Required)" variant="outlined" />
                <Button variant="contained" color="primary" onClick={createNewGame}>
                    Enter New Game
                </Button>
            </div>
        )
    }
}

export default CreateGame;