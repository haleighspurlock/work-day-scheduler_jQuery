var startTime = 9;
var endTime = 18;

var lastProcessedHour = 0;

var currentDay = moment();
$('#currentDay').text(currentDay.format('dddd, MMMM Do'));

function generateCalendar() {
    for (hour = startTime; hour <= endTime; hour++) {
        var container = $('#container');

        var element = `
        <div id="hour${hour}" class="row time-block">
            <div class="col-md-1 hour">
            ${moment(hour,'H').format('hA')}
            </div>
            <textarea class="col-md-10 description"></textarea>
            <button class="btn saveBtn col-md-1" value="${hour}"><i class="far fa-save"></i></button>
        </div>
        `
        container.append(element);
    }
}

// timeblocks color coded on past, present, future (if statements)
function tickTime() {
    var currentHour = moment().hour();
    if (lastProcessedHour !== currentHour) {
        for (hour = startTime; hour <= endTime; hour++){
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

// when save is clicked, event is saved into (set) local storage
$('.container').on('click','.saveBtn', function () {
    var textArea = $(`#hour${$(this).val()}`).find('textarea')[0];
    // $(textArea).focusout();
    var hourlyEvent = $(textArea).val();
    
    localStorage.setItem('hour' + $(this).val(), hourlyEvent)
})

// jQuery can detect readiness, so my functions only run once the DOM is ready for js code
$(document).ready(function(){
    generateCalendar()
    tickTime() 
    setInterval(tickTime, 1000)
    
    for (hour = startTime; hour <=endTime; hour++) {
        var currentHourDiv = $('#hour'+hour);
        // add local storage event to text area
        var savedEvent = localStorage.getItem('hour'+hour)
        if (savedEvent !== null) {
            var textArea = $(currentHourDiv.find('textarea')[0]);
            textArea.val(savedEvent)
        }
        
        // add event handler to save
        var button = currentHourDiv.find('button')[0];
    }
})