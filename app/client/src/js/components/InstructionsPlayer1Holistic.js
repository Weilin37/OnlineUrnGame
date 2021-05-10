import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

import InstructionsPage1 from '../../img/InstructionsPage1.png';
import InstructionsPage2 from '../../img/InstructionsPage2.png';
import InstructionsPage3Player1 from '../../img/InstructionsPage3Player1.png';
import InstructionsDecisionPlayer1Holistic from '../../img/InstructionsDecisionPlayer1Holistic.png';
import InstructionsDecisionPlayer2Holistic from '../../img/InstructionsDecisionPlayer2Holistic.png';

const InstructionsPlayer1Holistic = () => {
    const dispatch = useDispatch();
    // state
    const gameState = useSelector(state => state.game);
    const maxPages = 10;
    var initialPages;
    if (gameState.both_quiz_finished) {initialPages = maxPages}
    else {initialPages = 1}
    const [instructionsPage, setInstructionsPage] = React.useState(1);
    const [pages, setTotalPages] = React.useState(initialPages);

    //const pages = 7;

    // Functions for Instructions
    function handleInstructionsClose() {
        dispatch(setInstructions(false));
    }

    function handleInstructionsPageChange(event, value) {
        setInstructionsPage(value);
        if (pages < 7 && !gameState.both_quiz_finished) {
            setTimeout(() => {
                setTotalPages(Math.max(value+1,pages));
            }, 10000);
        }
    }

    // render component
    if (instructionsPage === 1) {
        if (!gameState.both_quiz_finished) {
            const interval = setTimeout(() => {
                setTotalPages(Math.max(2,pages));
            }, 10000);
        }
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>

                    <p>OVERVIEW</p>
                </Grid>
                <Grid item align="center" xs={5} >
                    <p>Welcome to this study of decision-making.</p>

                    <p>The study will take between 1 and 1.5 hours including the instructions.
                    The instructions are simple, and if you follow them carefully, you can earn tokens
                    in addition to your $5 show-up payment. You will receive your show-up payment if
                    you and the player paired with you finishes all 10 rounds of the game.
                    Besides your show-up payment, you will be given a “Bank” of 250 tokens (equivalent to $2.5)
                    to which additional earnings will be added and from which penalties will be deducted.
                    Tokens will be translated into dollars at the end of the game (1 token = $0.01).
                    The show-up payment and your final “Bank” balance will be paid to you after the study ends.</p>

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

                </Grid>
                <Grid item align="center" xs={5} >
                    <img src={InstructionsPage1} class="imginstructions" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 2) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >

                    <p>The computer takes one draw from each one of Player 2’s urns at the end of each round.
                    A total of 2 balls are drawn each round. After each draw, the drawn ball’s color will be
                    recorded and the ball replaced into the urn from which it was drawn. The draws will be made
                    at the end of the round. If Player 2 mixed the balls in a jar into one of his/her urns,
                    the draw from that urn is made after the balls from the jar were mixed in. </p>

                    <p>Your earnings will depend on various factors including your decisions, the decisions of
                    the other Player, and how many blue balls were drawn from Player 2’s urns at the end of the
                    round.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 3) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={5} >
                    <p>Instructions for Player 1</p>

                    <p>In this study, you have been assigned the role of Player 1.
                    You have been randomly matched with another participant who will be in the role of Player 2.
                    Your earnings will depend on your decisions, as well as on the decisions of  Player 2.
                    There will be 10 rounds of this study. For all 10 rounds you will be paired with the same Player 2, who will participate at the same time as you.
                    </p>

                    <p>In each of the 10 rounds you will be given a jar of balls and Player 2 will be given two urns of balls.
                    A different jar and 2 different urns will given for each round (the jars or urns do not carryover to the next round(s)).
                    Your earnings for each round can depend on whether you offered the jar to Player 2, whether Player 2 accepted your jar offer,
                    and how many blue balls were drawn from Player 2’s urns at the end of the round. </p>

                </Grid>
                <Grid item align="center" xs={3} >
                    <img src={InstructionsPage2} class="imginstructions" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 4) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >

                    <p>There are 2 types of urns: “High Blue” and “Low Blue”.  Player 2 will have one urn of
                    each type in every round. Again, the urns each have 100 balls at the beginning of each
                    round, each ball is either blue or red. The chance of drawing blue balls from an urn is
                    higher when there are more blue balls relative to red balls in that urn. Player 2 can
                    change the chance of drawing blue balls from an urn at the end of the round by mixing the
                    balls in the jar from Player 1 into that urn. </p>

                    <p>There are 2 types of jars:  “Low Quality” and “High Quality”. The quality of each jar is
                    indicated by the number of blue balls: it can range from 0 to 100. When mixed into an urn,
                    a jar can increase or decrease the average chance of drawing blue balls from the urn at the
                    end of the round. With mixing, the number of blue balls in an urn at the end of the round
                    will be equal to sum of the number of blue balls in the jar and the number of blue balls in
                    that urn (instead of the number of blue balls in that urn at the beginning of the round).
                    For example, if the number of blue balls in a jar is higher than the number of blue balls in
                    an urn, mixing the balls from that jar into that urn will increase the chance of drawing
                    blue balls from that urn at the end of the round. </p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 5) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >

                    <p>In each round, you will not be able to observe the exact number of blue balls in the jar
                    that you received but you will be told whether you received a “High Quality” or a
                    “Low Quality” jar for that round. A “High Quality” jar has a number of blue balls
                    (out of 100) that can be equal to any number between 80-100 with equal chance, whereas a
                    “Low Quality” jar has a number of blue balls (out of 100) that can be equal to any number
                    between 0-80 with equal chance.</p>

                    <p>A “High Blue” urn has a number of blue balls (out of 100) (before mixing) that can be
                    equal to any number between 40-100 with equal chance while a “Low Blue” urn has a number
                    of blue balls (out of 100) (before mixing) that can be equal to any number between 0-60
                    with equal chance. While you know that Player 2 will have an urn of each type, you will
                    neither observe nor receive any signals about the exact number of blue balls of either of
                    his/her urns.</p>

                    <p>Unlike you, Player 2 can see the actual number of blue balls in your jar as well as the
                    actual number of blue balls in each of his/her urns before making any decisions in each round.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 6) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Instructions for Player 1</p>

                    <p>In each of the 10 rounds, you will decide whether to:</p>
                    <ul>
                        <li>Offer the jar to Player 2 so that Player 2 will get the option to mix all the balls in your jar to either one of his/her urns</li>
                        <p>OR</p>
                        <li>Not recover and offer the jar</li>
                    </ul>
                    <p>If you offered the jar to Player 2, it is Player 2’s decision whether he/she will mix the balls in the jar with an urn and to which urn.
                    Player 2 will have to either mix all the balls from your jar into the same urn or not mix the balls from your jar at all.
                    </p>

                    <p>You will decide whether to offer jar to Player 2 after receiving the signal about the type of jar
                    (“High Quality” or “Low Quality”) you have for that round:</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsPage3Player1} class="imginstructionsrow" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 7) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>The regulations of the game aim to maximize number of blue balls drawn from all the urns.</p>

                    <p>Both Player 1 and Player 2 earn based on the number of blue balls drawn at the end of each
                    round (out of all 20 from both of Player 2’s urns)</p>

                    <p>Both Player 1 and Player 2 earn nothing if if no blue ball was drawn </p>

                    <p>We provide more details on the payment schemes for both Players in the next screen.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 8) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>
                        Both Player 1’s and Player 2’s earnings are based on the total number of blue balls
                        drawn from both urns at the end of the round.
                    </p>

                    <p>
                        If Player 1 offered a jar, Player 2 can change the chance of drawing blue balls by mixing.
                        For example, if the number of blue balls in a jar is higher than the number of blue balls in
                        an urn before mixing, mixing the balls from the jar into the urn will increase the chance of
                        drawing blue balls at the end of the round.
                    </p>

                    <ul>
                        <li>
                            Player 1 gets 8 tokens in each round for each blue ball drawn at the end of that round from
                            both urns.
                        </li>
                        <li>
                            Player 2 gets 10 tokens in each round for each blue ball drawn at the end of that round from both urns.
                        </li>
                    </ul>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 9) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 1’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer1Holistic} class="imgplayerdecision"/>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 10 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 10) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {initialPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 2’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer2Holistic} class="imgplayerdecision"/>
                </Grid>
                <Grid item align="center" xs={8} >
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
                <Grid item align="center" xs={8} >
                    <button type="button" onClick={handleInstructionsClose}>
                        Close Instructions
                    </button>
                </Grid>
            </Grid>
        );
    }
}

export default InstructionsPlayer1Holistic;