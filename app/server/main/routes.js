var express = require('express')
var router = express.Router()
var pool = require('./db')

// Get global level data
router.get('/api/get/readgame', (req,res,next) => {
	pool.query(`select *
	 from public.test
	 where room = '${req.query.room}'`,
		(q_err, q_res) => {
			res.json(q_res.rows)
    })
})

// Get global level data
router.get('/api/get/sendgame', (req,res,next) => {
    var room = req.query.room;
    var player = req.query.player;
    var data = req.query.data;

    console.log(`insert into public.test(room, sequence, player, data)
	select
	'${room}',
	(select (COALESCE(max(sequence),0)+1) from public.test where room = '${room}') as sequence,
	'${player}',
	'${data}'
	RETURNING *`);

	pool.query(`insert into public.test(room, sequence, player, data)
	select
	'${room}',
	(select (COALESCE(max(sequence),0)+1) from public.test where room = '${room}') as sequence,
	'${player}',
	'${data}'`,
		(q_err, q_res) => {
			res.json(q_res.rows)
    })
})

module.exports = router