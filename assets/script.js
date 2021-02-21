var lastProcessedHour = 0;

var currentDay = moment();
$('#currentDay').text(currentDay.format('dddd, MMMM Do'));


// timeblocks color coded on past, present, future (if statements)
function tickTime() {
    var currentHour = moment().hour();
    if (lastProcessedHour !== currentHour) {
        for (hour = 9; hour <= 17; hour++){
            var divHour = $('#hour'+hour);
            if (hour === currentHour) {
                divHour.removeClass('past future')
                divHour.addClass('present');
            }
            else if (hour <  currentHour) {
                divHour.removeClass('present future')
                divHour.addClass('past');
            }
            else {
                divHour.removeClass('present past')
                divHour.addClass('future') ;
            }
        } 
        lastProcessedHour = currentHour;
    }
}

tickTime() 
setInterval(tickTime, 1000)

// when save is clicked, event is saved into (set) local storage
function saveInfo(elem) {
    var textArea = $('#hour' + elem.target.value).find('textarea')[0];
    $(textArea).focusout();
    var hourlyEvent = $(textArea).val();

    localStorage.setItem('hour' + elem.target.value, hourlyEvent)
}

$(document).ready(function(){
    
    for (hour = 9; hour <=17; hour++) {
        var currentHourDiv = $('#hour'+hour);
        // add local storage event to text area
        var savedEvent = localStorage.getItem('hour'+hour)
        if (savedEvent !== null) {
            var textArea = $(currentHourDiv.find('textarea')[0]);
            textArea.val(savedEvent)
        }
        // add event handler to save
        var button = currentHourDiv.find('button')[0];
        $(button).on('click', saveInfo)
    }
})


// if page is refreshed, event is still present (get)