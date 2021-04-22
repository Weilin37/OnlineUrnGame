import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, sendData, updateOnlineStatus } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';

export const Game = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    const [timer, setTimer] = React.useState(0);

    const interval = setTimeout(() => {
        setTimer(timer+1);
    }, 1000);

    // Read Game State
    useEffect(() => {
        batch(() => {
            dispatch(getData("/api/get/readgame?room="+gameState.room));
            dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room));
        });
    }, [timer]);

    // Enter decision
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

    // render component
    if (gameState.data.length > 0) {
        if (gameState.data[0]['player1_online'] && gameState.data[0]['player2_online']) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={3} >
                        Player1
                        <TextField id="player1" onKeyDown={keyPress} label="Outlined" variant="outlined" />
                    </Grid>
                    <Grid item align="center" xs={6} >
                        <p>Room: {gameState.data[0]['room']}</p>
                        <p>Current Round: {gameState.data[gameState.data.length - 1]['round']}</p>
                        <p>Player 1 Online: {gameState.data[0]['player1_online'].toString();}</p>
                        <p>Player 2 Online: {gameState.data[0]['player2_online'].toString();}</p>
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
        } else {
            <div> Not all players online - waiting...</div>
        }
    } else {
        return (
            <div> waiting... </div>
        )
    }


}