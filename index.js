let express = require('express');
let app = express();
var useragent = require('express-useragent');
let bmi = require('./bmi');
let users = [];


let logger = (req, res, next) => {
	let fecha = new Date();
	console.log(`${fecha} :: ${req.method} :: ${req.originalUrl} :: ${req.header('User-Agent')}`);
    next();
}


app.use(logger);
app.use(useragent.express());
app.use(express.json());

app.get('/', (req, res) =>{
    res.status(200).send(`Hola mundo`);
});

// Crear nuevo usuario
app.post('/users', (req, res)=>{
    let user = {
        identification: req.body.identification,
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
		gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        telephones: req.body.telephones
    };
    users.push(user);
	console.log(req.body);
    res.status(200).send(`El usuario ${user.name} fue creado`);    
});



//Ver todos los usuarios
app.get('/users', (req, res)=>{
    
	var html = '<style>';
	html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
	html += '</style>';
	
	html   += `<table style="border: 1px solid #dcdcdc;">`;
		html   += `<tr>`;
			html   += `<th>Identification</th>`;
			html   += `<th>Name</th>`;
			html   += `<th>LastName</th>`;
			html   += `<th>age</th>`;
			html   += `<th>gender</th>`;
			html   += `<th>height</th>`;
			html   += `<th>weight</th>`;
			html   += `<th>telephones</th>`;
		html   += `</tr>`;
	
	if(users.length > 0){
	
		for (var i = 0; i < users.length; i++) {
			
			let datos = users[i];
		   
			html   += `<tr>`;
				html   += `<td>${datos.identification}</td>`;
				html   += `<td>${datos.name}</td>`;
				html   += `<td>${datos.lastName}</td>`;
				html   += `<td>${datos.age}</td>`;
				html   += `<td>${datos.gender}</td>`;
				html   += `<td>${datos.height}</td>`;
				html   += `<td>${datos.weight}</td>`;
				
				let tel = '';
				Object.keys(datos.telephones).map(function(objectKey, index) {
					var value = datos.telephones[objectKey];
					tel += value+'-';
				});
				
				html   += `<td>${tel}</td>`;
			html   += `</tr>`;
		
		}
	}else{
		html   += `<tr><td colspan="8">No Hay registros</td></tr>`;
	}
	html   += `</table>`;
	console.log(req.params);
	res.status(200).send(html);
			
});

//Usuarios del apellido consultado
app.get('/users/lastname/:lastname', (req, res)=>{
    
	let lastname = req.params.lastname; 
	
	var html = '<style>';
	html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
	html += '</style>';
	
	html   += `<table style="border: 1px solid #dcdcdc;">`;
		html   += `<tr>`; 
			html   += `<th>Identification</th>`;
			html   += `<th>Name</th>`;
			html   += `<th>LastName</th>`;
			html   += `<th>age</th>`;
			html   += `<th>gender</th>`;
			html   += `<th>height</th>`;
			html   += `<th>weight</th>`;
			html   += `<th>telephones</th>`;
		html   += `</tr>`;
	
	if(users.length > 0){
	
		for (var i = 0; i < users.length; i++) {
			
			let datos = users[i];
			
			if(datos.lastName.toUpperCase() == lastname.toUpperCase()){
			
				html   += `<tr>`;
					html   += `<td>${datos.identification}</td>`;
					html   += `<td>${datos.name}</td>`;
					html   += `<td>${datos.lastName}</td>`;
					html   += `<td>${datos.age}</td>`;
					html   += `<td>${datos.gender}</td>`;
					html   += `<td>${datos.height}</td>`;
					html   += `<td>${datos.weight}</td>`;
					
					let tel = '';
					Object.keys(datos.telephones).map(function(objectKey, index) {
						var value = datos.telephones[objectKey];
						tel += value+'-';
					});
					
					html   += `<td>${tel}</td>`;
				html   += `</tr>`;
			}
		
		}
	}else{
		html   += `<tr><td colspan="8">No Hay registros</td></tr>`;
	}
	html   += `</table>`;
	console.log(req.params);
	res.status(200).send(html);
			
});

