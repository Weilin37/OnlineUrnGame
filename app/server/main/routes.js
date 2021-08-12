var express = require('express')
var router = express.Router()
var pool = require('./db')

// random number generator
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Setup player 1 jar
function setupPlayer1jar() {
    var coin_toss = (Math.floor(Math.random() * 2) == 0);
    var jartype;
    var bluecount;

    if (coin_toss) {jartype = 'high_quality'}
    else {jartype = 'low_quality'}

    if (jartype === 'high_quality') {
        bluecount = randomNum(70,100)
    } else if (jartype == 'low_quality') {
        bluecount = randomNum(0,70)
    }

    return({'player1jartype': jartype, 'player1bluecount': bluecount})
}

// Setup player 2 jar
function setupPlayer2jar() {
    var highbluecount = randomNum(40,100);
    var lowbluecount = randomNum(0,60);

    return({'player2highbluecount': highbluecount, 'player2lowbluecount': lowbluecount})
}

// Setup treatment arm
function setupTreatmentArm() {
    var coin_toss = (Math.floor(Math.random() * 2) == 0);
    var treatment;

    if (coin_toss) {treatment = 'status_quo'}
    else {treatment = 'holistic'}

    return(treatment)
}

// Setup room code
function setupRoomCode() {
    var length = 5;
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return(result.join(''))
}

// create game
router.get('/api/get/creategame', (req,res,next) => {

    var round = 1;

    var player1jar = setupPlayer1jar();
    var player2jar = setupPlayer2jar();

    var player1jartype = player1jar['player1jartype']
    var player1bluecount = player1jar['player1bluecount']
    var player2highbluecount = player2jar['player2highbluecount']
    var player2lowbluecount = player2jar['player2lowbluecount']
    var treatment = setupTreatmentArm();
    var room = setupRoomCode();
    var finish_code_player1 = '';
    var finish_code_player2 = '';

    var player = req.query.player;
    var player1name = '';
    var player2name = '';

    var startingearnings = 500;

    if (player === 'player1') {
        player1name = req.query.alias;
        finish_code_player1 = player1name+setupRoomCode();
    } else if (player === 'player2') {
        player2name = req.query.alias;
        finish_code_player2 = player2name+setupRoomCode();
    }


    pool.query(`insert into public.game_state(
            room,
            treatment,
            round,
            roundcomplete,
            player1action,
            player2action,
            player1jartype,
            player1bluecount,
            player2highbluecount,
            player2lowbluecount,
            player1earnings,
            player2earnings,
            player1name,
            player2name,
            player1_ready,
            player2_ready,
            player1_quiz_finished,
            player2_quiz_finished,
            finish_code_player1,
            finish_code_player2
        )
        VALUES (
            '${room}',
            '${treatment}',
            '${round}',
            null,
            null,
            null,
            '${player1jartype}',
            '${player1bluecount}',
            '${player2highbluecount}',
            '${player2lowbluecount}',
            ${startingearnings},
            ${startingearnings},
            '${player1name}',
            '${player2name}',
            false,
            false,
            false,
            false,
            '${finish_code_player1}',
            '${finish_code_player2}'
        )
        RETURNING *`,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })

})

// Create quiz
router.get('/api/get/submitquiz', (req,res,next) => {
    var alias = req.query.alias;
    var room = req.query.room;
    var question = req.query.question;
    var answer = req.query.answer;

    pool.query(`insert into public.quiz_results (
            room,
            alias,
            question,
            answer
        )
        VALUES (
            '${room}',
            '${alias}',
            '${question}',
            '${answer}'
        )`,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })
})

// Finish quiz
router.get('/api/get/finishquiz', (req,res,next) => {
    var player = req.query.player;
    var room = req.query.room;

    if (player === 'player1') {
        pool.query(`update public.game_state
            set player1_quiz_finished = true
            where room = '${room}'
            and round = '1'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
            res.json(q_res.rows)
        })
    } else if (player === 'player2') {
        pool.query(`update public.game_state
            set player2_quiz_finished = true
            where room = '${room}'
            and round = '1'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
        })
    }
})

