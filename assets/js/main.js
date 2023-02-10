'use strict';
var url='assets/data/bill-sheet.xlsx';
var $user={};
const data_map={
	'ID': 'id',
	'Username': 'username',
	'Package': 'package',
	'Name': 'name',
	'Contact_Address': 'address',
	'Contact': 'contact',
	'Bill': 'bill'
};

fetch(url).then(res=>res.blob())
.then(blob=>readXlsxFile(blob,{map:data_map}))
.then(({rows})=>{
		// console.log(rows);
		var opt_html='';
		rows.forEach(function(row){
			console.log(row);
			$user[row['id']]=row;
			var opt=`<option value="${row['id']}">${row['name']}</option>`;
			// console.log(opt);
			opt_html+=opt;
			
		});
		
		var $user_list=$('#user_list');
		$user_list.html('');
		$user_list.append(opt_html);
});
var $user=$('#user');
var $search=$('#search-btn');
var $print=$('.print-body');
$search.on('click',function(e){
	// console.log($user.val());
	var user=$user[$user.val()];
	console.log(user);
	var receipt=`
		<div class="mb-3 row">
			<div class="col-md-4 col-form-label">Email</div>
			<div class="col-md-6"></div>
		</div>
	name: ${user.name}<br>
	package: ${user.package}<br>
	address: ${user.address}<br>
	bill: ${user.bill}<br>
	contact: ${user.contact}<br>
	id: ${user.id}<br>
	username: ${user.username}<br>
	`;
	$print.html(receipt);
});
$('#print-btn').on('click',function(e){
	window.print();
});
