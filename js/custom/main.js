
var mic;
var recorder;
var soundFile;
var state = 0;
var speech;

function setup() {
    createCanvas(400, 400);
    background(200);
    fill(color('White'));
    textSize(32);
    textAlign(CENTER);
    text('Click to start recording.\n(Wear headphones to \navoid nasty feedback)', width / 2, height / 2);
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();
    speech = new p5.SpeechRec();
    speech.onResult = showResult;
}

function mousePressed() {
    if (state === 0 && mic.enabled) {

        recorder.record(soundFile);
        background(255, 0, 0);
        text('Recording now! \nClick to stop.', width / 2, height / 2);
        speech.continuous = true;
        speech.start();
        state++;

    } else if (state === 1) {

        recorder.stop();
        background(0, 255, 0);
        text('Recording stopped. \nClick to play & save', width / 2, height / 2);
        speech.continuous = false;
        state++;

    }
}

function showResult() {
    if (speech.resultValue === true) {
        soundFile.play();
        saveSound(soundFile, 'soundFile.wav');
        save([speech.resultString], 'soundTranscript.txt');
    }
}
