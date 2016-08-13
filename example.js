var page         = require('webpage').create(); // inclide webpage module
var step_module  = require('./step_queue'); // include step_queue module
var step_queue   = new step_module.StepQueue(); // instantiate StepQueue class

var step_delay   = 350; // delay between each step
var stay_on_step = false; // boolean whether to stay on the current step

page.onLoadFinished = function(status) { // when the page finishes the loading, prepare the next step
    step_queue.prepare(status, step_delay, stay_on_step); 
}

step_queue.register(function() {
    console.log('open example page');
    page.open('http://www.example.com/');
});

step_queue.register(function() {
    console.log('get h1 tag');
    var h1 = page.evaluate(function() {
        return document.querySelector('h1').textContent;
    });
    step_queue.next(); // manually go to the next step
});

step_queue.register(function() {
    console.log('open next page');
    page.open('http://www.iana.org/domains/reserved');
});

step_queue.init();
