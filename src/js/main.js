var world = null;
var canvasElement = null;
var canvasContext = null;
var speed = 1;

var mainLoop = null;
var lastUpdate = Date.now();
var dt = 0;

function updateTime() {
    var now = Date.now();
    dt = now - lastUpdate;
    lastUpdate = now;       
}

function update() {
    updateTime();
    world.update(dt * speed);
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    world.draw(canvasContext);
}

function init() {
    
    canvasElement = document.getElementById("canvas");
    canvasContext = this.canvasElement.getContext("2d");

    world = new World(canvasElement.width, canvasElement.height);

    var woodVolume = 500;

    while (woodVolume > 0) {

        var volumeToTakeAway = Math.ceil(Math.random() * woodVolume / 5) + 50;

        volumeToTakeAway = (volumeToTakeAway > woodVolume) ? woodVolume : volumeToTakeAway;
        woodVolume -= volumeToTakeAway;

        var woodHeap = new WoodHeap();
            world.addAgent(woodHeap);
            woodHeap.setWoodVolume(volumeToTakeAway);
            woodHeap.moveTo(canvasElement.width * Math.random(), canvasElement.height * Math.random());
    }

    for(var i = 0; i < 6; i++) {
        var wall = new Wall();
        world.addAgent(wall);
        wall.moveTo(    canvasElement.width * Math.random(),
                        canvasElement.height * Math.random());
    }

    for(i = 0; i < 50; i ++) {
        var termite = new Termite();
        world.addAgent(termite);
        termite.moveTo( canvasElement.width * Math.random(), 
                        canvasElement.height * Math.random());
    }

    var fps = 120;
    mainLoop = setInterval(update, 1000 / fps); 
//      update();
}

$(document).ready(function() {

    init();

    $('#speedSlider').slider({
        value: speed,
        step: 0.01,
        min: 0,
        max: 10,
        slide:function() {
            speed = Math.round($('#speedSlider').slider("value"));
            $('#speedValue').html("Speed:" + speed * 100 + "%");
        }
    });
});