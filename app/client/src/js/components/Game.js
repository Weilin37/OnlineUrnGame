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

        const final_code_message = () => {
          if (gameState.player === 'player1') {
            return(
                <div>
                    <Typography variant="h5" gutterBottom>
                        Congratulations, the game has ended.  Please visit this link to get paid:
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        <a href="https://app.prolific.co/submissions/complete?cc=8C0B9C23">Click Here To Complete</a>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        You may exit the browser.
                    </Typography>
                </div>
            )
          } else if (gameState.player === 'player2') {
            return (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Congratulations, the game has ended.  Please visit this link to get paid:
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        <a href="https://app.prolific.co/submissions/complete?cc=8C0B9C23">Click Here To Complete</a>
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        You may exit the browser.
                    </Typography>
                </div>
            )
          }
        }

        if (gameState.game_ended || (gameState.data[gameState.data.length-1]['round'] === '10' && gameState.data[gameState.data.length-1]['roundcomplete'] === true)) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={12} >
                        <Paper>
                            {final_code_message()}
                        </Paper>
                    </Grid>
                    <Grid item align="center" xs={12} >
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
                <div>waiting...if you are waiting too long then it is possible that the other player has left the game. Please restart and try a new game if the player has not returned within 5 minutes</div>
            )
        } else {
            return (
                <div>waiting...if you are waiting too long then it is possible that the other player has left the game. Please restart and try a new game if the player has not returned within 5 minutes</div>
            )
        }
    } else {
        return (
            <div>waiting...if you are waiting too long then it is possible that the other player has left the game. Please restart and try a new game if the player has not returned within 5 minutes</div>
        )
    }


}