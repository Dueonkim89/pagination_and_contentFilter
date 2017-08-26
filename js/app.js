var numberOfStudents = $('.student-list').children().length;

var numberOfPaginationLinks = Math.ceil(numberOfStudents/10);

//create pagination links based off the var numberOfPaginationLinks
function createPaginationLinks() {
	var paginationDiv = $(`<div class="pagination"></div>`);
	paginationDiv.insertAfter(".student-list");
	var unorderedList = $(`<ul></ul>`);
	$('.pagination').append(unorderedList);
	for (i=1; i <=numberOfPaginationLinks; i++) {
		var listItem = $(`<li><a href="#">${i}</a></li>`);
		unorderedList.append(listItem);
	}
}

//create search section
function createSearchDiv() {
	var pageTitle = $('.page-header h2');
	var searchDiv = $(`<div class="student-search"></div>`);
	searchDiv.insertAfter(pageTitle);
	var searchField = $(`<input placeholder="Search for students...">`);
	var searchButton = $(`<button id="searchButton">Search</button>`);
	$('.student-search').append(searchField, searchButton);
}

//function to hide the proper students
function hideStudents() {
	var referenceNumber = parseInt($('.active').text());
	//run a for loop. 
	// from the refernceNumber to the numberOfStudents
	// add a class of hide to all the apprporiate li within student-list
	
}

//function to show the students.




//when window loads. Create pagination links 
$(window).on('load', function () {
	//create the search section
	//createSearchDiv();
	//create the pagination links
	//createPaginationLinks();
	//give first link the class of active.
	//$( ".pagination ul li:nth-child(1)" ).find('a').addClass('active');
	//toggle the .hide class for appropriate students

	
});



//delegate event listener to toggle active class on/off for the pagination links 
//and listen for the events related to search button.
$(document).on( "click", function(event) {
	
});