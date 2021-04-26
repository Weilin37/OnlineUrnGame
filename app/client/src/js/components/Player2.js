import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, sendData, createNewRound } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const Player2 = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    const [selectedValue, setSelectedValue] = React.useState();
    const [submitted, setSubmitted] = React.useState(false);

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
        batch(() => {
            dispatch(sendData('/api/get/senddata?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+selectedValue));
            dispatch(createNewRound("/api/get/createnewround?room="+gameState.room+"&round="+
                (parseInt(gameState.data[gameState.data.length-1]['round'])+1)+
                "&player1name="+gameState.data[gameState.data.length-1]['player1name']+
                "&player2name="+gameState.data[gameState.data.length-1]['player2name']+
                "&treatment="+gameState.data[gameState.data.length-1]['treatment']+
                "&player1earnings="+gameState.data[gameState.data.length-1]['player1earnings']+
                "&player2earnings="+gameState.data[gameState.data.length-1]['player2earnings']
            ));
        });
        setSubmitted(true);
    }

    function handleChange(event) {
        setSelectedValue(event.target.value)
    }

    // render component
    if (gameState.current_turn === 'player1' && !submitted) {
        return (
            <div>
                <p>For this round, (round: {gameState.data[gameState.data.length-1]['round']}), your High Blue urn, your Low Blue urn, and Player 1's jar
                are randomly assigned the following number of blue balls and red balls</p>
                <p>Your High Blue Urn - {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls</p>
                <p>Your Low Blue Urn - {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls</p>
                <p>Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']},
                {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls</p>
                <p>Waiting for Player 1 to complete their action....</p>
            </div>
        );
    } else if (gameState.current_turn === 'player2' && !submitted) {
        return (
            <div>
                <p>For this round, (round: {gameState.data[gameState.data.length-1]['round']}), your High Blue urn, your Low Blue urn, and Player 1's jar
                are randomly assigned the following number of blue balls and red balls</p>
                <p>Your High Blue Urn - {gameState.data[gameState.data.length-1]['player2highbluecount']} blue balls and {(100-gameState.data[gameState.data.length-1]['player2highbluecount'])} red balls</p>
                <p>Your Low Blue Urn - {gameState.data[gameState.data.length-1]['player2lowbluecount']} blue balls and {(100-gameState.data[gameState.data.length-1]['player2lowbluecount'])} red balls</p>
                <p>Player1's Jar Quality: {gameState.data[gameState.data.length-1]['player1jartype']},
                {gameState.data[gameState.data.length-1]['player1bluecount']} blue balls
                and {(100-gameState.data[gameState.data.length-1]['player1bluecount'])} red balls</p>
                <Radio
                    checked={selectedValue === 'RejectOffer'}
                    onChange={handleChange}
                    value="RejectOffer"
                    label="Reject the jar offered by Player 1"
                />
                <Radio
                    checked={selectedValue === "MixWithHighBlue"}
                    onChange={handleChange}
                    value="MixWithHighBlue"
                    label="Mix Player 1's jar with your High Blue urn ({mix_high_blue} of 200 or {(mix_high_blue/200).toFixed(1)} balls are blue)"
                />
                <Radio
                    checked={selectedValue === "MixWithLowBlue"}
                    onChange={handleChange}
                    value="MixWithLowBlue"
                    label="Mix Player 1's jar with your Low Blue urn ({mix_low_blue} of 200 or {(mix_low_blue/200).toFixed(1)} balls are blue)"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
            </div>
        );
    } else if (gameState.current_turn === '' && submitted) {
        return (
            <div>
                Thank you for submitting your response. Waiting next round...
            </div>
        );

    }


}

export default Player2;