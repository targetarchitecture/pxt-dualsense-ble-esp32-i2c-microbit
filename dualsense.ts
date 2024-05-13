// Add your code here
namespace dualsense {

    const i2cAddress = 121;

    function sendi2c(command: String) {

        let buff = pins.createBuffer(command.length);

        for (let j = 0; j <= buff.length - 1; j++) {
            buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
        }

        pins.i2cWriteBuffer(i2cAddress, buff)
        buff = null;
    }

    function recvi2c() {
        let retTxt = ""
        let ret = pins.i2cReadBuffer(i2cAddress, 32).toArray(NumberFormat.Int8LE)
        for (let i = 0; i <= ret.length - 1; i++) {
            if (ret[i] != -1) {
                retTxt = retTxt.concat(String.fromCharCode(ret[i]));
            }
        }
        ret = null;
        //basic.pause(5)
        //serial.writeString("recieved:" + retTxt)
        return retTxt;
    }

    function sendAndRecv(command: String) {
        sendi2c(command);
        return recvi2c();
    }

    export function buttonState() {
        return sendAndRecv("BUTTONS");
    }

    export function dpadState() {
        return sendAndRecv("DPAD");
    }

    export function axisLeftState() {
        return sendAndRecv("AXISL");
    }

    export function axisRightState() {
        return sendAndRecv("AXISR");
    }

    export function triggerState() {
        return sendAndRecv("TRIGGERS");
    }

    export function colour(red: number, green: number, blue: number) {
        sendi2c("COLOUR:" + red + "," + green + "," + blue)
    }

    export function rumble() {
        sendi2c("RUMBLE")
    }

    export function led(count: number) {
        sendi2c("LED:" + count)
    }

    export function test(state: boolean) {
        if (state == true) {
            sendi2c("TEST:1")
        } else {
            sendi2c("TEST:0")
        }
    }
}
