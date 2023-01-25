const express = require('express');
const app = express();

const cors = require('cors')
var cookies = require("cookie-parser");
app.use(cookies())
app.use(cors({origin: ['http://0.0.0.0:3000', 'https://rafaelpoveronferreira.github.io/monitor-webapp'], credentials: true}))
app.use(express.json());

var id = 1
let date = new Date('1999-10-10T12:00:00')
date.setHours(Math.floor(Math.random()*8)+8)
date.setMinutes(Math.floor(Math.random()*59))
var arr = [{id, situacao_id: 3, cidadao_nome: id+'° paciente', data_atualizacao_situacao: date.toISOString(), tipo: 'Consultório '+Math.floor(Math.random()*10)}]
var minutes = date.getMinutes()

setInterval(()=>{
	id++
	minutes++
 	date.setMinutes(minutes)
	arr.push({id, situacao_id: 1, cidadao_nome: id+'° paciente', data_atualizacao_situacao: date.toISOString(), tipo: 'Consultório '+Math.floor(Math.random()*10)})
	
	if(Math.random()<0.3) {
		arr[Math.floor(Math.random()*(arr.length-1))].situacao_id=3
	} 
},5000)

app.get('/panel/patients',(req, res) => {
	if (req.query.status=='is_awaiting') {
		const onlyAwaiting = arr.filter(e=>e.situacao_id==1)
		res.json({length: arr.length, data: onlyAwaiting})
	} else if (req.query.status=='in_attendance') {
		const onlyAttendence = arr.filter(e=>e.situacao_id==3)
		res.json({length: arr.length, data: onlyAttendence})
	} else {
		res.json({length: arr.length, data: arr})
	}

	
})

app.get('/panel/me',(req, res) => {
	const { cookies } = req;
	const { token } = cookies

	if(token == '78a2c966-cfce-4796-bdd5-08a9ab06f6a3') {
		res.status(200).json({health_unit_name: 'Clinica Sagrado Coração', user: 'Usuário Válido'})
	} else {
		res.status(500).json({err: 'No token'})
	}
	return
})

app.post('/panel/auth',(req, res) => {
	res.cookie('token', '78a2c966-cfce-4796-bdd5-08a9ab06f6a3', {httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 1000000000000),
		sameSite: 'none'})
		.status(200)

	res.send(res.getHeader('set-cookie'))
	return
})

var listener = app.listen(5000, () => console.log('backend is running on port '+listener.address().port));
