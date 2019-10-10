//Edit
function updateUtils(scope,success){
	var formData = $(scope).serialize();
	var url= $(scope).attr('action');
	console.log(url);
	$.ajax({
	    url: url,
	    type: 'PUT',
	    dataType: 'json',
	    data: formData,
	    success: success
	});
	return false;
}

function updateUserSuccess(data){
	window.location.href = '/staff';
}

function updateRoomSuccess(data){
	window.location.href = '/room';
}

function updateTableSuccess(data){
	window.location.href = '/table';
}

function updateCategorySuccess(data){
	window.location.href = '/category';
}

function updateFoodSuccess(data){
	window.location.href = '/menu';
}

//Delete
function deleteUtils(url,success,error){
	$.ajax({
	    url: url,
	    type: 'DELETE',
	    success: success || function(){},
	    error: error || function(){}
	});
}

function deleteRoomSuccess(data){
	window.location.href= '/room';
}

function deleteUserSuccess(data){
	window.location.href= '/staff';
}

function deleteTableSuccess(data){
	window.location.href= '/table';
}

function deleteCategorySuccess(data){
	window.location.href= '/category';
}

function deleteFoodSuccess(data){
	window.location.href='/menu';
}

function deleteError(data){
	$('.errorMessage').show();
}


//Pagination
$(document).ready(function(){
	var count = $('.totalCount').val();
	var perPage = $('.perPage').val();
	var currentPage = $('.currentPage').val();

    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    var toDate = getParameterByName('toDate');
    var fromDate=getParameterByName('fromDate');

	for(var i=1;i<=Math.ceil(count/perPage);i++){
		$('.viewPagination').append('<li id="'+i+'"><a href="'+window.location.pathname.replace(/\/$/, "")+'?page='+i+'&fromDate='+fromDate+'&toDate='+toDate+'">'+i+'</a></li>')
	}
});
