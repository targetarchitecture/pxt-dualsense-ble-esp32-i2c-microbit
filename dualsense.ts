//% color=#FF6EC7 icon="\uf11b" block="PS5 DualSense"
//% category="PS5 DualSense"
namespace dualsense {

    const i2cAddress = 121;

    export let DPAD_UP_PRESSED = 0;
    export let DPAD_UP_RIGHT_PRESSED = 0;
    export let DPAD_RIGHT_PRESSED = 0;
    export let DPAD_DOWN_RIGHT_PRESSED = 0;
    export let DPAD_DOWN_PRESSED = 0;
    export let DPAD_DOWN_LEFT_PRESSED = 0;
    export let DPAD_LEFT_PRESSED = 0;
    export let DPAD_UP_LEFT_PRESSED = 0;

    export let A_PRESSED = 0;
    export let B_PRESSED = 0;
    export let X_PRESSED = 0;
    export let Y_PRESSED = 0;
    export let L1_PRESSED = 0;
    export let L2_PRESSED = 0;
    export let R1_PRESSED = 0;
    export let R2_PRESSED = 0;
    export let LTHUMB_PRESSED = 0;
    export let RTHUMB_PRESSED = 0;

    export let LAXISX = 0;
    export let LAXISY = 0;
    export let RAXISX = 0;
    export let RAXISY = 0;
    export let BRAKE = 0;
    export let THROTTLE = 0;

    export let LHOUR = 0;
    export let LSPEED = 0;

    export let RHOUR = 0;
    export let RSPEED = 0;

    function sendi2c(command: string) {

        let buff = pins.createBuffer(command.length);

        for (let j = 0; j <= buff.length - 1; j++) {
            buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
        }

        pins.i2cWriteBuffer(i2cAddress, buff)
    }

    function recieveI2CData() {
        let retTxt = ""
        let ret = pins.i2cReadBuffer(i2cAddress, 32).toArray(NumberFormat.Int8LE)
        for (let i = 0; i <= ret.length - 1; i++) {
            if (ret[i] != -1) {
                retTxt = retTxt.concat(String.fromCharCode(ret[i]));
            }
        }
        retTxt = retTxt.replace("\n", "");

        //serial.writeLine("recieveI2CData: (" + retTxt + ")");

        let command = retTxt.split(",", 1)

        if (command[0] == "DPAD") {
            dpadState(retTxt);
        } else if (command[0] == "BUTTONS") {
            buttonState(retTxt);
        } else if (command[0] == "AXISL") {
            axisLeftState(retTxt);
        } else if (command[0] == "AXISR") {
            axisRightState(retTxt);
        } else if (command[0] == "TRIGGERS") {
            triggerState(retTxt);
        } else if (command[0] == "GYRO") {
            //  dpadState(retTxt);
        } else if (command[0] == "ACCEL") {
            // dpadState(retTxt);
        }
    }

    export let stopDualSense = false;

    /**
     * Start using Playstation Dualsense
     */
    //% weight=100
    //% block="Start Controller"   
    export function startDualSense(pause = 10) {
        basic.forever(function () {

            //check to see if we have tried to stop the dual sense monitoring
            if (stopDualSense == false) {
                recieveI2CData();
            } else {
                //set all to blank to prevent run-away robots..."danger rogue robots"

                DPAD_UP_PRESSED = 0;
                DPAD_UP_RIGHT_PRESSED = 0;
                DPAD_RIGHT_PRESSED = 0;
                DPAD_DOWN_RIGHT_PRESSED = 0;
                DPAD_DOWN_PRESSED = 0;
                DPAD_DOWN_LEFT_PRESSED = 0;
                DPAD_LEFT_PRESSED = 0;
                DPAD_UP_LEFT_PRESSED = 0;

                A_PRESSED = 0;
                B_PRESSED = 0;
                X_PRESSED = 0;
                Y_PRESSED = 0;
                L1_PRESSED = 0;
                L2_PRESSED = 0;
                R1_PRESSED = 0;
                R2_PRESSED = 0;
                LTHUMB_PRESSED = 0;
                RTHUMB_PRESSED = 0;

                LAXISX = 0;
                LAXISY = 0;
                RAXISX = 0;
                RAXISY = 0;
                BRAKE = 0;
                THROTTLE = 0;

                LHOUR = 0;
                LSPEED = 0;

                RHOUR = 0;
                RSPEED = 0;
            }

            basic.pause(pause);
        })
    }

    function buttonState(i2cData: string) {
        let buttons = i2cData.split(",");

        A_PRESSED = parseInt(buttons[1]);
        B_PRESSED = parseInt(buttons[2]);
        X_PRESSED = parseInt(buttons[3]);
        Y_PRESSED = parseInt(buttons[4]);
        L1_PRESSED = parseInt(buttons[5]);
        L2_PRESSED = parseInt(buttons[6]);
        R1_PRESSED = parseInt(buttons[7]);
        R2_PRESSED = parseInt(buttons[8]);
        LTHUMB_PRESSED = parseInt(buttons[9]);
        RTHUMB_PRESSED = parseInt(buttons[10]);
    }

    function dpadState(i2cData: string) {
        let directions = i2cData.split(",");
        let command = directions[0];
        DPAD_UP_PRESSED = parseInt(directions[1]);
        DPAD_UP_RIGHT_PRESSED = parseInt(directions[2]);
        DPAD_RIGHT_PRESSED = parseInt(directions[3]);
        DPAD_DOWN_RIGHT_PRESSED = parseInt(directions[4]);
        DPAD_DOWN_PRESSED = parseInt(directions[5]);
        DPAD_DOWN_LEFT_PRESSED = parseInt(directions[6]);
        DPAD_LEFT_PRESSED = parseInt(directions[7]);
        DPAD_UP_LEFT_PRESSED = parseInt(directions[8]);
    }

    function axisLeftState(i2cData: string) {
        let AXISL = i2cData.split(",");
        let command = AXISL[0];
        LAXISX = parseInt(AXISL[1]);
        LAXISY = parseInt(AXISL[2]);
        LHOUR = parseInt(AXISL[3]);
        LSPEED = parseInt(AXISL[4]);
    }

    function axisRightState(i2cData: string) {
        let AXISR = i2cData.split(",");
        let command = AXISR[0];
        RAXISX = parseInt(AXISR[1]);
        RAXISY = parseInt(AXISR[2]);
        RHOUR = parseInt(AXISR[3]);
        RSPEED = parseInt(AXISR[4]);
    }

    function triggerState(i2cData: string) {
        let TRIGGERS = i2cData.split(",");
        let command = TRIGGERS[0];

        if (parseInt(TRIGGERS[1]) != BRAKE) {
            BRAKE = parseInt(TRIGGERS[1]);
        }

        if (parseInt(TRIGGERS[2]) != THROTTLE) {
            THROTTLE = parseInt(TRIGGERS[2]);
        }
    }

    /**
     * Rumble on the Playstation Dualsense
     */
    //% weight=90
    //% block="rumble" 
    export function rumble() {
        sendi2c("RUMBLE")
    }

    /**
     * set colour on the Playstation Dualsense
     */
    //% weight=80
    //% block="set colour" 
    export function colour(red: number, green: number, blue: number) {
        sendi2c("COLOUR:" + red + "," + green + "," + blue)
    }

    /**
     * set player LED on the Playstation Dualsense
     */
    //% weight=70
    //% block="set player LED" 
    export function led(count: number) {
        sendi2c("LED:" + count)
    }
}
