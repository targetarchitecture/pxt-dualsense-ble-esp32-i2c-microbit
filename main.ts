input.onButtonPressed(Button.A, function () {
    dualsense.rumble
    dualsense.led(2)
})
input.onButtonPressed(Button.B, function () {
    dualsense.colour(255,0,155)
    dualsense.led(4)
})

basic.forever(function () {
    // dualsense.test(true);
    // basic.pause(50);

    // dualsense.test(false);
    // basic.pause(50);

    dualsense.buttonState();
    basic.pause(10)

   dualsense.dpadState();
    basic.pause(10)

   dualsense.axisLeftState();
    basic.pause(10)

   dualsense.axisRightState();
    basic.pause(10)

   dualsense.triggerState();
    basic.pause(10)
    
    basic.pause(100)
})

basic.forever(function () {
    serial.writeLine(control.millis() + " > " + dualsense.A_PRESSED)
    serial.writeLine(control.millis() + " > " + dualsense.DPAD_UP_PRESSED)
    serial.writeLine(control.millis() + " > " + dualsense.LAXISX)
    serial.writeLine(control.millis() + " > " + dualsense.RAXISX)
    serial.writeLine(control.millis() + " > " + dualsense.THROTTLE)

    basic.pause(1000)
})

