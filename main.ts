serial.redirectToUSB()

let DPAD ="";
let BUTTONS = "";
let AXISL = "";
let AXISR = "";
let BRAKE = "";
let THROTTLE = "";
let MISCBUTTONS = "";
let GYRO = "";
let ACCEL = "";

basic.forever(function () {
    dualsense.sendi2c("TEST:1");
    //led.toggle(2, 2)
    basic.pause(100)
    dualsense.sendi2c("TEST:0")
    //led.toggle(2, 2)
    basic.pause(100)

    DPAD = dualsense.sendAndRecv("DPAD");
    basic.pause(10)
    BUTTONS = dualsense.sendAndRecv("BUTTONS");
    basic.pause(10)
    // AXISL = dualsense.sendAndRecv("AXISL");
    // basic.pause(10)
    // AXISR = dualsense.sendAndRecv("AXISR");
    // basic.pause(10)
    // BRAKE = dualsense.sendAndRecv("BRAKE");
    // basic.pause(10)
    // THROTTLE = dualsense.sendAndRecv("THROTTLE");
    // basic.pause(10)
    // MISCBUTTONS = dualsense.sendAndRecv("MISCBUTTONS");
    // basic.pause(10)
    // GYRO = dualsense.sendAndRecv("GYRO");
    // basic.pause(10)
    // ACCEL = dualsense.sendAndRecv("ACCEL");
    // basic.pause(10)
})

input.onButtonPressed(Button.A, function () {
    dualsense.sendi2c("RUMBLE")
})

input.onButtonPressed(Button.B, function () {
    dualsense.sendi2c("LED:2")
    dualsense.sendi2c("COLOUR:255,255,224")
    dualsense.sendi2c("LED:4")
})

