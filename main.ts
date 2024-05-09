serial.redirectToUSB()

basic.forever(function () {
   dualsense.sendi2c("TEST:1");
    led.toggle(2, 2)
    basic.pause(1000)
    dualsense.sendi2c("TEST:0")
    led.toggle(2, 2)
    basic.pause(1000)

    // let rcv = dualsense.sendAndRecv("B");
    // basic.showString(rcv);
})

input.onButtonPressed(Button.A, function () {
    dualsense.sendi2c("RUMBLE")
})

input.onButtonPressed(Button.B, function () {
    dualsense.sendi2c("LED:2")
    dualsense.sendi2c("COLOUR:255,255,224")
    dualsense.sendi2c("LED:4")
})