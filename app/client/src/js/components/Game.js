import React, { useEffect } from "react";
import MaterialTable from "material-table";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, sendData, updateOnlineStatus, setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Instructions from "./Instructions";
import Player1 from "./Player1";
import Player2Status from "./Player2Status";
import Player2Holistic from "./Player2Holistic";

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
            dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.current_round));
        });
    }, [timer]);

    // Functions for Instructions
    function handleInstructionsOpen() {
        dispatch(setInstructions(true));
    }

    // render component
    if (gameState.data.length > 0) {
        var tabledata = [];
        gameState.data.forEach(function(v) {
            tabledata.push({
                'round':v.round,
                'player1action':v.player1action,
                'player2action':v.player2action,
                'player1earnings':v.player1earnings,
                'player2earnings':v.player2earnings,
                'player1earnings_difference':v.player1earnings_difference,
                'player2earnings_difference':v.player2earnings_difference,
                'drawn_ball':v.drawn_ball
            })
        });

        if (gameState.game_ended) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={12} >
                        <Paper>
                            if (gameState.player == 'player1') {
                                return(
                                    <Typography variant="h4" gutterBottom>
                                        Congratulations, the game has ended.  Please copy this final code and submit it to MTurk to get paid: {gameState.data[gameState.data.length-1]['finish_code_player1']}. You may exit the browser.
                                    </Typography>
                                )
                            } else if (gameState.player == 'player2') {
                                return (
                                    <Typography variant="h4" gutterBottom>
                                        Congratulations, the game has ended.  Please copy this final code and submit it to MTurk to get paid: {gameState.data[gameState.data.length-1]['finish_code_player2']}. You may exit the browser.
                                    </Typography>
                                )
                            }
                        </Paper>
                    </Grid>
                    <Grid item align="center" xs={3} >
                        <Paper>
                            <Typography variant="subtitle1" gutterBottom>
                                You are: {gameState.player}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Room (Write this down): {gameState.data[gameState.data.length-1]['room']}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Alias (Write this down): {gameState.alias}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Current Round: {gameState.data[gameState.data.length - 1]['round']}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Player 1 Online: {gameState.data[gameState.data.length-1]['player1_online'].toString()}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Player 2 Online: {gameState.data[gameState.data.length-1]['player2_online'].toString()}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item align="center" xs={9} >
                        <MaterialTable
                            columns={[
                                { title: "Round", field: "round" },
                                { title: "Player 1 Decision", field: "player1action" },
                                { title: "Player 2 Decision", field: "player2action"},
                                { title: "Ball Drawn", field: "drawn_ball"},
                                { title: "Player 1 Bank", field: "player1earnings"},
                                { title: "Player 1 Earnings", field: "player1earnings_difference"},
                                { title: "Player 2 Bank", field: "player2earnings"},
                                { title: "Player 2 Earnings", field: "player2earnings_difference"},
                            ]}
                            data={tabledata}
                            options={{
                              paging: false,
                              search: false,
                              draggable: false,
                              showFirstLastPageButtons: false,
                              editable:'never',
                              disableClick: true,
                              sorting: false
                            }}
                            title="Scorecard"
                        />
                    </Grid>
                </Grid>
            );
        } else if (gameState.data[gameState.data.length-1]['player1_online'] && gameState.data[gameState.data.length-1]['player2_online']) {
            if (gameState.instructions) {
                return(<Instructions />)
            } else if (gameState.player === 'player1') {
                tabledata.forEach(function(v) {
                    delete v.player2earnings;
                });
                return (
                    <Grid container justify="center" alignItems="center" spacing={2}>
                        <Grid item align="center" xs={12} >
                            <Player1 />
                        </Grid>
                        <Grid item align="center" xs={8} >
                            <MaterialTable
                                columns={[
                                    { title: "Round", field: "round" },
                                    { title: "Player 1 Decision", field: "player1action" },
                                    { title: "Player 2 Decision", field: "player2action"},
                                    { title: "Ball Drawn", field: "drawn_ball"},
                                    { title: "Your Bank", field: "player1earnings"},
                                    { title: "Earnings that round", field: "player1earnings_difference"}
                                ]}
                                data={tabledata}
                                options={{
                                  paging: false,
                                  search: false,
                                  draggable: false,
                                  showFirstLastPageButtons: false,
                                  editable:'never',
                                  disableClick: true,
                                  sorting: false
                                }}
                                title="Scorecard"
                            />
                        </Grid>
                    </Grid>
                );
            } else if (gameState.player === 'player2') {
                tabledata.forEach(function(v) {
                    delete v.player1earnings;
                });

                if (gameState.treatment === 'status_quo') {
                    return (
                        <Grid container justify="center" alignItems="center" spacing={2}>
                            <Grid item align="center" xs={12} >
                                <Player2Status />
                            </Grid>
                            <Grid item align="center" xs={8} >
                                <MaterialTable
                                    columns={[
                                        { title: "Round", field: "round" },
                                        { title: "Player 1 Decision", field: "player1action" },
                                        { title: "Player 2 Decision", field: "player2action"},
                                        { title: "Ball Drawn", field: "drawn_ball"},
                                        { title: "Your Bank", field: "player2earnings"},
                                        { title: "Earnings that round", field: "player2earnings_difference"}
                                    ]}
                                    data={tabledata}
                                    options={{
                                      paging: false,
                                      search: false,
                                      draggable: false,
                                      showFirstLastPageButtons: false,
                                      editable:'never',
                                      disableClick: true,
                                      sorting: false
                                    }}
                                    title="Scorecard"
                                />
                            </Grid>
                        </Grid>
                    );
                } else if (gameState.treatment === 'holistic') {
                    return (
                        <Grid container justify="center" alignItems="center" spacing={2}>
                            <Grid item align="center" xs={12} >
                                <Player2Holistic />
                            </Grid>
                            <Grid item align="center" xs={8} >
                                <MaterialTable
                                    columns={[
                                        { title: "Round", field: "round" },
                                        { title: "Player 1 Decision", field: "player1action" },
                                        { title: "Player 2 Decision", field: "player2action"},
                                        { title: "Ball Drawn", field: "drawn_ball"},
                                        { title: "Your Bank", field: "player2earnings"},
                                        { title: "Earnings that round", field: "player2earnings_difference"}
                                    ]}
                                    data={tabledata}
                                    options={{
                                      paging: false,
                                      search: false,
                                      draggable: false,
                                      showFirstLastPageButtons: false,
                                      editable:'never',
                                      disableClick: true,
                                      sorting: false
                                    }}
                                    title="Scorecard"
                                />
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