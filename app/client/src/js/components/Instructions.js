import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

const Instructions = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    const [instructionsPage, setInstructionsPage] = React.useState(1);

    // Functions for Instructions
    function handleInstructionsClose() {
        dispatch(setInstructions(false));
    }

    function handleInstructionsPageChange(event, value) {
        setInstructionsPage(value);
    }

    // render component
    if (gameState.player === 'player1') {
        if (instructionsPage === 1) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>

                        <p>OVERVIEW</p>
                        <p>Welcome to this study of decision-making.</p>

                        <p>The study will take between 1 and 1.5 hours including the instructions.
                        The instructions are simple, and if you follow them carefully, you can earn money in addition to your $5 show-up payment.
                        Besides your show-up payment, you will be given a “Bank” of $5 to which additional earnings will be added and from which penalties will be deducted.
                        The show-up payment and your final “Bank” balance  will be paid to you after the study ends. </p>

                        <p>You will be randomly assigned a role as either Player 1 or Player 2.
                        You will play 10 rounds of a game with another participant.</p>

                        <p>At the beginning of each round, Player 1 will receive a jar and Player 2 will receive 2 urns.
                        The jar and the urns each have 100 balls at the beginning of each round, each ball is either blue or red.</p>

                        <p>Each round of the game goes roughly as follows:</p>

                        <ul>
                            <li>Player 1 choose whether to offer his/her jar to Player 2.
                            The round ends if Player 1 choose not to offer Player 2 the jar.</li>
                            <li>If Player 1 offered the jar to Player 2, Player 2 makes a decision to either
                            (1) decline the jar or accept the jar and
                            (2)/(3) mix all the balls from the jar into one of his/her urns</li>
                        </ul>

                        <p>The computer takes one draw from each one of Player 2’s urns at the end of each round.
                        A total of 2 balls are drawn each round.
                        After each draw, the drawn ball’s color will be recorded and the ball replaced into the urn from which it was drawn.
                        The draws will be made at the end of the round.
                        If Player 2 mixed the balls in a jar into one of his/her urns, the draw from that urn is made after the balls from the jar were mixed in. </p>

                        <p>Your earnings will depend on various factors including your decisions,
                        the decisions of the other Player,
                        and how many blue balls were drawn from Player 2’s urns at the end of the round.</p>

                    </Grid>
                    <Grid item align="center" xs={12} >
                        <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                    </Grid>
                </Grid>
            );
        } else if (instructionsPage === 2) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>

                        <p>Instructions for Player 1 (screen 1 of 2)</p>
                        <p>In this study, you have been assigned the role of Player 1.
                        You have been randomly matched with another participant who will be in the role of Player 2.
                        Your earnings will depend on your decisions, as well as on the decisions of  Player 2.
                        There will be 10 rounds of this study. For all 10 rounds you will be paired with the same Player 2, who will participate at the same time as you.
                        </p>
                    </Grid>
                    <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                </Grid>
            );
        } else if (instructionsPage === 3) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>

                        <p>Instructions for Player 1 (screen 2 of 2)</p>
                        <p>In each of the 10 rounds, you will decide whether to (1) offer the jar to Player 2 so that
                        Player 2 will get the option to mix all the balls in your jar to either one of his/her urns or (2) not recover and offer the jar.
                        If you offered the jar to Player 2, it is Player 2’s decision whether he/she will mix the balls in the jar with an urn and to which urn.
                        Player 2 will have to either mix all the balls from your jar into the same urn or not mix the balls from your jar at all.
                        </p>
                    </Grid>
                    <Grid item align="center" xs={12} >
                        <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                    </Grid>
                </Grid>
            );
        }
    } else if (gameState.player === 'player2'){
        if (instructionsPage === 1) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>

                        <p>OVERVIEW</p>
                        <p>Welcome to this study of decision-making.</p>

                        <p>The study will take between 1 and 1.5 hours including the instructions.
                        The instructions are simple, and if you follow them carefully, you can earn money in addition to your $5 show-up payment.
                        Besides your show-up payment, you will be given a “Bank” of $5 to which additional earnings will be added and from which penalties will be deducted.
                        The show-up payment and your final “Bank” balance  will be paid to you after the study ends. </p>

                        <p>You will be randomly assigned a role as either Player 1 or Player 2.
                        You will play 10 rounds of a game with another participant.</p>

                        <p>At the beginning of each round, Player 1 will receive a jar and Player 2 will receive 2 urns.
                        The jar and the urns each have 100 balls at the beginning of each round, each ball is either blue or red.</p>

                        <p>Each round of the game goes roughly as follows:</p>

                        <ul>
                            <li>Player 1 choose whether to offer his/her jar to Player 2.
                            The round ends if Player 1 choose not to offer Player 2 the jar.</li>
                            <li>If Player 1 offered the jar to Player 2, Player 2 makes a decision to either
                            (1) decline the jar or accept the jar and
                            (2)/(3) mix all the balls from the jar into one of his/her urns</li>
                        </ul>

                        <p>The computer takes one draw from each one of Player 2’s urns at the end of each round.
                        A total of 2 balls are drawn each round.
                        After each draw, the drawn ball’s color will be recorded and the ball replaced into the urn from which it was drawn.
                        The draws will be made at the end of the round.
                        If Player 2 mixed the balls in a jar into one of his/her urns, the draw from that urn is made after the balls from the jar were mixed in. </p>

                        <p>Your earnings will depend on various factors including your decisions,
                        the decisions of the other Player,
                        and how many blue balls were drawn from Player 2’s urns at the end of the round.</p>
                    </Grid>
                    <Grid item align="center" xs={12} >
                        <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                    </Grid>
                </Grid>
            );
        } else if (instructionsPage === 2) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>

                        <p>Instructions for Player 2 (1 of 2)</p>
                        <p>In this study, you have been assigned the role of Player 2.
                        You have been randomly matched with another participant who will be in the role of Player 1.
                        Your earnings will depend on your decisions, as well as on the decisions of  Player 1.
                        There will be 10 rounds of this study. For all 10 rounds you will be paired with the same Player 1, who will participate at the same time as you.
                        </p>
                    </Grid>
                    <Grid item align="center" xs={12} >
                        <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                    </Grid>
                </Grid>
            );
        } else if (instructionsPage === 3) {
            return (
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <button type="button" onClick={handleInstructionsClose}>
                            Close Instructions
                        </button>
                        <p>Instructions for Player 2 (2 of 2)</p>
                        <p>In each of the 10 rounds, if Player 1 offered you a jar, you can decide whether to (1) decline Player 1’s jar offer;
                        or (2)/(3) mix all the balls from the jar offered by Player 1 into in either one of your urns (not both urns).
                        If Player 1 did not make an offer of a jar in a round, you will not move for that round and will earn zero for that round.
                        </p>
                    </Grid>
                    <Grid item align="center" xs={12} >
                        <Pagination align="center" page={instructionsPage} onChange={handleInstructionsPageChange} count={3} />
                    </Grid>
                </Grid>
            );
        }
    }

}

export default Instructions;