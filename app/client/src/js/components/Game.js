import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, sendData, updateOnlineStatus, setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';

import Instructions from "./Instructions";
import Player1 from "./Player1";
import Player2 from "./Player2";

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

    // Functions for Instructions
    function handleInstructionsOpen() {
        dispatch(setInstructions(true));
    }

    // render component
    if (gameState.data.length > 0) {
        if (gameState.data[gameState.data.length-1]['player1_online'] && gameState.data[gameState.data.length-1]['player2_online']) {
            if (gameState.instructions) {
                return(<Instructions />)
            } else {
                if (gameState.player === 'player1') {
                    return (
                        <Grid container justify="center" alignItems="center" spacing={2}>
                            <Grid item align="center" xs={6} >
                                <button type="button" onClick={handleInstructionsOpen}>
                                    Open Instructions
                                </button>

                                <p>Room: {gameState.data[gameState.data.length-1]['room']}</p>
                                <p>You are: {gameState.player}</p>
                                <p>Your Alias: {gameState.alias}</p>
                                <p>Current Round: {gameState.data[gameState.data.length - 1]['round']}</p>
                                <p>Player 1 Online: {gameState.data[gameState.data.length-1]['player1_online'].toString()}</p>
                                <p>Player 2 Online: {gameState.data[gameState.data.length-1]['player2_online'].toString()}</p>
                                {gameState.data.map((el, i) => (
                                    <p>{el.data}</p>
                                ))}
                            </Grid>
                            <Grid item align="center" xs={6} >
                                <Player1 />
                            </Grid>
                        </Grid>
                    );
                } else if (gameState.player === 'player2') {
                    return (
                        <Grid container justify="center" alignItems="center" spacing={2}>
                            <Grid item align="center" xs={6} >
                                <button type="button" onClick={handleInstructionsOpen}>
                                    Open Instructions
                                </button>

                                <p>Room: {gameState.data[gameState.data.length-1]['room']}</p>
                                <p>You are: {gameState.player}</p>
                                <p>Your Alias: {gameState.alias}</p>
                                <p>Current Round: {gameState.data[gameState.data.length - 1]['round']}</p>
                                <p>Player 1 Online: {gameState.data[gameState.data.length-1]['player1_online'].toString()}</p>
                                <p>Player 2 Online: {gameState.data[gameState.data.length-1]['player2_online'].toString()}</p>
                                {gameState.data.map((el, i) => (
                                    <p>{el.data}</p>
                                ))}
                            </Grid>
                            <Grid item align="center" xs={6} >
                                <Player2 />
                            </Grid>
                        </Grid>
                    );
                }
            }
        } else if (gameState.both_online) {
            return (
                <div>waiting...</div>
            )
        } else {
            return (
                <div>waiting...</div>
            )
        }
    } else {
        return (
            <div> waiting... </div>
        )
    }


}