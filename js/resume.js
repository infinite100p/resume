
/* * * * * * * * * * * * * * * * * * * * * * * VARIABLES * * * * * * * * * * * * * * * * * * * * * * */

var dialogFired = false;
// var dialogCount = 0;

/* * * * * * * * * * * * * * * * * * * * * * * MAIN * * * * * * * * * * * * * * * * * * * * * * */

init();

function init() {
	collapse();
	expand();
	pageExit();

	displayChat();
	chatHandler();	
	
	clickQuestion();
}

// $('.cryptedmail').css('href', 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld);

/* * * * * * * * * * * * * * * * * * * * * * * EVENT HANDLERS * * * * * * * * * * * * * * * * * * * * * * */

// when user's mouse is positioned at top of the page (assume on exit)...
// prompt for feedback before user leaves
function pageExit() {
	$(document).mousemove(function(event){

		var top_y_coord = $('#topOfScreen').offset().top;  // y-coords of div at the top of the page

		// dialog hasn't been fired & user mouse is at or above {y-coord: 57.59375}
		if (!dialogFired && event.pageY <= top_y_coord) {  
	    	openDialog();
	    	setDialogContent()
	    	setBackgroundFilter();
	    	console.log(top_y_coord);
	    	
	    	contactMe();
	    	feedbackHandler();
	    	dialogX();

	    	approveHover();
	    	rejectHover();
	    		  
	    	clickOutOfDialog();	  

	    }
	})
};

// when user clicks on chat button...
function chatHandler() {
	$('#chat').on('click', function() {
		openDialog();
		setBackgroundFilter()
	})	
}

// when user clicks 'Yes' button after dialog opens...
function contactMe() {
	var cryptedmail = $('.cryptedmail');
	$('#contactMe').on('click', function() {
		document.location = 'mailto:' + cryptedmail.attr('data-name') + '@' + cryptedmail.attr('data-domain') + '.' + cryptedmail.attr('data-tld');
		closeDialog();
	})
}

// when user hovers over 'No' button in dialog box...
function rejectHover() {
	$('#feedback').hover(function() {
			$('#react').html(`<img src="imgs/agnes-pray.gif">`);
	})
}

// when user clicks 'No' button after dialog opens...
function feedbackHandler() { 
	$('#feedback').on('click', function() {
		$(location).attr('href','');
		closeDialog();
	})
}

// when user hits 'x' on dialog box...
function dialogX() {
	$('.ui-dialog-titlebar-close').on('click', function() {
		closeDialog();
		$('#chat').css('display', 'block');
	})
}

// when user clicks on webpage outside of dialog box...
function clickOutOfDialog() {
	$('.bg').on('click', function() {
		closeDialog();
		displayChat();
	})
}

// when user hovers over 'Yes' button in dialog box...
function approveHover() {
	$('#contactMe').hover(function() {		
			$('#react').html(`<img src="https://media2.giphy.com/media/8WJw9kAG3wonu/giphy.gif">`);
	})
}

// when user clicks on question mark next to Entrepreneurs...
function clickQuestion() {
    var h = document.body.clientHeight + 100;

    $('#online-coursework .fa-question-circle').click(function () {
        $('html, body').animate({
            scrollTop:h
        }, 'slow', 'swing');
        $('.section-7').fadeIn('9900');
    });    
}

	


/* * * * * * * * * * * * * * * * * * * * * * * HELPER FUNCTIONS * * * * * * * * * * * * * * * * * * * * * * */


// open dialog box and set dialogFired to true
function openDialog() {
		// if (dialogCount < 3) {
	    	$('#dialog').dialog();
	    	dialogFired = true;
	    // }

	    // console.log(`Dialog Count = ${dialogCount}`);
}

// close dialog box and remove background filter
function closeDialog() {
	$('#dialog').dialog("close");
	removeBackgroundFilter();
}

// populate dialog with content (buttons)
function setDialogContent() {
	$('#dialogText').css('display', 'block');
    $('#dialogText').html(`<button id="contactMe" class="btn-success">Yes</button> <button id="feedback" class="btn-danger">No</button><br>`);	
}

// filter background with opaque layer on top
function setBackgroundFilter() {
	$('.bg').css('z-index', '1');
	$('.bg').css('opacity', '0.8');	
	$($('.bg').height($(document).height()));
}

// remove background filter from the top
function removeBackgroundFilter() {
	$('.bg').css('z-index', '-1');
	$('.bg').css('opacity', '0');	
}


// display chat button after dialog box has fired
function displayChat() {
	if (dialogFired) {
		$('#chat').css('display', 'block');
		$('#confused').css('display', 'block');
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * EXPAND & COLLAPSE * * * * * * * * * * * * * * * * * * * * * * */

// remove details from DOM when user clicks on '-' icon
// reposition elements and replace icon with '+'
function collapse() {
	$(document).on('click', '#collapse', function() {
			$('.section-5 .details').css('display', 'none');
			$('.exp').css('margin-top', '7%');
			$('.exp:first-child').css('margin-top', '1%');
			$('.bg').css('height', '270%');
			$('#collapse').attr('class', 'fa fa-plus');	
	});
}

// display details when user clicks on '+' icon
// reposition elements and replace icon with '-'
function expand() {
	$(document).on('click', '.fa-plus', function() {
		$('.section-5 .details').css('display', 'block');
		$('.exp').css('margin-top', '7%');
		$('.exp:first-child').css('margin-top', '1%');
		
		$('#collapse').attr('class', 'fa fa-minus');
	});
}

/* * * * * * * * * * * * * * * * * * * * * * * UNUSED CODE (EXTRA) * * * * * * * * * * * * * * * * * * * * * * */

var w = $(document).width();
var h = $(document).height();
console.log(`w: ${w}`);
console.log(`h: ${h}`);


function celebrate() {

	for (var i=0; i < 130; i++) {
		var rand_X = 15 + Math.floor(Math.random() * 70);
		var rand_Y = Math.floor(Math.random() * 50);
		var col = Math.floor(Math.random() * 256);

		$('#celebrate').append(`<div id= 'confetti${i}'></div>`)
		$(`#confetti${i}`).addClass('confetti');
		$(`#confetti${i}`).css('left', `${rand_X}%`);
		$(`#confetti${i}`).css('top', `${rand_Y}%`);
		$(`#confetti${i}`).css('background', `rgb(${randomCol()}, ${randomCol()}, ${randomCol()})`);

	}
}

function randomCol() {
	return Math.floor(Math.random() * 256);
}

// setInterval(move, 1000);



function move() {
	// while ($('#interests').css('width') <= '30px') {
	for (var i = 0; i < 20; i++) {
		$('#interests').css('margin-left', '-5px');
	}
}

// celebrate();

// $( window ).unload(function() {
//   return "Handler for .unload() called.";
// });

// $('.interest-icon').fadeOut(800);
// $('.interest-icon').fadeIn(1000);


// move interests
// setInterval(function() {
// 	move() }, 1000);


/* * * * * * * * * * * * * * * * * * * * * * * BUG(S) IN CODE * * * * * * * * * * * * * * * * * * * * * * */





