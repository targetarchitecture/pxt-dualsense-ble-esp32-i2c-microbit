serial.redirectToUSB()

basic.forever(function () {
   dualsense.sendi2c("1");
    led.toggle(2, 2)
    basic.pause(1000)
    dualsense.sendi2c("0")
    led.toggle(2, 2)
    basic.pause(1000)

    // let rcv = dualsense.sendAndRecv("B");
    // basic.showString(rcv);
})

input.onButtonPressed(Button.A, function () {
    dualsense.sendi2c("R")
})