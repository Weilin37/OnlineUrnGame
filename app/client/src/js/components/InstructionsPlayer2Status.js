import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { setInstructions } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

import InstructionsPage1 from '../../img/InstructionsPage1.png';
import InstructionsPage1Status from '../../img/InstructionsPage1Status.png';
import InstructionsPage2 from '../../img/InstructionsPage2.png';
import InstructionsPage3Player2 from '../../img/InstructionsPage3Player2.png';
import InstructionsDecisionPlayer1Status from '../../img/InstructionsDecisionPlayer1Status.png';
import InstructionsDecisionPlayer2Status from '../../img/InstructionsDecisionPlayer2Status.png';

const InstructionsPlayer2Status = () => {
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
        if (pages < maxPages && !gameState.both_quiz_finished) {
            setTimeout(() => {
                setTotalPages(Math.max(value+1,pages));
            }, 5000);
        }
    }

    // render component
    if (instructionsPage === 1) {
        if (!gameState.both_quiz_finished) {
            const interval = setTimeout(() => {
                setTotalPages(Math.max(2,pages));
            }, 5000);
        }
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={5} >
                    <p>(Page {instructionsPage} of {maxPages})</p>

                    <p>Welcome to this study of decision-making.</p>

                    <p>The study will take about 30 minutes including the instructions.
                    The instructions are simple, and if you follow them carefully, you can earn tokens
                    in addition to your $5.00 show-up payment. You will receive your show-up payment if
                    you and the player paired with you finish all 10 rounds of the game.
                    Besides your show-up payment, you will be given a “Bank” of 500 tokens (equivalent to $5.00)
                    to which additional earnings will be added and from which penalties will be deducted.
                    Tokens will be translated into dollars at the end of the game (1 token = $0.01). If your Bank's balance is negative, you will receive only your show-up payment.
                    The show-up payment and your final “Bank” balance will be paid to you after the study ends.</p>

                    <p>You will be randomly assigned a role as either Player 1 or Player 2.
                    You will play 10 rounds of a game with another participant.</p>

                    <p>At the beginning of each round, Player 1 will receive a pair of identical jars and Player 2 will receive 2 non-identical urns.
                    The jars and the urns each have 100 balls at the beginning of each round, each ball is either blue or red.</p>

                    <p>Each round of the game goes roughly as follows (see figure on the right):</p>

                    <ul>
                        <li>Player 1 chooses whether to offer his/her pair of jars to Player 2.
                        The round ends if Player 1 chooses not to offer Player 2 the pair of jars. </li>
                        <li>If Player 1 offered the pair of jars to Player 2, Player 2 makes a decision to either
                        (1) decline the jars or 
                        (2)/(3) mix all the balls from ONE of the two jars into ONLY ONE of his/her urns, or
                        (4) mix all the balls from EACH of the two jars into EACH of his/her urns</li>
                    </ul>


                </Grid>
                <Grid item align="center" xs={5} >
                    <img src={InstructionsPage1} class="imginstructions"/>
                </Grid>
                <Grid item align="center" xs={10} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 2) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
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
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 3) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={5} >
                    <p>Instructions for Player 2</p>

                    <p>In this study, you have been assigned the role of Player 2.
                    You have been randomly matched with another participant who will be in the role of Player 1.
                    Your earnings will depend on your decisions, as well as on the decisions of  Player 1.
                    There will be 10 rounds of this study. For all 10 rounds you will be paired with the same Player 1,
                    who will participate at the same time as you. </p>

                    <p>In each of the 10 rounds Player 1 will be given two identical jars of balls and you will be given two urns of balls.
                    A different pair of jars and 2 different urns will given for each round (the jars or urns do not carryover to the next round(s)).
                    Player 1’s earnings for each round can depend on whether Player 1 offered the pair of jars to you, whether you
                    accepted Player 1’s jars, and how many blue balls were drawn from your urns at the end of the round. </p>

                </Grid>
                <Grid item align="center" xs={3} >
                    <img src={InstructionsPage2} class="imginstructions" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 4) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >

                    <p>There are 2 types of urns: “High Blue” and “Low Blue”.  You will have one urn of each type in every round.
                    The urns each have 100 balls at the beginning of each round, each ball is either blue or red. The chance of
                    drawing blue balls from an urn is higher when there are more blue balls relative to red balls in that urn.
                    You can change the chance of drawing blue balls from an urn at the end of the round by mixing the balls in one of the jars
                    from Player 1 into that urn. </p>

                    <p>There are 2 types of jars:  “Low Quality” and “High Quality”. The quality of each jar is indicated by the number
                    of blue balls: it can range from 0 to 100. When mixed into an urn, a jar can increase or decrease the average chance
                    of drawing blue balls from the urn at the end of the round. With mixing, the number of blue balls in an urn at the
                    end of the round will be equal to the sum of the number of blue balls in the jar and the number of blue balls in that
                    urn (instead of the number of blue balls in that urn at the beginning of the round). For example, if the number of
                    blue balls in a jar is higher than the number of blue balls in an urn, mixing the balls from that jar into that urn
                    will increase the chance of drawing blue balls from that urn at the end of the round.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 5) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >

                    <p>In each round, you can see the type and the actual number of blue balls in Player 1’s jars as well
                    as the type and actual number of blue balls in each of your urns before making any decisions in each round.</p>

                    <p>Unlike you, Player 1 will not be able to observe the exact number of blue balls in the jars that he/she received
                    but he/she will be told whether he/she received a pair of identical “High Quality” or a “Low Quality” jars for that round.
                    A “High Quality” jar has a number of blue balls (out of 100) that can be equal to any number between 70-100
                    with equal chance, whereas a “Low Quality” jar has a number of blue balls (out of 100) that can be equal to
                    any number between 0-70 with equal chance. Player 1 also knows that you have a “High Blue” urn as well as a
                    “Low Blue” urn. Player 1 also knows that a “High Blue” urn has a number of blue balls (out of 100) (before mixing)
                    that can be equal to any number between 40-100 with equal chance while a “Low Blue” urn has a number of blue balls
                    (out of 100) (before mixing) that can be equal to any number between 0-60 with equal chance. Unlike you, Player 1
                    will neither observe nor receive any signals about the exact number of blue balls of either of your urns.</p>

                    <p>You, Player 2, can see the actual number of blue balls in the jars as well as the
                    actual number of blue balls in each of your urns before making any decisions in each round.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 6) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Instructions for Player 2</p>

                    <p>In each of the 10 rounds, if Player 1 offered you the jars, you can decide whether to: </p>
                    <ul>
                        <li>Decline both of Player 1’s jars</li>
                        <p>OR</p>
                        <li>Mix all the balls from a jar offered by Player 1 into in your High Blue urn and decline the other jar</li>
                        <p>OR</p>
                        <li>Mix all the balls from a jar offered by Player 1 into in your Low Blue urn and decline the other jar</li>
                        <p>OR</p>
                        <li>Mix all the balls from a jar offered by Player 1 into in your High Blue urn and mix all the balls from the other jar offered by Player 1 into in your Low Blue urn</li>
                    </ul>
                    <p>If Player 1 did not make an offer of jars in a round, you will not move for that round and will earn zero for that round.
                        You, Player 2, cannot mix the balls from both jars into a single urn.
                    </p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsPage3Player2} class="imginstructionsrow" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 7) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Your goal in the game is to minimize the percentage of red balls among balls drawn from urns where mixing occurred.</p>

                    <p>Player 1 earns by offering and getting more jars accepted, gets a penalty if both of his/her jars
                    was declined, and gets zero if he/she made no offer or if only one of the jars were accepted.</p>

                    <p>Player 2 earns by mixing balls from jars to urns. He/she earns more by mixing more jars
                    but he/she is penalized for for each red ball was drawn from every urn that was mixed with a jar. 
                    Player 2 gets zero if Player 1 made no offer.</p>

                    <p>We provide more details on the payment schemes for both Players in the next screen.</p>

                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 8) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={5} >
                    <p>
                        Player 1 earns tokens by offering two jars that was subsequently BOTH accepted by Player 2,
                        gets a penalty by offering two jars that was subsequently BOTH declined by Player 2,
                        gets 0 tokens by offering two jars and only ONE jar was accepted by Player 2,
                        and gets 0 tokens by not making an offer at all.
                    </p>

                    <ul>
                        <li>
                            If Player 1 did NOT OFFER the pair of jars to Player 2 in a round of the study,
                            both players will receive 0 tokens for that round.
                        </li>
                        <li>
                            If Player 1 offered the pair of jars to Player 2 in a round of the study and Player 2
                            DECLINED BOTH jars, 30 tokens are deducted from Player 1’s Bank and Player 2 will receive
                            0 tokens for that round.
                        </li>
                        <li>
                            If Player 1 offered the pair of jars to Player 2 in a round of the study and
                            Player 2 ACCEPTED ONLY ONE jar (that he/she has to mix into either one of the urns), Player 1 gets 0 tokens for that round
                        </li>
                        <li>
                            If Player 1 offered the pair of jars to Player 2 in a round of the study and
                            Player 2 ACCEPTED BOTH jars (that he/she has to mix into the two urns), Player 1 gets 10 tokens for that round
                        </li>
                    </ul>

                    <p>
                        Player 1 has clear incentives to offer a pair of jars if Player 2 will accept both jars
                        and to not offer a jar if Player 2 will decline both jars
                    </p>

                    <p> Player 2 can only earn tokens by mixing balls from jars into urns. </p>
                    <ul>
                        <li>If Player 2 accepted a jar, he/she has to mix it with one of the urns.</li>
                        <li>If Player 2 accepted both jars, he/she has to mix them both, one jar with each of the urns.</li>
                        <li>If Player 2 did not perform a mixing, either because no jar was offered to him/her or if he/she chose not to decline both jars, Player 2 gets 0 tokens.</li>
                    </ul>

                    <ul>
                        <li>
                            Player 2 earns 25 tokens by mixing a jar with an urn and drawing a blue ball from the mixed urn.
                        </li>
                        <li>
                            Player 2 loses the earnings and instead receive an 100 token penalty that is deducted
                            from his/her Bank if a red ball was drawn from the mixed urn.
                        </li>
                        <li>
                            Player 2 will neither get any additional rewards or penalties for the urn he/she did not mix.
                        </li>
                        <p>In other words, Player 2 gets:</p>
                        <ul>
                            <li> +50 tokens if he mixed both jars and blue balls were drawn from BOTH urns</li>
                            <li> -75 tokens if he mixed both jars and a blue balls were drawn from one urn and a red ball from the other urn</li>
                            <li> -200 tokens if he mixed both jars and red balls were drawn from BOTH urns</li>
                            <li> +25 tokens if he mixed one jar with one of the urns and a blue ball was drawn from that urn</li>
                            <li> -100 tokens if he mixed one jar with one of the urns and a red ball was drawn from that urn</li>
                            <li> 0 tokens if he declined the jars and did no mixing</li>
                        </ul>
                    </ul>
                </Grid>
                <Grid item align="center" xs={5} >
                    <img src={InstructionsPage1Status} class="imginstructions"/>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 9) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 1’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer1Status} class="imgplayerdecision"/>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>Wait 5 seconds before the next page can appear...</p>
                    <Pagination page={instructionsPage} onChange={handleInstructionsPageChange} count={pages} />
                </Grid>
            </Grid>
        );
    } else if (instructionsPage === 10) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <p>(Page {instructionsPage} of {maxPages})</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <p>For your reference, Player 2’s decision screen in the game in each stage will look as follows:</p>
                </Grid>
                <Grid item align="center" xs={8} >
                    <img src={InstructionsDecisionPlayer2Status} class="imgplayerdecision"/>
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

export default InstructionsPlayer2Status;