import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { submitQuiz, finishQuiz, updateOnlineStatus, getData } from "../features/gameSlice";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import QuizStatus from "./QuizStatus";
import QuizHolistic from "./QuizHolistic";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
  }
}));

const Quiz = () => {
    // state
    const gameState = useSelector(state => state.game);

    // render component
    if (gameState.treatment === 'status_quo') {
        return <QuizStatus />
    } else if (gameState.treatment === 'holistic') {
        return <QuizHolistic />
    }

}

export default Quiz;