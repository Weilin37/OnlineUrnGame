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
  }
}));

const Player2 = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    // state
    const gameState = useSelector(state => state.game);
    const [selectedValue, setSelectedValue] = React.useState();
    const [ready, setReady] = React.useState(false);

    useEffect(() => {
        if (gameState.both_ready_for_next && gameState.current_round < 10) {
            dispatch(createNewRound("/api/get/createnewround?room="+gameState.room+"&round="+
                (parseInt(gameState.data[gameState.data.length-1]['round'])+1)+
                "&player1name="+gameState.data[gameState.data.length-1]['player1name']+
                "&player2name="+gameState.data[gameState.data.length-1]['player2name']+
                "&treatment="+gameState.data[gameState.data.length-1]['treatment']+
                "&player1earnings="+gameState.data[gameState.data.length-1]['player1earnings']+
                "&player2earnings="+gameState.data[gameState.data.length-1]['player2earnings']
            ));
        }
    }, [gameState.both_ready_for_next]);

    var mix_high_blue;
    var mix_low_blue;

    if (gameState.current_turn === 'player2') {
        var player1_blue = parseInt(gameState.data[gameState.data.length-1]['player1bluecount']);
        var player2_highblue = parseInt(gameState.data[gameState.data.length-1]['player2highbluecount']);
        var player2_lowblue = parseInt(gameState.data[gameState.data.length-1]['player2lowbluecount']);

        mix_high_blue = (player1_blue+player2_highblue);
        mix_low_blue = (player1_blue+player2_lowblue);
    }

    // Enter decision
    function handleSubmit() {
        if (selectedValue) {
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
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jar
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']}
                        ({gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
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
                        Waiting for Player 1 to perform their move...
                    </Typography>
                    <Divider className={classes.spacing} variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'player2' && gameState.data[gameState.data.length-1]['player1action'] === 'Offer' && !gameState.both_ready_for_next) {
        var MixWithHighBlueLabel = `Mix Player 1's jar with your High Blue urn (${mix_high_blue} of 200 or ${100*(mix_high_blue/200).toFixed(1)}% balls are blue)`
        var MixWithLowBlueLabel = `Mix Player 1's jar with your Low Blue urn (${mix_low_blue} of 200 or ${100*(mix_low_blue/200).toFixed(1)}% balls are blue)`
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jar
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']}
                        ({gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
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
                        Player 1 has decided to offer you their jar. Please choose an action:
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="choice" name="player1choice" onChange={handleChange}>
                            <FormControlLabel value="RejectOffer" control={<Radio />} label="Reject the jar offered by Player 1" />
                            <FormControlLabel value="MixWithHighBlue" control={<Radio />} label={MixWithHighBlueLabel} />
                            <FormControlLabel value="MixWithLowBlue" control={<Radio />} label={MixWithLowBlueLabel} />
                        </RadioGroup>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response and Draw Ball</Button>
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
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jar
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']}
                        ({gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
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
                        Player 1 has decided not to offer you their jar. No action is needed. Press OK to continue to the next round
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
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jar
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']}
                        ({gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
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
                        All players made their moves! Press OK to continue to the next round
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleNextRound}>OK</Button>
                    <Divider className={classes.spacing}variant="middle" />
                </Grid>
            </Grid>
        );
    } else if (gameState.current_turn === 'done' && !gameState.both_ready_for_next && ready) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <Typography variant="h5" gutterBottom className={classes.spacing}>Round Details</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        For this round, your High Blue urn, your Low Blue urn, and Player 1's jar
                        are randomly assigned the following number of blue balls and red balls:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']}
                        ({gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
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

export default Player2;