//Usuarios del sexo consultado
app.get('/users/gender/:gender', (req, res)=>{
    
	let gender = req.params.gender;
	
	var html = '<style>';
	html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
	html += '</style>';
	
	html   += `<table style="border: 1px solid #dcdcdc;">`;
		html   += `<tr>`;
			html   += `<th>Identification</th>`;
			html   += `<th>Name</th>`;
			html   += `<th>LastName</th>`;
			html   += `<th>age</th>`;
			html   += `<th>gender</th>`;
			html   += `<th>height</th>`;
			html   += `<th>weight</th>`;
			html   += `<th>telephones</th>`;
		html   += `</tr>`;
	
	if(users.length > 0){
	
		for (var i = 0; i < users.length; i++) {
			
			let datos = users[i];
			
			if(datos.gender.toUpperCase() == gender.toUpperCase()){
			
				html   += `<tr>`;
					html   += `<td>${datos.identification}</td>`;
					html   += `<td>${datos.name}</td>`;
					html   += `<td>${datos.lastName}</td>`;
					html   += `<td>${datos.age}</td>`;
					html   += `<td>${datos.gender}</td>`;
					html   += `<td>${datos.height}</td>`;
					html   += `<td>${datos.weight}</td>`;
					
					let tel = '';
					Object.keys(datos.telephones).map(function(objectKey, index) {
						var value = datos.telephones[objectKey];
						tel += value+'-';
					});
					
					html   += `<td>${tel}</td>`;
				html   += `</tr>`;
			}
		
		}
	}else{
		html   += `<tr><td colspan="8">No Hay registros</td></tr>`;
	}
	html   += `</table>`;
	console.log(req.params);
	res.status(200).send(html);
			
});

//Usuarios que tienen por lo menos un número de telefono
app.get('/users/telephone', (req, res)=>{
    
	var html = '<style>';
	html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
	html += '</style>';
	
	html   += `<table style="border: 1px solid #dcdcdc;">`;
		html   += `<tr>`;
			html   += `<th>Identification</th>`;
			html   += `<th>Name</th>`;
			html   += `<th>LastName</th>`;
			html   += `<th>age</th>`;
			html   += `<th>gender</th>`;
			html   += `<th>height</th>`;
			html   += `<th>weight</th>`;
			html   += `<th>telephones</th>`;
		html   += `</tr>`;
	
	if(users.length > 0){
	
		for (var i = 0; i < users.length; i++) {
			
			let datos = users[i];
			
			if(datos.telephones.length > 0){
			
				html   += `<tr>`;
					html   += `<td>${datos.identification}</td>`;
					html   += `<td>${datos.name}</td>`;
					html   += `<td>${datos.lastName}</td>`;
					html   += `<td>${datos.age}</td>`;
					html   += `<td>${datos.gender}</td>`;
					html   += `<td>${datos.height}</td>`;
					html   += `<td>${datos.weight}</td>`;
					
					let tel = '';
					Object.keys(datos.telephones).map(function(objectKey, index) {
						var value = datos.telephones[objectKey];
						tel += value+'-';
					});
					
					html   += `<td>${tel}</td>`;
				html   += `</tr>`;
			}
		
		}
	}else{
		html   += `<tr><td colspan="8">No Hay registros</td></tr>`;
	}
	html   += `</table>`;
	console.log(req.params);
	res.status(200).send(html);
			
});



