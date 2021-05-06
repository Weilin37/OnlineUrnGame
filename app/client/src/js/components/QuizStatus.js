import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import "../../css/app.css";
import { useSelector, useDispatch, batch } from "react-redux";
import { submitQuiz, finishQuiz, updateOnlineStatus, getData } from "../features/gameSlice";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const QuizStatus = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    // state
    const gameState = useSelector(state => state.game);
    const [quizPage, setQuizPage] = React.useState(1);
    const [explanationOpen, setExplanationOpen] = React.useState(false);
    const [currentExplanation, setCurrentExplanation] = React.useState();

    const [selectedValue1, setSelectedValue1] = React.useState();
    const [selectedValue2, setSelectedValue2] = React.useState();
    const [selectedValue3, setSelectedValue3] = React.useState();
    const [selectedValue4, setSelectedValue4] = React.useState({Accept:false,MixBlue:false,MixRed:false,Reject:false,Unclear:false});
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
        if (quizPage === 6) {
            batch(() => {
                dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                dispatch(getData("/api/get/readgame?room="+gameState.room));
                dispatch(updateOnlineStatus('/api/get/updateonlinestatus?player='+gameState.player+'&room='+gameState.room+'&round=1'));
            });
        }
    }, [timer]);

    const questions = {
        1:`If there are 50 blue balls and 50 red balls in the jar and 30 blue balls and 70 red balls in the urn,
                what is the percentage of blue balls in the urn after we mix in the balls from the jar?`,
        2:`If there are 49 blue balls and 51 red balls in the jar and 50 blue balls and 50 red balls
                in Player 2’s urn in a specific round of the study, would Player 2 want to mix the balls
                from the jar into his/her urn if he/she is trying to increase the chance that a blue ball
                is drawn randomly from the urn at the end of the round?`,
        3:`Assume that you know the exact numbers of blue balls in each urn (as Player 2 does).
                    If Player 2 received an offer and mixed the balls from Player 1’s jar to one of Player 2’s
                    urns with fewer blue balls than the jar, what is the chance of drawing a blue ball from
                    the urn after mixing relative to before mixing?`,
        4:`If Player 2 knows that the jar offered by Player 1 does not have 100 red balls or 100 blue balls, what
            should Player 2 NEVER do if one of his/her urns has 100 blue balls and the other urn 100 red balls?
            (Check ALL that applies)`,
        5:`If Player 1 believes that Player 2 will certainly reject his/her offer in a given round,
                    what would Player 1 most likely do?`
    }

    const answers = {
        1:'40%',
        2:'No',
        3:'Higher',
        4:{Accept:false,MixBlue:false,MixRed:false,Reject:false,Unclear:true},
        5:'DefiniteNo'
    }

    const explanations = {
        1:`Answer is 40%. Since the jar and the urn has the same number of balls in total and the jar has
                50% blue balls and the urn has 30% blue balls, the percentage of blue balls will be the
                average of the 2, or 40%. Another way to see this is that 50 blue balls from jar + 30 blue
                balls from urn = 80 blue balls in total. Dividing this by 200 balls (100 balls from jar and
                100 balls from urn), we get 40%.`,
        2:`Answer is No. The jar has 49% blue balls and the urn has 50% blue balls. Mixing a jar with lower
                percentage of blue balls that the urn will only lower the percentage of blue balls in the urn.
                So if the one wants to have the highest chance of drawing a blue ball, one would not mix and
                just draw from the urn.`,
        3:`Answer is Higher than before mixing. Before mixing, the urn has a lower percentage of blue balls. Since the
                jar has a higher percentage of blue balls, mixing will increase the percentage of blue balls in the
                urn. So if the one wants to have the highest chance of drawing a blue ball, one would mix.`,
        4:`Answer is Unclear with given information. It depends whether the mixed urn will provide good enough odds
                    for Player 2. For example, if Player 2 is given an jar with 99 blue balls and 1 red ball, the
                    mixed urn will still have a 99.5% chance of drawing a blue ball. While 99.5% is lower than 100%,
                    Player 2 might still find it worth his/her while to make the bet. On the other hand, if the jar
                    has fewer blue balls, say 1 blue ball and 99 red balls, mixing it with the urn with 100 blue
                    balls will now lower the chance of drawing a blue ball from 100% to 50.5%, drastically lowering
                    the chance of drawing a blue ball - while some more risk loving Player 2 might still want to
                    mix for a chance to win some earnings, some others might rather not take the gamble. Also, note
                    that Player 2 will never mix the jar with the urn with 100 red balls as mixing any given jar
                    with the urn with 100 blue balls will give him/her better odds of drawing blue balls`,
        5:`Answer is Definitely not make an offer to Player 2. This is because Player 1 will lose tokens if
                he/she made an offer to Player 2 and it was not accepted. Therefore, if Player 1 knows that the
                jar will be rejected, he/she will never offer it in the first place.`
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
        <FormControlLabel control={<Checkbox checked={selectedValue4.Accept} onChange={handleSelectChange} name="Accept" />} label="Accept any offer from Player 1" />,
        <FormControlLabel control={<Checkbox checked={selectedValue4.MixBlue} onChange={handleSelectChange} name="MixBlue" />} label="Mix the balls from Player 1’s jar with the urn with 100 blue balls" />,
        <FormControlLabel control={<Checkbox checked={selectedValue4.MixRed} onChange={handleSelectChange} name="MixRed" />} label="Mix the balls from Player 1’s jar with the urn with 100 red balls" />,
        <FormControlLabel control={<Checkbox checked={selectedValue4.Reject} onChange={handleSelectChange} name="Reject" />} label="Reject any offer from Player 1" />,
        <FormControlLabel control={<Checkbox checked={selectedValue4.Unclear} onChange={handleSelectChange} name="Unclear" />} label="Unclear with given information" />
    ];

    const question5 = [
        <FormControlLabel value="DefiniteYes" control={<Radio />} label="Definitely make an offer to Player 2" />,
        <FormControlLabel value="SomeChance" control={<Radio />} label="Make an offer to Player 2 with some chance" />,
        <FormControlLabel value="DefiniteNo" control={<Radio />} label="Definitely not make an offer to Player 2" />,
        <FormControlLabel value="Unclear" control={<Radio />} label="Unclear/Do not know" />
    ];

    const choices = [
        question1,
        question2,
        question3,
        question4,
        question5
    ];

    const images = [
        <img src="../../img/QuizQuestion1.png" />,
        <img src="../../img/QuizQuestion2.png" />,
        <img src="../../img/QuizQuestion3.png" />,
        <img src="../../img/QuizQuestion4.png" />,
        <img src="../../img/QuizQuestion5.png" />
    ];

    function getModalStyle() {
        return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }

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

    function isObjectEqual(objects) {
        const res =  objects.map((item) => {
            return Object.entries(item).flat().join()
        })
        return res.every((a) => {
            return a === res[0]
        })
    }

    function convertJSONtoString(json) {
        var string = '';
        for (const key in json) {
            string += key+' - '+json[key]+', ';
        }
        return string;
    }

    // Functions for Instructions
    function handleSubmit() {
        var answer;
        if (quizPage === 1) {
            answer = selectedValue1
            if (answers[quizPage] === answer) {
                batch(() => {
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                    setResponse1(true)
                    remainingQuestions.splice(remainingQuestions.indexOf(quizPage),1)
                    setRemainingQuestions(remainingQuestions)
                });
                if (remainingQuestions.length === 0) {
                    dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                    setQuizPage(6)
                }
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                batch(() => {
                    setCurrentExplanation(explanations[quizPage])
                    setExplanationOpen(true);
                    shuffle(question1)
                    setQuizPage(shuffle(remainingQuestions)[0]);
                    setSelectedValue1();
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                })
            }
        } else if (quizPage === 2) {
            answer = selectedValue2
            if (answers[quizPage] === answer) {
                batch(() => {
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                    setResponse2(true)
                    remainingQuestions.splice(remainingQuestions.indexOf(quizPage),1)
                    setRemainingQuestions(remainingQuestions)
                });
                if (remainingQuestions.length === 0) {
                    dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                    setQuizPage(6)
                }
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                batch(() => {
                    setCurrentExplanation(explanations[quizPage])
                    setExplanationOpen(true);
                    shuffle(question2)
                    setQuizPage(shuffle(remainingQuestions)[0]);
                    setSelectedValue2();
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                })
            }
        } else if (quizPage === 3) {
            answer = selectedValue3
            if (answers[quizPage] === answer) {
                batch(() => {
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                    setResponse3(true)
                    remainingQuestions.splice(remainingQuestions.indexOf(quizPage),1)
                    setRemainingQuestions(remainingQuestions)
                });
                if (remainingQuestions.length === 0) {
                    dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                    setQuizPage(6)
                }
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                batch(() => {
                    setCurrentExplanation(explanations[quizPage])
                    setExplanationOpen(true);
                    shuffle(question3)
                    setQuizPage(shuffle(remainingQuestions)[0]);
                    setSelectedValue3();
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                })
            }
        } else if (quizPage === 4) {
            answer = selectedValue4;
            if (isObjectEqual([answers[quizPage],answer])) {
                batch(() => {
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+convertJSONtoString(answer)
                    ));
                    setResponse4(true)
                    remainingQuestions.splice(remainingQuestions.indexOf(quizPage),1)
                    setRemainingQuestions(remainingQuestions)
                });
                if (remainingQuestions.length === 0) {
                    batch(() => {
                        dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                            '&room='+gameState.room+
                            '&question='+quizPage+
                            '&answer='+convertJSONtoString(answer)
                        ));
                        dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                    });
                    setQuizPage(6)
                }
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                batch(() => {
                    setCurrentExplanation(explanations[quizPage])
                    setExplanationOpen(true);
                    setQuizPage(shuffle(remainingQuestions)[0]);
                    shuffle(question4)
                    setSelectedValue4({Accept:false,MixBlue:false,MixRed:false,Reject:false,Unclear:false});
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+convertJSONtoString(answer)
                    ));
                })
            }
        } else if (quizPage === 5) {
            answer = selectedValue5
            if (answers[quizPage] === answer) {
                batch(() => {
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                    setResponse5(true)
                    remainingQuestions.splice(remainingQuestions.indexOf(quizPage),1)
                    setRemainingQuestions(remainingQuestions)
                });
                if (remainingQuestions.length === 0) {
                    dispatch(finishQuiz('/api/get/finishquiz?room='+gameState.room+'&player='+gameState.player));
                    setQuizPage(6)
                }
                else {setQuizPage(shuffle(remainingQuestions)[0])}
            } else {
                batch(() => {
                    setCurrentExplanation(explanations[quizPage])
                    setExplanationOpen(true);
                    shuffle(question5)
                    setQuizPage(shuffle(remainingQuestions)[0]);
                    setSelectedValue5();
                    dispatch(submitQuiz('/api/get/submitquiz?alias='+gameState.alias+
                        '&room='+gameState.room+
                        '&question='+quizPage+
                        '&answer='+answer
                    ));
                })
            }
        }
    }

    function handleRadioChange(event) {
        if (quizPage === 1) {setSelectedValue1(event.target.value)}
        else if (quizPage === 2) {setSelectedValue2(event.target.value)}
        else if (quizPage === 3) {setSelectedValue3(event.target.value)}
        else if (quizPage === 5) {setSelectedValue5(event.target.value)}
    }

    function handleSelectChange(event) {
        setSelectedValue4({ ...selectedValue4, [event.target.name]: event.target.checked });
    }

    function handleModalClose() {
        setExplanationOpen(false);
    }

    // render component
    if (quizPage === 4) {
        var question = questions[quizPage];
        var choice = choices[quizPage];
        var img = images[quizPage];

        return (
            <div>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <Typography className={classes.spacing} variant="h5" gutterBottom>
                            {question}
                        </Typography>
                        <FormControl className={classes.spacing} component="fieldset">
                          <FormGroup>
                            {choice.map(function(name, index){
                                return name;
                            })}
                          </FormGroup>
                          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                        </FormControl>
                    </Grid>
                    <Grid item align="center" xs={4} >
                        {img}
                    </Grid>
                </Grid>
                <Modal
                  open={explanationOpen}
                  onClose={handleModalClose}
                >
                    <Paper style={modalStyle} className={classes.paper}>{currentExplanation}</Paper>
                </Modal>
            </div>
        );
    } else if (quizPage < 6 && quizPage !== 4) {
        var question = questions[quizPage];
        var choice = choices[quizPage];
        var img = images[quizPage];

        return (
            <div>
                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item align="center" xs={8} >
                        <Typography className={classes.spacing} variant="h5" gutterBottom>
                            {question}
                        </Typography>
                        <FormControl className={classes.spacing} component="fieldset">
                          <RadioGroup onChange={handleRadioChange}>
                            {choice.map(function(name, index){
                                return name;
                            })}
                          </RadioGroup>
                          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit Response</Button>
                        </FormControl>
                    </Grid>
                    <Grid item align="center" xs={4} >
                        {img}
                    </Grid>
                </Grid>
                <Modal
                  open={explanationOpen}
                  onClose={handleModalClose}
                >
                    <Paper style={modalStyle} className={classes.paper}>{currentExplanation}</Paper>
                </Modal>
            </div>
        );
    } else if (quizPage === 6) {
        return (
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item align="center" xs={8} >
                      <Typography className={classes.spacing} variant="h5" gutterBottom>
                        Quiz finished! Waiting for other player to finish...
                      </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default QuizStatus;