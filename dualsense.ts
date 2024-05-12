// Add your code here
namespace dualsense {

    export const i2cAddress = 121

    export function sendi2c(command: String) {

        let buff = pins.createBuffer(command.length);

        for (let j = 0; j <= buff.length - 1; j++) {
            buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
        }

        pins.i2cWriteBuffer(i2cAddress, buff)
        buff = null;
    }

    export function recvi2c() {
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

    export function sendAndRecv(command: String) {
        sendi2c(command);
        return recvi2c();
    }
}
