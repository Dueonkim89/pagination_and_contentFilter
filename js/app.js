var students = $('.student-list').children();
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

//function to hide all the students
function hideStudents() {
	students.each(function (index) {
		$(this).addClass('hide');
	});
}

//function to show the students.
function showStudents(paginationLink) {
	//if not last pagination link
	if (numberOfStudents - paginationLink * 10 > 0) {
		students.each(function (index) {
			if (paginationLink * 10 - 10 <= index && index < paginationLink * 10) {
				$(this).removeClass('hide');
			}
		});		
	// else it is last pagination link	
	} else {
		students.each(function (index) {
			if ((paginationLink - 1) * 10 <= index && index < numberOfStudents ) {
				$(this).removeClass('hide');
			}
		});			
	}
}

//when window loads. Create pagination links 
$(window).on('load', function () {
	//create the search section
	createSearchDiv();
	//create the pagination links
	createPaginationLinks();
	//give first link the class of active.
	$( ".pagination ul li:nth-child(1)" ).find('a').addClass('active');
	//toggle the .hide class for appropriate students
	students.each(function (index) {
		if (index >= 10) {
			$(this).addClass('hide');
		}
	});
});


//delegate event listener to toggle active class on/off for the pagination links 
//and listen for the events related to search button.
$(document).on( "click", function(event) {
	var paginationLinks = $(event.target).parents().hasClass('pagination');
	var unorderedList = $(event.target).parent().parent();
	//if ancestor element is pagination div and target element is anchor.
	if (event.target.tagName === 'A' && paginationLinks) {
		unorderedList.find('.active').removeClass('active');
		$(event.target).addClass('active');
		var referenceNumber = parseInt($('.active').text());
		//run function to hide
		hideStudents();
		//run function to show.
		showStudents(referenceNumber);
	}
});