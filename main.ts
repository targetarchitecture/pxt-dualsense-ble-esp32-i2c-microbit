/**
 * })
 */
/**
 * basic.pause(1000)
 */
/**
 * led.toggle(2, 2)
 */
/**
 * )
 */
/**
 * false
 */
/**
 * NumberFormat.Int8LE,
 */
/**
 * 0,
 */
/**
 * i2cAddress,
 */
/**
 * pins.i2cWriteNumber(
 */
/**
 * basic.pause(1000)
 */
/**
 * led.toggle(2, 2)
 */
/**
 * )
 */
/**
 * false
 */
/**
 * NumberFormat.Int8LE,
 */
/**
 * 1,
 */
/**
 * i2cAddress,
 */
/**
 * pins.i2cWriteNumber(
 */
/**
 * basic.forever(function () {
 */

input.onButtonPressed(Button.A, function () {
    let ret = pins.i2cReadBuffer(i2cAddress, 15).toArray(NumberFormat.Int8LE)
    for (let i = 0; i <= ret.length - 1; i++) {
        charCode = ret[i]
        if (charCode != -1) {
            char = String.fromCharCode(charCode)
            retTxt = retTxt.concat(char);
        }
    }
    serial.writeString("recieved:" + retTxt)
})



let char2 = ""
let charCode2 = 0
let i2cCommand = ""
let char = ""
let charCode = 0
let retTxt2 = ""
let retTxt = ""
let i2cAddress = 121
serial.redirectToUSB()
let i2cCommands = [""]

input.onButtonPressed(Button.B, function () {
    i2cCommands.push("C:R,G,B")
})

basic.forever(function () {
    sendi2c("1")
    led.toggle(2, 2)
    basic.pause(1000)
    sendi2c("0")
    led.toggle(2, 2)
    basic.pause(1000)
    sendi2cCommands();
    let rcv = sendAndRecv("test");

    basic.showString(rcv);
})

function sendi2cCommands() {

    while (i2cCommands.length > 0) {
        i2cCommand = i2cCommands.shift()

        sendi2c(i2cCommand)
        basic.pause(10)
    }
}

function sendi2c(command: String) {

    let buff = pins.createBuffer(command.length);

    for (let j = 0; j <= buff.length - 1; j++) {
        buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
    }

    pins.i2cWriteBuffer(i2cAddress, buff)
}

function recvi2c() {
    let ret = pins.i2cReadBuffer(i2cAddress, 15).toArray(NumberFormat.Int8LE)
    for (let i = 0; i <= ret.length - 1; i++) {
        charCode = ret[i]
        if (charCode != -1) {
            char = String.fromCharCode(charCode)
            retTxt = retTxt.concat(char);
        }
    }
    serial.writeString("recieved:" + retTxt)
    return retTxt;
}

function sendAndRecv(command: String) {
    sendi2c(command);
    basic.pause(10)
    return recvi2c();
}