// create new round
router.get('/api/get/createnewround', (req,res,next) => {

    var round = req.query.round;

    var player1jar = setupPlayer1jar();
    var player2jar = setupPlayer2jar();

    var player1jartype = player1jar['player1jartype']
    var player1bluecount = player1jar['player1bluecount']
    var player2highbluecount = player2jar['player2highbluecount']
    var player2lowbluecount = player2jar['player2lowbluecount']
    var treatment = req.query.treatment;
    var room = req.query.room;

    var player1name = req.query.player1name;
    var player2name = req.query.player2name;

    var player1earnings = req.query.player1earnings;
    var player2earnings = req.query.player2earnings;

    var finish_code_player1 = req.query.finish_code_player1;
    var finish_code_player2 = req.query.finish_code_player2;

    pool.query(`insert into public.game_state(
            room,
            treatment,
            round,
            roundcomplete,
            player1action,
            player2action,
            player1jartype,
            player1bluecount,
            player2highbluecount,
            player2lowbluecount,
            player1earnings,
            player2earnings,
            player1name,
            player2name,
            player1_ready,
            player2_ready,
            player1_quiz_finished,
            player2_quiz_finished,
            finish_code_player1,
            finish_code_player2
        )
        VALUES (
            '${room}',
            '${treatment}',
            '${round}',
            null,
            null,
            null,
            '${player1jartype}',
            '${player1bluecount}',
            '${player2highbluecount}',
            '${player2lowbluecount}',
            '${player1earnings}',
            '${player2earnings}',
            '${player1name}',
            '${player2name}',
            false,
            false,
            true,
            true,
            '${finish_code_player1}',
            '${finish_code_player2}'
        )
        RETURNING *`,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })

})

// join game
router.get('/api/get/joingame', (req,res,next) => {
    var player = req.query.player;
    var playername = req.query.alias;

    if (player === 'player1') {
        player1name = req.query.alias;
        finish_code_player1 = player1name+setupRoomCode();
    } else if (player === 'player2') {
        player2name = req.query.alias;
        finish_code_player2 = player2name+setupRoomCode();
    }

    if (player === 'player1') {
         pool.query(`update public.game_state
             set player1name = '${playername}',
             finish_code_player1 = '${player1name+setupRoomCode()}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
                    if (q_err) {
                        console.log(q_err);
                        return next(q_err);
                    }
                    res.json(q_res.rows)
         })
    } else if (player === 'player2') {
         pool.query(`update public.game_state
             set player2name = '${playername}',
             finish_code_player2 = '${player2name+setupRoomCode()}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
                    if (q_err) {
                        console.log(q_err);
                        return next(q_err);
                    }
                    res.json(q_res.rows)
         })
    }

})

// resume game
router.get('/api/get/resumegame', (req,res,next) => {
    var room = req.query.room;

    pool.query(`select *, '${req.query.alias}' as current_alias from public.game_state
        where room = '${req.query.room}'`,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })
})

// read game data
router.get('/api/get/readgame', (req,res,next) => {
	pool.query(`select *,
        CASE
            when EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) IS NOT NULL
            AND EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) < 5
            THEN true
        ELSE
            false
        END as player1_online,
        CASE
            when EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) IS NOT NULL
            AND EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) < 5
            THEN true
        ELSE
            false
        END as player2_online
         from public.game_state
         where room = '${req.query.room}'
         ORDER BY round::numeric asc`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
    })

})

// get new game data for waiting room
router.get('/api/get/newgame', (req,res,next) => {
	pool.query(`select room,
	        treatment,
	        player1name,
	        player2name,
	        EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) as player1_lastseen,
	        EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) as player2_lastseen,
            CASE
                when EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) IS NOT NULL
                AND EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) IS NOT NULL
                AND EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) < 5
                AND EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) < 5
                THEN true
            ELSE
                false
            END as both_online
            from public.game_state
            where (player1name is null or player1name = '' or player2name is null or player2name = '')
            and (
                (EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) < 5 AND player2_lastseen is null)
                OR
                (EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) < 5 AND player1_lastseen is null)
            )
            and round::numeric = 1
            limit 1`,
		(q_err, q_res) => {
			if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })
})

