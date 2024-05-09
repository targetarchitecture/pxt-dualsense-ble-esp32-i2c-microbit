
let char2 = ""
let charCode2 = 0
let i2cCommand = ""
let char = ""
let charCode = 0
let retTxt2 = ""
let retTxt = ""
let i2cAddress = 121
serial.redirectToUSB()

basic.forever(function () {
   dualsense.sendi2c("1");
    led.toggle(2, 2)
    basic.pause(1000)
    dualsense.sendi2c("0")
    led.toggle(2, 2)
    basic.pause(1000)

    let rcv = dualsense.sendAndRecv("B");

    basic.showString(rcv);
})
