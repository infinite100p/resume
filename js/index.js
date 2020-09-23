// import { pw } from 'js/secret.js'

/* * * * * * * * * * * * * * * * * * * * * * * VARIABLES * * * * * * * * * * * * * * * * * * * * * * */

var dialogFired = false;
var tipRevealed = false;
// var dialogCount = 0;

/* * * * * * * * * * * * * * * * * * * * * * * MAIN * * * * * * * * * * * * * * * * * * * * * * */

$(function() {
    unlockResume().then((isAccessValid) => {
        if (isAccessValid) {
            $("body").fadeIn(2000);
            init();
        } else {
            document.location.href = 'http://www.tinadesigns.me/status/access-denied.html';
        }
    })
})

function init() {
    collapse();
    expand();
    $('#collapse').click();
    // setTimeout(() => {$('#collapse').click()}, 0);
    setTimeout(() => { pageExit() }, 50000);

    displayChat();
    chatHandler();

    jumpToPageBottomHandler();
    revealTip();
    // pageExit();
}

async function unlockResume() {
    var dfd = $.Deferred();

    // if no cookie, request access code
    checkIfCookieExists('user_ip_address').then((cookieExists) => {
        if (cookieExists) {
            dfd.resolve(true);
        } else {
            let accessCode = prompt("Enter access code:", "");

            // set cookie with user's IP address if code is valid
            if (isPassCodeValid(accessCode)) {
                setCookie();
                dfd.resolve(true);
            } else {
                alert(`Access Denied.`);
                dfd.resolve(false);
            }
        }
    })

    return dfd.promise();
}

/* warning: unsecure pw prompt
 store as private env var application */

// is string equal to any of these password strings?
function isPassCodeValid(str) {
    let pwArr = ['pw1', 'pw2', 'pw3'];

    return pwArr.includes(str);
}

// $('.cryptedmail').css('href', 'mailto:' + this.dataset.name + '@' + this.dataset.domain + '.' + this.dataset.tld);

/* * * * * * * * * * * * * * * * * EVENT HANDLERS * * * * * * * * * * * * * * * * */

// when user's mouse is positioned at top of the page (assume on exit)...
// prompt for feedback before user leaves
function pageExit() {
    // 	$(document).mousemove(function(event){

    var top_y_coord = $('#topOfScreen').offset().top; // y-coords of div at the top of the page

    // dialog hasn't been fired & user mouse is at or above {y-coord: 57.59375}
    // 		if (!dialogFired && event.pageY <= top_y_coord) {  
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

    // }
    // 	})
}

// when user clicks on chat button...
function chatHandler() {
    $('#chat').on('click', function() {
        openDialog();
        setBackgroundFilter();
    })
}

// when user clicks 'Yes' button after dialog opens...
function contactMe() {
    var cryptedmail = $('.cryptedmail');
    $('#contactMe').on('click', function() {
        // $(location).attr('href','success.html'); // track page view count
        // document.location = 'mailto:hello@tinadesigns.me?';
        // 		document.location = 'mailto:' + cryptedmail.attr('data-name') + '@' + cryptedmail.attr('data-domain') + '.' + cryptedmail.attr('data-tld');
        window.open('https://calendly.com/tinadesigns/15min', '_blank');
        closeDialog();
    })
}

// when user hovers over 'No' button in dialog box...
function rejectHover() {
    $('#feedback').hover(function() {
        $('#react').html(`<img src="icons/giphy-agnes-pray.gif">`);
    })
}

// when user clicks 'No' button after dialog opens...
function feedbackHandler() {
    $('#feedback').on('click', function() {
        window.open('https://rebrand.ly/ts-feedback-job', '_blank');
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
        $('#react').html(`<img src="icons/giphy-patrick-cheer2.gif">`);
    })
}

// when user clicks elmt linked to anchor
// scroll to anchor location on the page
async function jumpToPageBottomHandler() {
    $("a.scrollLink").click(async function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500);

        // highlight section 
        // fade section out & in for smooth transition   
        $('.highlighter').addClass('glow');
        $('.highlighter').fadeOut(0);
        $('.highlighter').fadeIn(1000);
        $('.section-7').fadeOut(0);
        $('.section-7').fadeIn(1000);

        // highlight section title
        // commenting out cuz this might hurt user's eyes...
        // $('.section-7 .section-title').addClass('text-glow');

        // wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));

        // remove highlights
        // section blink effect 
        $('.highlighter').removeClass('glow');
        $('.highlighter').fadeIn(0);
        
        $('.section-7').fadeOut(0);
        $('.section-7').fadeIn(50);
        
        // $('.section-7 .section-title').removeClass('text-glow');
        
    });
    // var h = document.body.clientHeight + 300;

    // $('.jumpToWebApps').click(function () {
    //     $('html, body').animate({
    //         scrollTop:h
    //     }, 'slow', 'swing');
    //     $('.section-7').fadeIn('9900');	
    // });    

    // $('.fa-question-circle').on('click', function() {
    //   window.scrollTo(0,document.body.scrollHeight);
    // })
}

