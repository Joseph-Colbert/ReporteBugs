$( document ).ready(function() {
	axios({
		method: 'GET',
		url:'https://sandbox.zoundbar.com/zb-qa/api/v1/report/?page=1&perPage=15'
	}).then(res=>{
		console.log(res.data.bugs)
		const list = document.getElementById('list');
		list.innerHTML= '';
		const fragment = document.createDocumentFragment();
		const table = document.getElementById('datatable');
		for(const userInfo of res.data.bugs){
			list.innerHTML += `
			<tr>
				<td><span class="available"></span> ${userInfo.priority}</td>
				<td>${userInfo.issuerName}</td>
				<td>${userInfo.description}</td>
				<td>${userInfo.module}</td>
				<td>${userInfo.images}</td>
				<td>${userInfo.updatedAt} 
				<div class = "delete">
				<div class = "del"> 
				<ul>   
				<li >
				<button>
					<a class="material-icons">delete</a>
				</button>
				</li></ul></div></div>
				</td>
				</tr>
			`
			fragment.appendChild(list)
		}
		table.appendChild(fragment)
		}).catch(err => console.log(err))
	});




//Buscar

const productos = 
[	
	{prioridad: 'Alta', nombre: 'Juan', descripcion: 'Hola como estas', fecha:'2020-02-02'},
	{prioridad: 'Baja', nombre: 'Ramiro', descripcion: 'Hola', fecha:'2020-03-03'},

]

const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#list');

const filtrar = ()=>{
	console.log(formulario.value);
	resultado.innerHTML = '';

	const texto = formulario.value.toLowerCase();
	for(let producto of productos){
		let prioridad = producto.prioridad.toLowerCase();
		let nombre = producto.nombre.toLowerCase();
		let descripcion = producto.descripcion.toLowerCase();
		let fecha = producto.fecha.toLowerCase();
		if(prioridad.indexOf(texto)  !== -1){
		
			resultado.innerHTML +=`
			<tr>
			<td><span class="available"></span> ${producto.prioridad}</td>
			<td>${producto.nombre}</td>
			<td>${producto.descripcion}</td>
			<td>${producto.fecha}
			<div class = "delete">
			<div class = "del"> 
			<ul>   
			<li >
			<button>
				<a class="material-icons">delete</a>
			</button>
			</li></ul></div></div>
			</td>
			</tr>
		`
		}	
	}
	if(resultado.innerHTML == ''){
		resultado.innerHTML +=`
	<li>Producot no encontrado...</li>
	`
	}
}

boton.addEventListener('click', filtrar)
formulario.addEventListener('keyup',filtrar)
//filtrar();




//|| nombre.indexOf(texto) || descripcion.indexOf(texto) || fecha.indexOf(texto)
