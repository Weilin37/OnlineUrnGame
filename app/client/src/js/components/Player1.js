import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { sendData, sendReady } from "../features/gameSlice";
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

const Player1 = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // state
    const gameState = useSelector(state => state.game);
    const [selectedValue, setSelectedValue] = React.useState();
    const [ready, setReady] = React.useState(false);

    var player1reward;
    var player1penalty;

    var earnings_messaging = [];

    if (gameState.treatment === 'status_quo') {
        player1reward = 8;
        player1penalty = -24;

        earnings_messaging = [
            <Typography variant="subtitle1" gutterBottom>Your reward amount if you Player 2 accepts your jar: {player1reward} tokens</Typography>,
            <Typography variant="subtitle1" gutterBottom>Your penalty amount if you Player 2 rejects your jar: {player1penalty} tokens</Typography>
        ]
    } else if (gameState.treatment === 'holistic') {
        player1reward = 8;
        player1penalty = 0;

        earnings_messaging = [
            <Typography variant="subtitle1" gutterBottom>Your reward amount if you Player 2 draws 2 blue balls: {2*player1reward} tokens</Typography>,
            <Typography variant="subtitle1" gutterBottom>Your reward amount if you Player 2 draws 1 blue ball and 1 red ball: {player1reward+player1penalty} tokens</Typography>,
            <Typography variant="subtitle1" gutterBottom>Your penalty amount if you Player 2 draw 2 red balls: {2*player1penalty} tokens</Typography>
        ]
    }

    const jarType = {
        'low_quality':'0-60 blue balls',
        'high_quality':'60-100 blue balls'
    }

    // Enter decision
    function handleSubmit() {
        if (selectedValue) {
            dispatch(sendData('/api/get/senddata?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+selectedValue))
        } else {
            alert("Please make a choice before submitting");
        }

    }

    function handleChange(event) {
        setSelectedValue(event.target.value)
    }

    function handleNextRound() {
        var ready = true;
        dispatch(sendReady('/api/get/sendready?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+ready));
        setReady(true);
    }

    // render component
    if (gameState.current_turn === 'player1' && !gameState.both_ready_for_next) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, you are randomly assigned the following type of jar:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {jarType[gameState.data[gameState.data.length-1]['player1jartype']]})
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Now, please select an action by clicking a box below for the current round of the study.
                        Player2 will then decide whether to reject this offer or accept this offer to mix your jar with one of their urns.
                        After that, we''ll go to the next round, and so on until round 10
                    </Typography>
                    {earnings_messaging.map(function(name, index){
                        return name;
                    })}
                    <FormControl component="fieldset">
                        <RadioGroup justify="center" alignItems="center" align="center" aria-label="choice" name="player1choice" onChange={handleChange} >
                            <FormControlLabel className={classes.radio} value="Offer" control={<Radio />} label="Offer both yours jar to Player 2" />
                            <FormControlLabel className={classes.radio} value="NoOffer" control={<Radio />} label="Do not offer any of your jars to Player 2" />
                        </RadioGroup>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                    </FormControl>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'player2' && !gameState.both_ready_for_next) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, you are randomly assigned the following type of jar:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {jarType[gameState.data[gameState.data.length-1]['player1jartype']]})
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom>Available Actions</Typography>
                    <Typography variant="h5" gutterBottom>
                        Choice submitted. Waiting for Player 2 to choose or acknowledge...
                    </Typography>
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
                        For this round, you are randomly assigned the following type of jar:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {jarType[gameState.data[gameState.data.length-1]['player1jartype']]})
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
                        You earned: {gameState.data[gameState.data.length-1]['player1earnings_difference']} tokens
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
                        For this round, you are randomly assigned the following type of jar:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {gameState.data[gameState.data.length-1]['player1jartype'].split("_").join(" ")} (
                        {jarType[gameState.data[gameState.data.length-1]['player1jartype']]})
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
    } else {
        return null;
    }

}

export default Player1;