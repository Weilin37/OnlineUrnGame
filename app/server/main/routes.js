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
        bluecount = randomNum(80,100)
    } else if (jartype == 'low_quality') {
        bluecount = randomNum(0,80)
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

    var player = req.query.player;
    var player1name = '';
    var player2name = '';

    if (player === 'player1') {player1name = req.query.alias;}
    else if (player === 'player2') {player2name = req.query.alias;}


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
            player2name
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
            5,
            5,
            '${player1name}',
            '${player2name}'
        )
        RETURNING *`,
        (q_err, q_res) => {
            res.json(q_res.rows)
    })

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
            player2name
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
            '${player2name}'
        )
        RETURNING *`,
        (q_err, q_res) => {
            res.json(q_res.rows)
    })

})

// join game
router.get('/api/get/joingame', (req,res,next) => {
    var player = req.query.player;
    var playername = req.query.alias;

    if (player === 'player1') {
         pool.query(`update public.game_state
             set player1name = '${playername}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
                    res.json(q_res.rows)
         })
    } else if (player === 'player2') {
         pool.query(`update public.game_state
             set player2name = '${playername}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
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
         where room::numeric = '${req.query.room}'
         ORDER BY round asc`,
            (q_err, q_res) => {
                res.json(q_res.rows)
    })

})

// get new game data for waiting room
router.get('/api/get/newgame', (req,res,next) => {
	pool.query(`select room,
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
            and round::numeric = 1
            limit 1`,
		(q_err, q_res) => {
			res.json(q_res.rows)
    })
})

// get updated waiting room information
router.get('/api/get/updatewaitingroom', (req,res,next) => {
	pool.query(`select room,
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
                res.json(q_res.rows)
        })
    } else if (player === 'player2') {
        pool.query(`update public.game_state
            set player2action = '${data}',
            roundcomplete = true
            where room = '${room}'
            and round = '${round}'`,
            (q_err, q_res) => {
                res.json(q_res.rows)
        })
    }
})

// update online status
router.get('/api/get/updateonlinestatus', (req,res,next) => {
    var player = req.query.player;
    var playername = req.query.alias;
    var current_datetime = new Date().toISOString();

    if (player === 'player1') {
         pool.query(`update public.game_state
             set player1_lastseen = '${current_datetime}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
                    res.json(q_res.rows)
         })
    } else if (player === 'player2') {
         pool.query(`update public.game_state
             set player2_lastseen = '${current_datetime}'
             where room = '${req.query.room}'`,
                (q_err, q_res) => {
                    res.json(q_res.rows)
         })
    }

})

module.exports = router