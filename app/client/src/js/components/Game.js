import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { getData, sendData } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';

export const Game = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);

    function keyPress(e) {
        if(e.keyCode === 13){
            if (e.target.value !== "") {
                var id = e.target.id;
                var text = e.target.value;
                var room = gameState.room;
                var endpoint = '/api/get/sendgame?player='+id+"&room="+room+"&data="+text;
                dispatch(sendData(endpoint));
            }
        }
    }

    // Effects
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(getData("/api/get/readgame?room="+gameState.room));
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    // render component
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={3} >
                    Player1
                    <TextField id="player1" onKeyDown={keyPress} label="Outlined" variant="outlined" />
                </Grid>
                <Grid item align="center" xs={6} >
                    Game
                    {gameState.data.map((el, i) => (
                        <p>{el.data}</p>
                    ))}
                </Grid>
                <Grid item align="center" xs={3} >
                    Player2
                    <TextField id="player2" onKeyDown={keyPress} label="Outlined" variant="outlined" />
                </Grid>
            </Grid>
        );

}