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

//function to see if students exist
function findStudents(search) {
	//if search input is empty
	if (search === '') {
		$('.notFound').remove();
		var referenceNumber = parseInt($('.active').text());
		showStudents(referenceNumber);
		$('.pagination').show();
	// if not empty, check through student names	
	} else {
		$('.notFound').remove();
		var found = false;
		students.each(function (index) {	
			var studentNames = $(this).find('h3').text();
			if (studentNames.includes(search)) {
				$(this).removeClass('hide');
				$('.pagination').hide();
				found = true;
			}
		});		
		//if search results not found
		if (!found)	 {
			var noUserFound = $(`<p class="notFound">No results for: ${search}</p>`);
			noUserFound.insertAfter($('.student-list'));
			$('.pagination').hide();
		}
	}
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


//delegate event listener to toggle active class on/off for the pagination links & listen for the events 
//related to search button.
$(document).on( "click", function(event) {
	var paginationLinks = $(event.target).parents().hasClass('pagination');
	var unorderedList = $(event.target).parent().parent();
	//if ancestor element is pagination div and target element is anchor.
	if (event.target.tagName === 'A' && paginationLinks) {
		//remove current pagination link with active class
		unorderedList.find('.active').removeClass('active');
		//add active class to the new pagination link
		$(event.target).addClass('active');
		//grab the text within the pagination link
		var referenceNumber = parseInt($('.active').text());
		//run function to hide
		hideStudents();
		//run function to show.
		showStudents(referenceNumber);
	//if search button	
	} else if (event.target.id === 'searchButton') {
		var input = $('input');
		var searchWord = input.val();
		hideStudents();
		// function find students.
		findStudents(searchWord);
	}
});