input.onButtonPressed(Button.A, function () {
    dualsense.sendi2c("RUMBLE")
    dualsense.sendi2c("LED:2")
})
input.onButtonPressed(Button.B, function () {
    dualsense.sendi2c("COLOUR:255,255,224")
    dualsense.sendi2c("LED:4")
})
let MISCBUTTONS = ""
let AXISR = ""
let AXISL = ""
let BUTTONS = ""
let DPAD = ""
let TRIGGERS = ""

//serial.redirectToUSB()
//music.setBuiltInSpeakerEnabled(true)
//music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.UntilDone)

basic.forever(function () {
    // dualsense.sendi2c("TEST:1");
    // basic.pause(50)

    // dualsense.sendi2c("TEST:0")
    // basic.pause(50)

    BUTTONS = dualsense.sendAndRecv("BUTTONS");
    basic.pause(10)

    DPAD = dualsense.sendAndRecv("DPAD");
    basic.pause(10)

    AXISL = dualsense.sendAndRecv("AXISL");
    basic.pause(10)

    AXISR = dualsense.sendAndRecv("AXISR");
    basic.pause(10)

    TRIGGERS = dualsense.sendAndRecv("TRIGGERS");
    basic.pause(10)
    
    basic.pause(100)
})

basic.forever(function () {
    serial.writeLine(control.millis() + " > " + BUTTONS)
    serial.writeLine(control.millis() + " > " + DPAD)
    serial.writeLine(control.millis() + " > " + AXISL)
    serial.writeLine(control.millis() + " > " + AXISR)
    serial.writeLine(control.millis() + " > " + TRIGGERS)

    basic.pause(1000)
})
