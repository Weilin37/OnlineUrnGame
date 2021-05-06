import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

import InstructionsPage1 from '../../img/InstructionsPage1.png';
import InstructionsPage2 from '../../img/InstructionsPage2.png';
import InstructionsPage3Player2 from '../../img/InstructionsPage3Player2.png';
import InstructionsDecisionPlayer1Status from '../../img/InstructionsDecisionPlayer1Status.png';
import InstructionsDecisionPlayer2Status from '../../img/InstructionsDecisionPlayer2Status.png';

const InstructionsPlayer2Status = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    var initialPages;
    if (gameState.both_quiz_finished) {initialPages = 7}
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
                    <p>(Page 1 of 7)</p>

                    <p>OVERVIEW</p>
                    <p>Welcome to this study of decision-making.</p>
                <Grid />
                <Grid item align="center" xs={5} >

                    <p>The study will take between 1 and 1.5 hours including the instructions.
                    The instructions are simple, and if you follow them carefully, you can earn tokens in addition to your show-up payment.
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
                <Grid item align="center" xs={3} >
                    <img src={InstructionsPage1} class="imginstructions"/>
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
                    <p>(Page 2 of 7)</p>

                    <p>Instructions for Player 2</p>
                <Grid />
                <Grid item align="center" xs={5} >

                    <p>In this study, you have been assigned the role of Player 2.
                    You have been randomly matched with another participant who will be in the role of Player 1.
                    Your earnings will depend on your decisions, as well as on the decisions of  Player 1.
                    There will be 10 rounds of this study. For all 10 rounds you will be paired with the same Player 1,
                    who will participate at the same time as you. </p>

                    <p>In each of the 10 rounds Player 1 will be given a jar of balls and you will be given two urns of balls.
                    Player 1’s earnings for each round can depend on whether Player 1 offered the jar to you, whether you
                    accepted Player 1’s jar offer, and how many blue balls were drawn from your urns at the end of the round. </p>

                    <p>There are 2 types of urns: “High Blue” and “Low Blue”.  Player 2 will have one urn of each type in every round.
                    The urns each have 100 balls at the beginning of each round, each ball is either blue or red.
                    The chance of drawing blue balls from an urn is higher when there are more blue balls relative to red balls in that urn.
                    Player 2 can change the chance of drawing blue balls from an urn at the end of the round
                    by mixing the balls in the jar from Player 1 into that urn. </p>

                    <p>There are 2 types of jars:  “Low Quality” and “High Quality”.
                    The quality of each jar is indicated by the number of blue balls:
                    it can range from 0 to 100. When mixed into an urn, a jar can increase or decrease the average chance of
                    drawing blue balls from the urn at the end of the round. With mixing, the number of blue balls
                    in an urn at the end of the round will be equal to sum of the number of blue balls in the jar
                    and the number of blue balls in that urn (instead of the number of blue balls in that urn at the
                    beginning of the round). For example, if the number of blue balls in a jar is higher than the
                    number of blue balls in an urn, mixing the balls from that jar into that urn will increase the
                    chance of drawing blue balls from that urn at the end of the round. </p>

                    <p>In each round, you can see the type and the actual number of blue balls in Player 1’s jar
                    as well as the type and actual number of blue balls in each of your urns before making any decisions
                    in each round.</p>

                    <p>Unlike you, Player 1 will not be able to observe the exact number of blue balls in the jar
                    that he/she received but he/she will be told whether he/she received a “High Quality” or a
                    “Low Quality” jar for that round. A “High Quality” jar has a number of blue balls (out of 100)
                    that can be equal to any number between 80-100 with equal chance, whereas a “Low Quality” jar has
                    a number of blue balls (out of 100) that can be equal to any number between 0-80 with equal chance.
                    Player 1 also knows that you have a “High Blue” urn as well as a “Low Blue” urn.
                    Player 1 also knows that a “High Blue” urn has a number of blue balls (out of 100) (before mixing)
                    that can be equal to any number between 40-100 with equal chance while a “Low Blue” urn has a number
                    of blue balls (out of 100) (before mixing) that can be equal to any number between 0-60 with equal chance.
                    Unlike you, Player 1 will neither observe nor receive any signals about the exact number of blue balls
                    of either of your urns.</p>
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
    } else if (instructionsPage === 3) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page 3 of 7)</p>

                    <p>Instructions for Player 2</p>
                <Grid />
                <Grid item align="center" xs={5} >

                    <p>In each of the 10 rounds, if Player 1 offered you a jar, you can decide whether to: </p>
                    <ul>
                        <li>Decline Player 1’s jar offer</li>
                        <p>OR</p>
                        <li>Mix all the balls from the jar offered by Player 1 into in either one of your urns (not both urns)</li>
                    </ul>
                    <p>If Player 1 did not make an offer of a jar in a round, you will not move for that round and will earn zero for that round.</p>

                </Grid>
                <Grid item align="center" xs={3} >
                    <img src={InstructionsPage3Player2} class="imginstructions" />
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
                    <p>(Page 4 of 7)</p>
                <Grid />
                <Grid item align="center" xs={8} >
                    <p>Your goal in the game is to minimize the percentage of red balls among balls drawn from urns</p>

                    <p>Player 1 earns by offering and getting a jar accepted, gets a penalty if his/her jar offer
                    was declined, and gets zero if he/she made no offer.</p>

                    <p>Player 2 earns by mixing balls from a jar to an urn, and he/she is penalized if a red ball
                    was drawn from that urn. Player gets zero if Player 1 made no offer.</p>

                    <p>We provide more details on the payment schemes for both Players in the next screen.</p>

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
                    <p>(Page 5 of 7)</p>
                <Grid />
                <Grid item align="center" xs={8} >
                    <p>
                        Player 1 earns by offering a jar that was subsequently accepted by Player 2,
                        gets a penalty by offering a jar that was subsequently declined by Player 2,
                        and gets zero earnings by not making an offer at all.
                    </p>

                    <ul>
                        <li>
                            If Player 1 did not offer the jar to Player 2 in a round of the study,
                            both players will receive zero earnings for that round.
                        </li>
                        <li>
                            If Player 1 offered the jar to Player 2 in a round of the study and Player 2
                            declined the jar, tokens are deducted from Player 1’s Bank and Player 2 will receive
                            zero earnings for that round.
                        </li>
                        <li>
                            If Player 1 offered the jar to Player 2 in a round of the study and
                            Player 2 accepted the jar, Player 1 gets tokens for that round
                        </li>
                    </ul>

                    <p>
                        Player 1 has clear incentives to offer a jar if Player 2 will accept it
                        and to not offer a jar if Player 2 will not accept it
                    </p>

                    <p>
                        Player 2 can only earn by mixing balls from a jar into an urn.
                        If Player 2 did not perform a mixing, either because no jar was offered
                        to him/her or if he/she chose not to accept the offer, Player 2 gets zero earnings.
                    </p>

                    <ul>
                        <li>
                            Player 2 earns tokens by mixing and drawing a blue ball from the mixed urn.
                        </li>
                        <li>
                            Player 2 loses the earnings and instead receive a token penalty that is deducted
                            from his/her Bank if a red ball was drawn from the mixed urn
                        </li>
                    </ul>
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
                    <p>(Page 6 of 7)</p>
                <Grid />
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 1’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer1Status} class="imgplayerdecision"/>
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
                    <p>(Page 7 of 7)</p>
                <Grid />
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 2’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer2Status} class="imgplayerdecision"/>
                </Grid>
                <Grid item align="center" xs={8} >
                    <button type="button" onClick={handleInstructionsClose}>
                        Close Instructions
                    </button>
                </Grid>
                <Grid item align="center" xs={8} >
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    }
}

export default InstructionsPlayer2Status;