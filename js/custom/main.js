
var mic;
var recorder;
var soundFile;
var state = 0;
var speech;

function setup() {

    // Setup graphics
    createCanvas(400, 400);
    background(200);
    fill(0);
    text("Click to start recording (Wear headphones and have your mic enabled).", 10, 20);

    // Setup voice recorder
    mic = new p5.AudioIn();
    mic.start();
    recorder = new p5.SoundRecorder();
    recorder.setInput(mic);
    soundFile = new p5.SoundFile();

    // Setup speech recorder
    speech = new p5.SpeechRec();
}

function mousePressed() {
    if (state === 0 && mic.enabled) {

        // Start the recorder
        recorder.record(soundFile);

        // Update the graphics
        background(255, 0, 0);
        text('Recording now! Click to stop.', 10, 20);

        // Start recording the speech
        speech.continuous = true;
        speech.start();

        // Increment state
        state++;

    } else if (state === 1) {

        // Stop the recorder
        recorder.stop();

        // Update the graphics
        background(0, 255, 0);
        text('Recording stopped. Click to play & save', 10, 20);

        // Stop recording the speech
        speech.continuous = false;

        // Increment the state
        state++;

    } else if (state === 2) {

        // Play and save the sound file
        soundFile.play();
        saveSound(soundFile, 'soundFile.wav');

        // Display and save the text
        save(speech.resultString, 'soundTranscript.txt');

        // Increment the state
        state++;
    }
}

function showResult() {
    if (speech.resultValue === true) {
        text(speech.resultString, width / 2, height / 2);
    }
}