import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { sendData } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

const Player1 = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    const [selectedValue, setSelectedValue] = React.useState();

    // Enter decision
    function handleSubmit() {
        dispatch(sendData('/api/get/senddata?player='+gameState.player+'&room='+gameState.room+'&round='+gameState.data[gameState.data.length-1]['round']+'&data='+selectedValue))
    }

    function handleChange(event) {
        setSelectedValue(event.target.value)
    }

    // render component
    if (gameState.current_turn === 'player1') {
        return (
            <div >
                <p>For this round, (round: {gameState.data[gameState.data.length-1]['round']}) you are randomly assigned the following type of jar: {gameState.data[gameState.data.length-1]['player1jartype']}</p>
                <p>Now, please select an action by clicking a box below for the current round of the study.
                Player2 will then decide whether to reject this offer or accept this offer to mix your jar with one of their urns.
                After that, we''ll go to the next round, and so on until round 10</p>
                <Radio
                    checked={selectedValue === 'Offer'}
                    onChange={handleChange}
                    value="Offer"
                    label="Offer your jar to Player 2"
                />
                <Radio
                    checked={selectedValue === 'NoOffer'}
                    onChange={handleChange}
                    value="NoOffer"
                    label="Do not offer your jar to Player 2"
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
            </div>
        );
    } else if (gameState.current_turn === 'player2') {
        return (
            <div >
                <p>Choice submitted. Waiting for Player 2 to choose...</p>
            </div>
        );
    }

}

export default Player1;