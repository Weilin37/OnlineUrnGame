import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { getData, setInstructions, updateOnlineStatus } from "../features/gameSlice";
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

import InstructionsPlayer1Status from "./InstructionsPlayer1Status";
import InstructionsPlayer2Status from "./InstructionsPlayer2Status";
import InstructionsPlayer1Holistic from "./InstructionsPlayer1Holistic";
import InstructionsPlayer2Holistic from "./InstructionsPlayer2Holistic";

const Instructions = () => {
    const dispatch = useDispatch();
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

    // state
    const gameState = useSelector(state => state.game);

    // render component
    if (gameState.player === 'player1' && gameState.treatment === 'status_quo') {
        return <InstructionsPlayer1Status />
    } else if (gameState.player === 'player2' && gameState.treatment === 'status_quo'){
        return <InstructionsPlayer2Status />
    } else if (gameState.player === 'player1' && gameState.treatment === 'holistic') {
        return <InstructionsPlayer1Holistic />
    } else if (gameState.player === 'player2' && gameState.treatment === 'holistic'){
        return <InstructionsPlayer2Holistic />
    }

}

export default Instructions;