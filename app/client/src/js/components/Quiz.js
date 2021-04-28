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

const Quiz = () => {
    const dispatch = useDispatch();

    // state
    const gameState = useSelector(state => state.game);
    const [quizPage, setQuizPage] = React.useState(1);

    const [selectedValue1, setSelectedValue1] = React.useState();
    const [selectedValue2, setSelectedValue2] = React.useState();
    const [selectedValue3, setSelectedValue3] = React.useState();
    const [selectedValue4, setSelectedValue4] = React.useState();
    const [selectedValue5, setSelectedValue5] = React.useState();

    const [response1, setResponse1] = React.useState(false);
    const [response2, setResponse2] = React.useState(false);
    const [response3, setResponse3] = React.useState(false);
    const [response4, setResponse4] = React.useState(false);
    const [response5, setResponse5] = React.useState(false);

    const [remainingQuestions, setRemainingQuestions] = React.useState([1,2,3,4,5])

    const [timer, setTimer] = React.useState(0);

    const interval = setTimeout(() => {
        setTimer(timer+1);
    }, 1000);

    // Read Game State
    useEffect(() => {
        if (response1 && response2 && response3 && response4 && response5) {
            batch(() => {
                dispatch(getData("/api/get/readgame?room="+gameState.room));
                dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room+'&round=1'));
            });
        }
    }, [timer]);

    const answers = {
        1:'40%',
        2:'No',
        3:'Higher',
        4:'Accept',
        5:'DefiniteYes'
    }

    const explanations = {
        1:'',
        2:'',
        3:'',
        4:'',
        5:''
    }

    const question1 = [
        <FormControlLabel value="30%" control={<Radio />} label="30%" />,
        <FormControlLabel value="40%" control={<Radio />} label="40%" />,
        <FormControlLabel value="50%" control={<Radio />} label="50%" />,
        <FormControlLabel value="60%" control={<Radio />} label="60%" />,
        <FormControlLabel value="70%" control={<Radio />} label="70%" />,
        <FormControlLabel value="80%" control={<Radio />} label="80%" />
    ];

    const question2 = [
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />,
        <FormControlLabel value="No" control={<Radio />} label="No" />,
        <FormControlLabel value="Unclear" control={<Radio />} label="Unclear" />
    ];

    const question3 = [
        <FormControlLabel value="Same" control={<Radio />} label="Same as before the mixing" />,
        <FormControlLabel value="Higher" control={<Radio />} label="Higher than before mixing" />,
        <FormControlLabel value="Lower" control={<Radio />} label="Lower than before mixing" />,
        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
    ];

    const question4 = [
        <FormControlLabel value="Accept" control={<Radio />} label="Accept any offer from Player 1" />,
        <FormControlLabel value="MixBlue" control={<Radio />} label="Mix the balls from Player 1’s urn with the urn with 100 blue balls" />,
        <FormControlLabel value="MixRed" control={<Radio />} label="Mix the balls from Player 1’s urn with the urn with 100 red balls" />,
        <FormControlLabel value="Reject" control={<Radio />} label="Reject any offer from Player 1" />
    ];

    const question5 = [
        <FormControlLabel value="DefiniteYes" control={<Radio />} label="Definitely make an offer to Player 2" />,
        <FormControlLabel value="SomeChance" control={<Radio />} label="Make an offer to Player 2 with some chance" />,
        <FormControlLabel value="DefiniteNo" control={<Radio />} label="Definitely not make an offer to Player 2" />,
        <FormControlLabel value="Unclear" control={<Radio />} label="Unclear/Do not know" />
    ];

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player))
    // Functions for Instructions
    function handleSubmit() {
        var answer;
        if (quizPage === 1) {
            console.log(response1);
            console.log(remainingQuestions);
            answer = selectedValue1
            if (answers[quizPage] === answer) {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                setResponse1(true)
                setRemainingQuestions(remainingQuestions.splice(1,1))
                if (remainingQuestions.length === 0) {setQuizPage(6)}
                else {setQuizPage(shuffle(remainingQuestions)[0])}
                console.log(response1);
                console.log(remainingQuestions);
            } else {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                shuffle(question1)
                setQuizPage(shuffle(remainingQuestions)[0]);
                console.log(response1);
                console.log(remainingQuestions);
            }
        } else if (quizPage === 2) {
            answer = selectedValue2
            if (answers[quizPage] === answer) {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                setResponse2(true)
                setRemainingQuestions(remainingQuestions.splice(1,1))
                if (remainingQuestions.length === 0) {setQuizPage(6)}
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                shuffle(question2)
                setQuizPage(shuffle(remainingQuestions)[0]);
            }
        } else if (quizPage === 3) {
            answer = selectedValue3
            if (answers[quizPage] === answer) {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                setResponse3(true)
                setRemainingQuestions(remainingQuestions.splice(2,1))
                if (remainingQuestions.length === 0) {setQuizPage(6)}
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                shuffle(question3)
                setQuizPage(shuffle(remainingQuestions)[0]);
            }
        } else if (quizPage === 4) {
            answer = selectedValue4
            if (answers[quizPage] === answer) {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                setResponse4(true)
                setRemainingQuestions(remainingQuestions.splice(3,1))
                if (remainingQuestions.length === 0) {setQuizPage(6)}
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                shuffle(question4)
                setQuizPage(shuffle(remainingQuestions)[0]);
            }
        } else if (quizPage === 5) {
            answer = selectedValue5
            if (answers[quizPage] === answer) {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                setResponse5(true)
                setRemainingQuestions(remainingQuestions.splice(4,1))
                if (remainingQuestions.length === 0) {setQuizPage(6)}
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                    '&room='+gameState.room+
                    '&question='+quizPage+
                    '&answer='+answer
                ));
                shuffle(question5)
                setQuizPage(shuffle(remainingQuestions)[0]);
            }
        }
    }

    function handleSelectChange(event) {
        if (quizPage === 1) {setSelectedValue1(event.target.value)}
        else if (quizPage === 2) {setSelectedValue2(event.target.value)}
        else if (quizPage === 3) {setSelectedValue3(event.target.value)}
        else if (quizPage === 4) {setSelectedValue4(event.target.value)}
        else if (quizPage === 5) {setSelectedValue5(event.target.value)}
    }

    // render component
    if (quizPage === 1) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <FormControl component="fieldset">
                      <Typography variant="h5" gutterBottom>
                        If there are 50 blue balls and 50 red balls in the jar and 30 blue balls and
                        70 red balls in the urn, what is the percentage of blue balls in the urn after we mix
                        in the balls from the jar?
                      </Typography>
                      <RadioGroup aria-label="question1" name="question1" onChange={handleSelectChange}>
                        {question1.map(function(name, index){
                            return name;
                        })}
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                </Grid>
            </Grid>
        );
    } else if (quizPage === 2) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <FormControl component="fieldset">
                      <Typography variant="h5" gutterBottom>
                        If there are 49 blue balls and 51 red balls in the jar and 50 blue balls and 50 red balls
                        in Player 2’s urn in a specific round of the study, would Player 2 want to mix the balls
                        from the jar into his/her urn if he/she is trying to increase the chance that a blue ball
                        is drawn randomly from the urn at the end of the round?
                      </Typography>
                      <RadioGroup aria-label="question2" name="question2" onChange={handleSelectChange}>
                        {question2.map(function(name, index){
                            return name;
                        })}
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                </Grid>
            </Grid>
        );
    } else if (quizPage === 3) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <FormControl component="fieldset">
                      <Typography variant="h5" gutterBottom>
                        Assume that you know the exact numbers of blue balls in each urn (as Player 2 does).
                        If Player 2 received an offer and mixed the balls from Player 1’s jar to one of Player 2’s
                        urns with fewer blue balls than the jar, what is the chance of drawing a blue ball from
                        the urn after mixing relative to before mixing?
                      </Typography>
                      <RadioGroup aria-label="question3" name="question3" onChange={handleSelectChange}>
                        {question3.map(function(name, index){
                            return name;
                        })}
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                </Grid>
            </Grid>
        );
    } else if (quizPage === 4) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <FormControl component="fieldset">
                      <Typography variant="h5" gutterBottom>
                        What should Player 2 NEVER do if one of his/her urns has 100 blue balls and the
                        other urn 100 red balls?
                      </Typography>
                      <RadioGroup aria-label="question4" name="question4" onChange={handleSelectChange}>
                        {question4.map(function(name, index){
                            return name;
                        })}
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                </Grid>
            </Grid>
        );
    } else if (quizPage === 5) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                    <FormControl component="fieldset">
                      <Typography variant="h5" gutterBottom>
                        If Player 1 believes that Player 2 will certainly reject his/her offer in a given round,
                        what would Player 1 most likely do?
                      </Typography>
                      <RadioGroup aria-label="question5" name="question5" onChange={handleSelectChange}>
                        {question5.map(function(name, index){
                            return name;
                        })}
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item align="center" xs={8}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                </Grid>
            </Grid>
        );
    } else if (quizPage === 6) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                      <Typography variant="h5" gutterBottom>
                        Quiz finished! Waiting for other player to finish...
                      </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default Quiz;