// get updated waiting room information
router.get('/api/get/updatewaitingroom', (req,res,next) => {
	pool.query(`select room,
	        treatment,
	        player1name,
	        player2name,
	        EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) as player1_lastseen,
	        EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) as player2_lastseen,
            CASE
                when EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) IS NOT NULL
                AND EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) IS NOT NULL
                AND EXTRACT(EPOCH FROM (NOW() - player1_lastseen)) < 5
                AND EXTRACT(EPOCH FROM (NOW() - player2_lastseen)) < 5
                THEN true
            ELSE
                false
            END as both_online
            from public.game_state
            where room = '${req.query.room}'
            and round::numeric = 1
            limit 1`,
		(q_err, q_res) => {
			if (q_err) {
                console.log(q_err);
                return next(q_err);
            }
            res.json(q_res.rows)
    })
})

// update game data
router.get('/api/get/senddata', (req,res,next) => {
    var room = req.query.room;
    var player = req.query.player;
    var round = req.query.round;
    var data = req.query.data;


    if (player === 'player1') {
    	pool.query(`update public.game_state
            set player1action = '${data}'
            where room = '${room}'
            and round = '${round}'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
        })
    } else if (player === 'player2') {
        var treatment = req.query.treatment;
        var player1action = req.query.player1action;

        var player1bluecount = parseInt(req.query.player1bluecount);
        var player2highbluecount = parseInt(req.query.player2highbluecount);
        var player2lowbluecount = parseInt(req.query.player2lowbluecount);


        //earnings logic
        if (treatment === 'status_quo') {
            var totalbluecount;
            var bluehighprobability;
            var bluelowprobability;

            const drawings_high = Math.random();
            const drawings_low = Math.random();

            console.log(drawings_high);
            console.log(drawings_low);

            var drawn_ball;
            var drawn_ball_low;
            var drawn_ball_high;

            var player1earnings = 0;
            var player2earnings = 0;

            //C
            var player1rewardsingle = 0
            var player1rewardboth = 10;
            //D
            var player1penalty = -30;
            //Pi
            var player2reward = 25;
            //S
            var player2penalty = -100;

            if (player1action === 'NoOffer') {
                player1earnings = 0;
                player2earnings = 0;
                bluelowprobability = player2lowbluecount/100;
                bluehighprobability = player2highbluecount/100;
                drawn_ball = 'NA';

                if (drawings_low <= bluelowprobability) {
                    drawn_ball_low = 'blue';
                } else {
                    drawn_ball_low = 'red'
                }

                if (drawings_high <= bluehighprobability) {
                    drawn_ball_high = 'blue'
                } else {
                    drawn_ball_high = 'red'
                }

            } else if (player1action === 'Offer') {
                if (data === 'RejectOffer') {
                    player1earnings += player1penalty;
                    player2earnings = 0;
                    drawn_ball = 'NA';
                    bluelowprobability = player2lowbluecount/100;
                    bluehighprobability = player2highbluecount/100;

                    if (drawings_low <= bluelowprobability) {
                        drawn_ball_low = 'blue';
                    } else {
                        drawn_ball_low = 'red'
                    }

                    if (drawings_high <= bluehighprobability) {
                        drawn_ball_high = 'blue'
                    } else {
                        drawn_ball_high = 'red'
                    }

                } else if (data === 'MixWithHighBlue') {
                    totalbluecount = player1bluecount+player2highbluecount; //new
                    bluehighprobability = (totalbluecount/200); //new
                    bluelowprobability = player2lowbluecount/100;
                    player1earnings += player1rewardsingle;

                    if (drawings_high <= bluehighprobability) {
                        drawn_ball = 'blue ball';
                        drawn_ball_high = 'blue'
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red ball';
                        drawn_ball_high = 'red'
                        player2earnings += player2penalty;
                    }

                    if (drawings_low <= bluelowprobability) {
                        drawn_ball_low = 'blue';
                    } else {
                        drawn_ball_low = 'red'
                    }

                } else if (data === 'MixWithLowBlue') {
                    totalbluecount = player1bluecount+player2lowbluecount; //new
                    bluelowprobability = (totalbluecount/200); //new
                    bluehighprobability = player2highbluecount/100;
                    player1earnings += player1rewardsingle;

                    if (drawings_low <= bluelowprobability) {
                        drawn_ball = 'blue ball';
                        drawn_ball_low = 'blue';
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red ball';
                        drawn_ball_low = 'red'
                        player2earnings += player2penalty;
                    }

                    if (drawings_high <= bluehighprobability) {
                        drawn_ball_high = 'blue'
                    } else {
                        drawn_ball_high = 'red'
                    }
                } else if (data === 'MixWithBothBlue') {
                    bluelowprobability = ((player1bluecount+player2lowbluecount)/200); //new
                    bluehighprobability = ((player1bluecount+player2highbluecount)/200); //new
                    player1earnings += player1rewardboth;

                    if (drawings_low <= bluelowprobability) {
                        drawn_ball = 'blue ball';
                        drawn_ball_low = 'blue';
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red ball';
                        drawn_ball_low = 'red'
                        player2earnings += player2penalty;
                    }

                    if (drawings_high <= bluehighprobability) {
                        drawn_ball_high = 'blue'
                        player2earnings += player2reward;
                    } else {
                        drawn_ball_high = 'red'
                        player2earnings += player2penalty;
                    }

                }
            }
        } else if (treatment === 'holistic') {
            var totalbluecounthigh;
            var totalbluecountlow;

            var blueprobabilityhigh;
            var blueprobabiltiylow;

            const drawings_high = Math.random();
            const drawings_low = Math.random();

            var drawn_ball_high;
            var drawn_ball_low;

            var player1earnings = 0;
            var player2earnings = 0;

            //q
            var player1reward = 16;
            var player1penalty = -8;
            //p
            var player2reward = 20;
            var player2penalty = -10;

            if (player1action === 'NoOffer') {
                blueprobabilityhigh = (player2highbluecount/100);
                blueprobabiltiylow = (player2lowbluecount/100);

                if (drawings_high <= blueprobabilityhigh) {
                    drawn_ball = 'blue';
                    drawn_ball_high = 'blue'
                    player1earnings += player1reward;
                    player2earnings += player2reward;
                } else {
                    drawn_ball = 'red';
                    drawn_ball_high = 'red'
                    player1earnings += player1penalty;
                    player2earnings += player2penalty;
                }

                if (drawings_low <= blueprobabiltiylow) {
                    if (drawn_ball === 'blue') {
                        drawn_ball = '2 blue balls'
                        drawn_ball_low = 'blue'
                    } else if (drawn_ball === 'red') {
                        drawn_ball = '1 blue and 1 red'
                        drawn_ball_low = 'blue'
                    }
                    player1earnings += player1reward;
                    player2earnings += player2reward;
                } else {
                    if (drawn_ball === 'blue') {
                        drawn_ball = '1 blue and 1 red'
                        drawn_ball_low = 'red'
                    }
                    else if (drawn_ball === 'red') {
                        drawn_ball = '2 red balls'
                        drawn_ball_low = 'red'
                    }
                    player1earnings += player1penalty;
                    player2earnings += player2penalty;
                }
            } else if (player1action === 'Offer') {
                if (data === 'RejectOffer') {
                    blueprobabilityhigh = (player2highbluecount/100);
                    blueprobabiltiylow = (player2lowbluecount/100);

                    if (drawings_high <= blueprobabilityhigh) {
                        drawn_ball = 'blue';
                        drawn_ball_high = 'blue';
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red';
                        drawn_ball_high = 'red'
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }

                    if (drawings_low <= blueprobabiltiylow) {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '2 blue balls'
                            drawn_ball_low = 'blue'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'blue'
                        }
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'red'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '2 red balls'
                            drawn_ball_low = 'red'
                        }
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }
                } else if (data === 'MixWithHighBlue') {
                    totalbluecounthigh = player1bluecount+player2highbluecount; //new
                    totalbluecountlow = player2lowbluecount;

                    blueprobabilityhigh = (totalbluecounthigh/200); //new
                    blueprobabiltiylow = (totalbluecountlow/100);

                    if (drawings_high <= blueprobabilityhigh) {
                        drawn_ball = 'blue';
                        drawn_ball_high = 'blue'
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red';
                        drawn_ball_high = 'red'
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }

                    if (drawings_low <= blueprobabiltiylow) {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '2 blue balls'
                            drawn_ball_low = 'blue'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'blue'
                        }
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'red'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '2 red balls'
                            drawn_ball_low = 'red'
                        }
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }
                } else if (data === 'MixWithLowBlue') {
                    totalbluecounthigh = player2highbluecount;
                    totalbluecountlow = player1bluecount+player2lowbluecount;

                    blueprobabilityhigh = (totalbluecounthigh/100);
                    blueprobabiltiylow = (totalbluecountlow/200);

                    if (drawings_high <= blueprobabilityhigh) {
                        drawn_ball = 'blue';
                        drawn_ball_high = 'blue'
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red';
                        drawn_ball_high = 'red'
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }

                    if (drawings_low <= blueprobabiltiylow) {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '2 blue balls'
                            drawn_ball_low = 'blue'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'blue'
                        }
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'red'
                        } else if (drawn_ball === 'red') {
                            drawn_ball = '2 red balls'
                            drawn_ball_low = 'red'
                        }
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }
                } else if (data === 'MixWithBothBlue') {
                    blueprobabilityhigh = ((player1bluecount+player2highbluecount)/200);
                    blueprobabiltiylow = ((player1bluecount+player2lowbluecount)/200);

                    if (drawings_high <= blueprobabilityhigh) {
                        drawn_ball = 'blue';
                        drawn_ball_high = 'blue'
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        drawn_ball = 'red';
                        drawn_ball_high = 'red'
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }

                    if (drawings_low <= blueprobabiltiylow) {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '2 blue balls'
                            drawn_ball_low = 'blue'
                        }
                        else if (drawn_ball === 'red') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'blue'
                        }
                        player1earnings += player1reward;
                        player2earnings += player2reward;
                    } else {
                        if (drawn_ball === 'blue') {
                            drawn_ball = '1 blue and 1 red'
                            drawn_ball_low = 'red'
                        } else if (drawn_ball === 'red') {
                            drawn_ball = '2 red balls'
                            drawn_ball_low = 'red'
                        }
                        player1earnings += player1penalty;
                        player2earnings += player2penalty;
                    }
                }
            }
        }
        pool.query(`update public.game_state
            set player2action = '${data}',
            roundcomplete = true,
            drawn_ball = '${drawn_ball}',
            drawn_low = '${drawn_ball_low}',
            drawn_high = '${drawn_ball_high}',
            player1earnings = (player1earnings::numeric+${player1earnings}),
            player2earnings = (player2earnings::numeric+${player2earnings}),
            player1earnings_difference = ${player1earnings},
            player2earnings_difference = ${player2earnings}
            where room = '${room}'
            and round = '${round}'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
        })
    }
})

