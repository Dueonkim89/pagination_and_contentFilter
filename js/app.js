var students = $('.student-list').children();
var numberOfStudents = $('.student-list').children().length;

var numberOfPaginationLinks = Math.ceil(numberOfStudents/10);
var searchResults = [];

//create pagination links based off the var numberOfPaginationLinks
function createPaginationLinks(length) {
	var paginationDiv = $(`<div class="pagination"></div>`);
	paginationDiv.insertAfter(".student-list");
	var unorderedList = $(`<ul></ul>`);
	$('.pagination').append(unorderedList);
	for (i=1; i <=length; i++) {
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

// default settings function
function defaultSettings() {
	//create the pagination links
	createPaginationLinks(numberOfPaginationLinks);
	//give first link the class of active.
	$( ".pagination ul li:nth-child(1)" ).find('a').addClass('active');
	//toggle the .hide class for appropriate students
}

//function to see if students exist
function findStudents(search) {
	//remove pagination links
	$('.pagination').remove();
	//if search input is empty
	if (search === '') {
		$('.notFound').remove();
		defaultSettings();
		students.each(function (index) {
			searchResults.push($(this));
			if (index <= 9) {
				$(this).removeClass('hide');
			}
		});		
	// if not empty, check through student names	
	} else {
		//set found variable to false
		var found = false;		
		$('.notFound').remove();
		students.each(function (index) {	
			var studentNames = $(this).find('h3').text();
			if (studentNames.includes(search)) {
				searchResults.push($(this));
				found = true;
			}
		});	
		//if name is not found.
		if (!found) {
			var noUserFound = $(`<p class="notFound">No results for: ${search}</p>`);
			noUserFound.insertAfter($('.student-list'));
			$('.pagination').remove();	
		// if search result is less than or equal to 10.		
		} else if (searchResults.length <= 10) {
			//loop thru the searchResults array
			for (i = 0; i<searchResults.length; i++ ) {
				//remove the class hide
				searchResults[i].removeClass('hide');
			}
		} else if (searchResults.length > 10) {
			var numberOfLinks = Math.ceil(searchResults.length/10);
			//create pagination links based off length
			createPaginationLinks(numberOfLinks);
			//set first link as active class
			$( ".pagination ul li:nth-child(1)" ).find('a').addClass('active');
			//show first 10, etc.
			showStudents(searchResults.length, 1);
		} 
	}	
}

//function to show the students.
function showStudents(length, paginationLink) {
	//if not last pagination link
	if (length - paginationLink * 10 > 0) {
		//refernce the array instead
		for (i = 0; i<searchResults.length; i++) {
			if (paginationLink * 10 - 10 <= i && i < paginationLink * 10) {
				searchResults[i].removeClass('hide');
			}
		}	
	// else it is last pagination link	
	} else {
		//refernce the array instead
		for (i = 0; i<searchResults.length; i++) {
			if ((paginationLink - 1) * 10 <= i && i < length ) {
				searchResults[i].removeClass('hide');
			}
		}		
	}
}

//when window loads. Create pagination links 
$(window).on('load', function () {
	//create the search section
	createSearchDiv();
	//invoke default settings function
	defaultSettings();
	students.each(function (index) {
		searchResults.push($(this));
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
		//run function to show based off length
		showStudents(searchResults.length, referenceNumber);
	//if search button	
	} else if (event.target.id === 'searchButton') {
		//reset array to 0 length
		searchResults.length = 0;		
		var input = $('input');
		var searchWord = input.val();
		hideStudents();
		// function find students.
		findStudents(searchWord);
	}
});