//Nombre e índice de masa corporal BMI de todos los usuarios que tengan talla y peso registrado
app.get('/users/bmi', (req, res)=>{
    
	
	var html = '<style>';
		html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
		html += '</style>';
		
		
		html   += `<table style="border: 1px solid #dcdcdc;">`;
			html   += `<tr>`;
				html   += `<th>Name</th>`;
				html   += `<th>BMI</th>`;
			html   += `</tr>`;
		
		if(users.length > 0){
		
			for (var i = 0; i < users.length; i++) {
				
				let datos = users[i];
				
				let tot_bmi = (datos.height !== undefined && datos.weight !== undefined) ? bmi(datos.weight, datos.height) : 'No definido';
				
				if(datos.height !== undefined && datos.weight !== undefined){
				
					html   += `<tr>`;
						html   += `<td>${datos.name}</td>`;
						html   += `<td>${tot_bmi}</td>`;
					html   += `</tr>`;
				}
			
			}
		}else{
			html   += `<tr><td colspan="2">No Hay registros</td></tr>`;
		}
		html   += `</table>`;
		console.log(req.params);
		res.status(200).send(html);
});

//Consultar usuario en la posición id del arreglo
app.get('/users/:id', (req, res)=>{
    let id = req.params.id;
	if(users[id] === undefined){
		res.status(400).send(`El usuario en la posición ${id} no existe`);
	}else{
		
		let datos = users[id];
		
		var html = '<style>';
		html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
		html += '</style>';
		
		html   += `<table style="border: 1px solid #dcdcdc;">`;
			html   += `<tr>`;
				html   += `<th>Identification</th>`;
				html   += `<th>Name</th>`;
				html   += `<th>LastName</th>`;
				html   += `<th>age</th>`;
				html   += `<th>gender</th>`;
				html   += `<th>height</th>`;
				html   += `<th>weight</th>`;
				html   += `<th>telephones</th>`;
			html   += `</tr>`;
			html   += `<tr>`;
				html   += `<td>${datos.identification}</td>`;
				html   += `<td>${datos.name}</td>`;
				html   += `<td>${datos.lastName}</td>`;
				html   += `<td>${datos.age}</td>`;
				html   += `<td>${datos.gender}</td>`;
				html   += `<td>${datos.height}</td>`;
				html   += `<td>${datos.weight}</td>`;
				
				let tel = '';
				Object.keys(datos.telephones).map(function(objectKey, index) {
					var value = datos.telephones[objectKey];
					tel += value+'-';
				});
				
				html   += `<td>${tel}</td>`;
			html   += `</tr>`;
		html   += `</table>`;
		
		console.log(req.params);
		res.status(200).send(html);
		
	}
});


//: Índice de masa corporal BMI del usuario en la posición id
app.get('/users/bmi/:id', (req, res)=>{
    let id = req.params.id;
	
	if(users[id] === undefined){
		res.status(400).send(`El usuario en la posición ${id} no existe...`);
	}else{
		
		let datos = users[id];
		
		let tot_bmi = (datos.height !== undefined && datos.weight !== undefined) ? bmi(datos.weight, datos.height) : 'No definido';
		
		var html = '<style>';
		html += 'td,th{text-align: center;width: 128px;padding-top: 0px;padding-bottom: 0px;}';
		html += '</style>';
		
		html   += `<table style="border: 1px solid #dcdcdc;">`;
			html   += `<tr>`;
				html   += `<th>User</th>`;
				html   += `<th>bmi</th>`;
			html   += `</tr>`;
			html   += `<tr>`;
				html   += `<td>${datos.name} ${datos.lastName}</td>`;
				html   += `<td>${tot_bmi}</td>`;
				
			html   += `</tr>`;
		html   += `</table>`;
		
		console.log(req.params);
		res.status(200).send(html);
		
	}
});

//: Eliminar el usuario de la posición id
app.delete('/users', (req, res)=>{
	let id = req.body.id;
	
	if(users[id] === undefined){
		res.status(400).send(`El usuario en la posición ${id} no existe`);
	}else{
		users.splice(id,1);
		res.status(200).send(`El usuario en la posición ${id} fue eliminado`);
	}
	console.log(req.params);
});	
	
app.listen(4000, () => {
 console.log("Servidor iniciado");
});