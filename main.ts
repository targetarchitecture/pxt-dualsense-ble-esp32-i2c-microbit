
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
    sendi2c("1");
    led.toggle(2, 2)
    basic.pause(1000)
    sendi2c("0")
    led.toggle(2, 2)
    basic.pause(1000)

    let rcv = sendAndRecv("B");

    basic.showString(rcv);
})

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
    basic.pause(5)
    return recvi2c();
}