input.onButtonPressed(Button.A, function () {
    dualsense.sendi2c("RUMBLE")
})
input.onButtonPressed(Button.B, function () {
    dualsense.sendi2c("LED:2")
    dualsense.sendi2c("COLOUR:255,255,224")
    dualsense.sendi2c("LED:4")
})
let ACCEL = ""
let GYRO = ""
let MISCBUTTONS = ""
let THROTTLE = ""
let BRAKE = ""
let AXISR = ""
let AXISL = ""
let ACTION = ""
let DPAD = ""
let ABUTTON : number

serial.redirectToUSB()
music.setBuiltInSpeakerEnabled(true)
//music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.UntilDone)

basic.forever(function () {
    //     dualsense.sendi2c("TEST:1");
    // // led.toggle(2, 2)
    //     basic.pause(50)
    //     dualsense.sendi2c("TEST:0")
    // // led.toggle(2, 2)
    //     basic.pause(50)
    //     DPAD = dualsense.sendAndRecv("DPAD");
    // // serial.writeString(DPAD)
    //     basic.pause(50)
    
    //NumberFormat.Int8LE
    //NumberFormat.UInt8LE

    //dualsense.sendi2c("ABUTTON");
  //  ABUTTON = pins.i2cReadNumber(dualsense.i2cAddress, NumberFormat.UInt8BE);
    
    // ABUTTON = parseInt( dualsense.sendAndRecv("ABUTTON"));
    // basic.pause(10)
    ACTION = dualsense.sendAndRecv("ACTION");
    basic.pause(10)
        AXISL = dualsense.sendAndRecv("AXISL");
    basic.pause(10)
    //     AXISR = dualsense.sendAndRecv("AXISR");
    // basic.pause(50)
    //     BRAKE = dualsense.sendAndRecv("BRAKE");
    // basic.pause(50)
    //     THROTTLE = dualsense.sendAndRecv("THROTTLE");
    // basic.pause(50)
    //     MISCBUTTONS = dualsense.sendAndRecv("MISCBUTTONS");
    // basic.pause(50)
    //     GYRO = dualsense.sendAndRecv("GYRO");
    // basic.pause(50)
    //     ACCEL = dualsense.sendAndRecv("ACCEL");
    // basic.pause(50)
})

basic.forever(function () {
    serial.writeLine("" + (AXISL))
    basic.pause(1000)
})
