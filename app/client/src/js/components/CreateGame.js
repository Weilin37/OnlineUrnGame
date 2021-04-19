import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { createNewGame, getNewGame, setAlias, setPlayer } from "../features/gameSlice";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const CreateGame = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);

    // Get Open Games
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(getNewGame("/api/get/newgame"));
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    // create new game
    function createNewGame() {
        var alias = document.getElementById("alias").value;
        if (alias.length === 0) {alert('Enter your alias first'); return}
        var player1 = gameState.game_waiting_data['player1name'];
        var player2 = gameState.game_waiting_data['player2name'];
        var coin_toss = (Math.floor(Math.random() * 2) == 0);
        var player;

        if (coin_toss) {player = 'player1'}
        else {player = 'player2'}

        if (!player1 && !player2) {
            batch(() => {
                dispatch(getNewGame('/api/get/creategame?player='+player+'&alias='+alias));
                dispatch(setAlias(alias));
                dispatch(setPlayer(player));
            });
        }
    }

    // render component
    if (gameState.game_waiting === true) {
        return (
            null
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