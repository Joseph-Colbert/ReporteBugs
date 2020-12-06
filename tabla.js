//header('Access-Control-Allow-Origin: *');

const button = document.getElementById('button');
button.addEventListener('click', () =>{
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
			<td class="table-checkbox"><input type="checkbox"></td>
			<td><span class="available"></span>${userInfo.priority}</td>
			<td>${userInfo.issuerName}</td>
			<td>${userInfo.description}</td>
			<td>${userInfo.module}</td>
			<td>Imagen</td>
			<td>${userInfo.updatedAt}</td>
		</tr>
		`
		fragment.appendChild(list)
	}
	table.appendChild(fragment)
	}).catch(err => console.log(err))
})