// Update player ready
router.get('/api/get/sendready', (req,res,next) => {
    var room = req.query.room;
    var player = req.query.player;
    var round = req.query.round;
    var data = req.query.data;

    if (player === 'player1') {
    	pool.query(`update public.game_state
            set player1_ready = ${data}
            where room = '${room}'
            and round = '${round}'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
        })
    } else if (player === 'player2') {
        pool.query(`update public.game_state
            set player2_ready = ${data}
            where room = '${room}'
            and round = '${round}'`,
            (q_err, q_res) => {
                if (q_err) {
                    console.log(q_err);
                    return next(q_err);
                }
                res.json(q_res.rows)
        })
    }
})

// update online status
router.get('/api/get/updateonlinestatus', (req,res,next) => {
    var player = req.query.player;
    var current_datetime = new Date().toISOString();

    if (player === 'player1') {
         pool.query(`update public.game_state
             set player1_lastseen = '${current_datetime}'
             where room = '${req.query.room}'
             and round = '${req.query.round}'`,
                (q_err, q_res) => {
                    if (q_err) {
                        console.log(q_err);
                        return next(q_err);
                    }
                    res.json(q_res.rows)
         })
    } else if (player === 'player2') {
         pool.query(`update public.game_state
             set player2_lastseen = '${current_datetime}'
             where room = '${req.query.room}'
             and round = '${req.query.round}'`,
                (q_err, q_res) => {
                    if (q_err) {
                        console.log(q_err);
                        return next(q_err);
                    }
                    res.json(q_res.rows)
         })
    }

})

module.exports = router