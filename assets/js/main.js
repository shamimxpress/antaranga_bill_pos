'use strict';
var url='assets/data/bill-sheet.xlsx';
var $user={};
const data_map={
	'ID': 'id',
	'Username': 'username',
	'Package': 'Package',
	'Name': 'Name',
	'Contact_Address': 'address',
	'Contact': 'contact',
	'Bill': 'bill'
};
fetch(url).then(res=>res.blob()).then((blob)=>{
	// console.log(blob);
	readXlsxFile(blob,{data_map}).then(function(rows) {
		console.log(rows);
		// rows.shift();
		// var $user_list=$('#user_list');
		// $user_list.html('');
		// rows.forEach(function(row){
		// 	// console.log(row);
		// 	$user[row[3]]=row;

		// 	var opt=`<option value="${row[3]}">`;
		// 	// var opt=`<option value="${row[0]}">${row[3]}</option>`;
		// 	// console.log(opt);
		// 	$user_list.append(opt);
		// });
	})
});
var $user=$('#user');
var $search=$('#search-btn');
$search.on('click',function(e){
	// console.log($user.val());
	console.log($user[$user.val()]);
	
});