// function handleRecentAppsLinkClick() {
// 	$('#')
// }

// jump to section 7 - learning by building
function jumpToPageBottom() {
    $('html, body').animate({
        scrollTop: h
    }, 'slow', 'swing');
    $('.section-7').fadeIn('9900');
}


// if(confirm(`Are you interested in connecting?`)) document.location = 'mailto:tinasu74@gmail.com';
// console.log(event.pageX + ", " + event.pageY);



/* * * * * * * * * * * * * * * * * * * * * * * HELPER FUNCTIONS * * * * * * * * * * * * * * * * * * * * * * */


// open dialog box and set dialogFired to true
function openDialog() {
    // if (dialogCount < 3) {
    $('#dialog').dialog({
        show: {
            effect: 'fade',
            duration: 2000
        }
    });
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
    $('.bg').css('display', 'block');
    // $('.bg').css('z-index', '1');
    // $('.bg').css('opacity', '0.8');	
    $($('.bg').height($(document).height()));
}

// remove background filter from the top
function removeBackgroundFilter() {
    $('.bg').css('display', 'none');
    // $('.bg').css('z-index', '-1');
    // $('.bg').css('opacity', '0');	
}


// display chat button after dialog box has fired
function displayChat() {
    if (dialogFired) {
        $('#chat').css('display', 'block');
        $('#confused').css('display', 'block');
    }
}

function revealTip() {
    const tip = $('#tip');
    var yPos = tip.offset().top;

    // if (tipRevealed == false) {
    $(window).on('scroll', function() {
        // if ($(window).scrollTop() >= yPos +1) {
        if (($(window).scrollTop() >= yPos + 1) && (!tipRevealed)) {
            // if (!tipRevealed) {	
            // tip.fadeIn(6000);
            tip.toggle("bounce", { times: 1 }, 2500);
            // tip.animate({right: '100px'}, "slow");		
        } else {
            // tip.css('display', 'none !important');
            tip.html('');
        }
    })
}



/* * * * * * * * * * * * * * * * * EXPAND & COLLAPSE * * * * * * * * * * * * * * * * */

// remove details from DOM when user clicks on '-' icon
// reposition elements and replace icon with '+'
function collapse() {
    $(document).on('click', '#collapse', function() {
        $('.section-5 .details').css('display', 'none');
        $('.exp').css('margin-top', '7%');
        $('.exp:first-child').css('margin-top', '1%');
        $('.bg').css('height', '270%');
        $('#collapse').attr('class', 'fa fa-plus');

        $('.exp .employer').removeClass('extraLineHeight');
    });
}

// display details when user clicks on '+' icon
// reposition elements and replace icon with '-'
function expand() {
    $(document).on('click', '.fa-plus', function() {

        $('.section-5 .details').fadeIn(50);
        // css('display', 'block');
        $('.exp').css('margin-top', '7%');
        $('.exp:first-child').css('margin-top', '1%');

        $('#collapse').attr('class', 'fa fa-minus');

        let employers = document.querySelectorAll('.exp .employer');

        for (var i = 1; i < employers.length; i++) {
            employers[i].classList.add('extraLineHeight');
        }
        tipRevealed = true;
        $('#tip').html('');

        // 		$('.exp .employer')[1].removeClass('extraLineHeight');
    });
}

/* * * * * * * * * * * * * * * UNUSED CODE (EXTRAS) * * * * * * * * * * * * * * */

var w = $(document).width();
var h = $(document).height();
console.log(`w: ${w}`);
console.log(`h: ${h}`);


function celebrate() {

    for (var i = 0; i < 130; i++) {
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

// cookie expires after browser session ends
function setCookie() {
    $.getJSON("http://jsonip.com/?callback=?", function(data) {
        document.cookie = "user_ip_address=data.ip";
    });
}

async function checkIfCookieExists(cookieKey) {
    let res = false;
    if (document.cookie.split(';').some(function(item) {
            return item.trim().indexOf(cookieKey + '=') == 0
        })) {
        console.log('The cookie "reader" exists (ES5)')
        res = await true;
    } else {
        console.log('no');
    }
    return res;
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


/* * * * * * * * * * * * * * * * * * BUG(S) IN CODE * * * * * * * * * * * * * * * * * */