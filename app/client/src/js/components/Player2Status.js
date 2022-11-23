import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, sendData, createNewRound, sendReady } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
  },
  radio: {
    marginTop: theme.spacing(2),
    textAlign: 'left'
  }
}));

const Player2Status = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // state
    const gameState = useSelector(state => state.game);
    const [selectedValue, setSelectedValue] = React.useState();
    const [ready, setReady] = React.useState(false);
    const [disableCreateButton, setDisableCreateButton] = React.useState(false);

    var player2reward = 11.175;
    var player2penalty = -10;

    useEffect(() => {
        if (gameState.both_ready_for_next && gameState.current_round < 10) {
            dispatch(createNewRound("/api/get/createnewround?room="+gameState.room+"&round="+
                (parseInt(gameState.data[gameState.data.length-1]['round'])+1)+
                "&player1name="+gameState.data[gameState.data.length-1]['player1name']+
                "&player2name="+gameState.data[gameState.data.length-1]['player2name']+
                "&treatment="+gameState.data[gameState.data.length-1]['treatment']+
                "&player1earnings="+gameState.data[gameState.data.length-1]['player1earnings']+
                "&player2earnings="+gameState.data[gameState.data.length-1]['player2earnings']+
                "&finish_code_player1="+gameState.data[gameState.data.length-1]['finish_code_player1']+
                "&finish_code_player2="+gameState.data[gameState.data.length-1]['finish_code_player2']
            ));
        }
    }, [gameState.both_ready_for_next]);

    var player1_blue = parseInt(gameState.data[gameState.data.length-1]['player1bluecount']);
    var player2_highblue = parseInt(gameState.data[gameState.data.length-1]['player2highbluecount']);
    var player2_lowblue = parseInt(gameState.data[gameState.data.length-1]['player2lowbluecount']);

    var mix_high_blue = (player1_blue+player2_highblue);
    var mix_low_blue = (player1_blue+player2_lowblue);
    var mix_both_high_blue = (player1_blue+player2_highblue);
    var mix_both_low_blue = (player1_blue+player2_lowblue);

    // Enter decision
    function handleSubmit() {
        if (selectedValue) {
            setDisableCreateButton(true);
            dispatch(sendData('/api/get/senddata?player='+gameState.player+
                '&room='+gameState.room+
                '&round='+gameState.data[gameState.data.length-1]['round']+
                '&treatment='+gameState.data[gameState.data.length-1]['treatment']+
                '&player1action='+gameState.data[gameState.data.length-1]['player1action']+
                '&player1bluecount='+gameState.data[gameState.data.length-1]['player1bluecount']+
                '&player2highbluecount='+gameState.data[gameState.data.length-1]['player2highbluecount']+
                '&player2lowbluecount='+gameState.data[gameState.data.length-1]['player2lowbluecount']+
                '&data='+selectedValue)
            );
        } else {
            setDisableCreateButton(false);
            alert("Please make a choice before submitting");
        }
    }

    function handleContinue() {
        var ready = true;
        batch(() => {
            dispatch(sendData('/api/get/senddata?player='+gameState.player+
                '&room='+gameState.room+
                '&round='+gameState.data[gameState.data.length-1]['round']+
                '&treatment='+gameState.data[gameState.data.length-1]['treatment']+
                '&player1action='+gameState.data[gameState.data.length-1]['player1action']+
                '&player1bluecount='+gameState.data[gameState.data.length-1]['player1bluecount']+
                '&player2highbluecount='+gameState.data[gameState.data.length-1]['player2highbluecount']+
                '&player2lowbluecount='+gameState.data[gameState.data.length-1]['player2lowbluecount']+
                '&data=NA')
            );
            dispatch(sendReady('/api/get/sendready?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+ready));
        });
        setReady(true);
    }

    function handleNextRound() {
        var ready = true;
        dispatch(sendReady('/api/get/sendready?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+ready));
        setReady(true);
    }

    function handleChange(event) {
        setSelectedValue(event.target.value)
    }

    // render component
    if (gameState.current_turn === 'player1' && !gameState.both_ready_for_next) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jars
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality (same for both jars): {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls per jar
                        and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls per jar)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        High Blue Urn: {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Low Blue Urn: {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="h5" gutterBottom>
                        Waiting for Player 1 to perform their move...
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'player2' && gameState.data[gameState.data.length-1]['player1action'] === 'Offer' && !gameState.both_ready_for_next) {

        var RejectOffer = `Reject the jars offered by Player 1. You will earn 0 tokens by choosing this option for this round.`

        var MixWithHighBlueLabel = `Mix One of Player 1's jar with your High Blue urn. The High Blue urn will now have 200 balls where ${mix_high_blue} or
                                    ${(100*(mix_high_blue/200)).toFixed(1)}% of the balls will be blue for this urn (before a ball is drawn from it).`

        var MixWithLowBlueLabel = `Mix One of Player 1's jar with your Low Blue urn. The Low Blue urn will now have 200 balls where ${mix_low_blue} or
                                    ${(100*(mix_low_blue/200)).toFixed(1)}% of the balls will be blue for this urn (before a ball is drawn from it).`

        var MixWithBothBlueLabel = `Mix One of Player 1's jar with your High Blue urn and, and mix the other jar with your Low Blue urn. Both urns will now have 200 balls.
                                    You will have ${(100*(mix_both_high_blue/200)).toFixed(1)}% blue balls in the High Blue urn and ${(100*(mix_both_low_blue/200)).toFixed(1)}% blue balls in the Low Blue urn (before the balls are drawn).`

        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jars
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality (same for both jars): {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        High Blue Urn: {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Low Blue Urn: {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Player 1 has decided to offer you their jars. Please choose an action:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Your reward amount for EACH blue ball you draw if you mix an urn: {player2reward} tokens
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Your penalty amount for EACH red ball you draw if you mix an urn: {player2penalty} tokens
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="choice" name="player1choice" onChange={handleChange}>
                            <FormControlLabel className={classes.radio} value="RejectOffer" control={<Radio />} label={RejectOffer} />
                            <FormControlLabel className={classes.radio} value="MixWithHighBlue" control={<Radio />} label={MixWithHighBlueLabel} />
                            <FormControlLabel className={classes.radio} value="MixWithLowBlue" control={<Radio />} label={MixWithLowBlueLabel} />
                            <FormControlLabel className={classes.radio} value="MixWithBothBlue" control={<Radio />} label={MixWithBothBlueLabel} />
                        </RadioGroup>
                        <Button variant="contained" color="primary" disabled={disableCreateButton} onClick={handleSubmit}>Submit Response and Draw Ball</Button>
                    </FormControl>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'player2' && gameState.data[gameState.data.length-1]['player1action'] === 'NoOffer' && !gameState.both_ready_for_next) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jars
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality (same for both jars): {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        High Blue Urn: {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Low Blue Urn: {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={12} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="h5" gutterBottom>
                        Player 1 has decided not to offer you their jars. No action is needed. Press OK to continue to the next round
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleContinue}>OK</Button>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'done' && !gameState.both_ready_for_next && !ready) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jars
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality (same for both jars): {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        High Blue Urn: {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Low Blue Urn: {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Results</Typography>
                    <Typography variant="h5" gutterBottom>
                        All players made their moves!
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        The ball drawn was: {gameState.data[gameState.data.length-1]['drawn_ball']}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        You earned: {gameState.data[gameState.data.length-1]['player2earnings_difference']} tokens
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Press OK to continue to the next round
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNextRound}>OK</Button>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'done' && !gameState.both_ready_for_next && ready) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jars
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality (same for both jars): {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls)
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        High Blue Urn: {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Low Blue Urn: {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls
                        and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="h5" gutterBottom>
                        Ready! Waiting for other player...
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    }
    else {
        return null;
    }


}

export default Player2Status;