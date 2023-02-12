'use strict';
// https://docs.google.com/spreadsheets/d/1cwPxrzdGRS2I9H0B2HJXQLSDZMjAdGnHpkr87TjyhUA/edit#gid=0
const sheetId = '1cwPxrzdGRS2I9H0B2HJXQLSDZMjAdGnHpkr87TjyhUA';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Sheet1';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = {col:[],row:[]};
document.addEventListener('DOMContentLoaded',function init(){
    fetch(url).then(res=>res.text())
		.then(rep=>{
            // console.log(rep);return;
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
			// console.log(jsonData);return;
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    data.col.push(column);
                }
            });
			// console.log(data.col);return;
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                data.col.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.row.push(row);
				onDataProcess(row);
            });
            // console.log(data.row);return;
			afterDataProcess();
    	});
});
var users={};
var opt_html='';
function onDataProcess(row){
	users[row['ID']]=row;
	opt_html+=`<option value="${row['ID']}">${row['ID']}</option>`;
	opt_html+=`<option value="${row['ID']}">${row['Name']}</option>`;
	opt_html+=`<option value="${row['ID']}">${row['Username']}</option>`;
}
function afterDataProcess(){
	// console.log(user);return;
	var $user_list=$('#user_list');
	$user_list.html('');
	$user_list.append(opt_html);
}

var $print=$('.print-body');
$('#search-btn').on('click',function(e){
	var user=users[$('#user').val()];
	// console.log(user);return;
	if(user){
		var issued_date=new Date().toLocaleDateString('en-us',{weekday:'long',year:'numeric',month:'short',day:'numeric'});
		$print.html(`
			<table class="w-100">
				<tbody>
					<tr><th class="text-nowrap">Customer ID</th><th>:</th><td>${user['ID']}</td></tr>
					<tr><th>Name</th><th>:</th><td>${user['Name']}</td></tr>
					<tr><th>Package</th><th>:</th><td>${user['Package']}</td></tr>
					<tr><th>Ammount</th><th>:</th><td>${user['Total Due']}</td></tr>
					<tr><th class="text-nowrap">Issued date</th><th>:</th><td>${issued_date}</td></tr>
				</tbody>
			</table>
		`);
	}else{
		$print.html('No Data');
	}	
});
$('#print-btn').on('click',function(e){
	window.print();
});
