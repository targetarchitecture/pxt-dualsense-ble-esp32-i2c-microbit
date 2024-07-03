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
            //serial.writeLine("recieveI2CData: (" + retTxt + ")");
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
            }

            basic.pause(pause);
        })
    }

    export const btnOffset = 1000;

    function buttonState(i2cData: string) {
        let buttons = i2cData.split(",");

        //serial.writeLine("buttonState:" + i2cData);
        //  serial.writeLine(control.millis() + "> Button:A,parseInt:" + buttons[0] + ",Pressed:" + A_PRESSED);

        if (A_PRESSED == 0 && parseInt(buttons[Buttons.A]) == 1) {
            //serial.writeLine(control.millis() + "> Button:A,parseInt:" + parseInt(buttons[Buttons.A]) + ",Pressed:" + A_PRESSED);

            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.A, Buttons.A + btnOffset);
        }

        if (B_PRESSED == 0 && parseInt(buttons[Buttons.B]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.B, Buttons.B + btnOffset);

        } else if (X_PRESSED == 0 && parseInt(buttons[Buttons.X]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.X, Buttons.X + btnOffset);

        } else if (Y_PRESSED == 0 && parseInt(buttons[Buttons.Y]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.Y, Buttons.Y + btnOffset);

        } else if (L1_PRESSED == 0 && parseInt(buttons[Buttons.L1]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.L1, Buttons.L1 + btnOffset);

        } else if (L2_PRESSED == 0 && parseInt(buttons[Buttons.L2]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.L2, Buttons.L2 + btnOffset);

        } else if (R1_PRESSED == 0 && parseInt(buttons[Buttons.R1]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.R1, Buttons.R1 + btnOffset);

        } else if (R2_PRESSED == 0 && parseInt(buttons[Buttons.R2]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.R2, Buttons.R2 + btnOffset);

        } else if (LTHUMB_PRESSED == 0 && parseInt(buttons[Buttons.LTHUMB]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.LTHUMB, Buttons.LTHUMB + btnOffset);

        } else if (RTHUMB_PRESSED == 0 && parseInt(buttons[Buttons.RTHUMB]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.RTHUMB, Buttons.RTHUMB + btnOffset);
        }

        A_PRESSED = parseInt(buttons[Buttons.A]);
        B_PRESSED = parseInt(buttons[Buttons.B]);
        X_PRESSED = parseInt(buttons[Buttons.X]);
        Y_PRESSED = parseInt(buttons[Buttons.Y]);
        L1_PRESSED = parseInt(buttons[Buttons.L1]);
        L2_PRESSED = parseInt(buttons[Buttons.L2]);
        R1_PRESSED = parseInt(buttons[Buttons.R1]);
        R2_PRESSED = parseInt(buttons[Buttons.R2]);
        LTHUMB_PRESSED = parseInt(buttons[Buttons.LTHUMB]);
        RTHUMB_PRESSED = parseInt(buttons[Buttons.RTHUMB]);
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
    }

    function axisRightState(i2cData: string) {
        let AXISR = i2cData.split(",");
        let command = AXISR[0];
        RAXISX = parseInt(AXISR[1]);
        RAXISY = parseInt(AXISR[2]);
    }

    function triggerState(i2cData: string) {
        let TRIGGERS = i2cData.split(",");
        let command = TRIGGERS[0];

        if (parseInt(TRIGGERS[1]) != BRAKE) {
            BRAKE = parseInt(TRIGGERS[1]);
            control.raiseEvent(PS5_BRAKE_VALUE_CHANGED, BRAKE);
        }

        if (parseInt(TRIGGERS[2]) != THROTTLE) {
            THROTTLE = parseInt(TRIGGERS[2]);
            control.raiseEvent(PS5_THROTTLE_VALUE_CHANGED, THROTTLE);
        }
    }

    /**
     * Do something when the brake is changed
     * @param value the brake value
     */
    //% block="on brake"
    //% weight=50
    export function onBrake(
        handler: (value: number) => void
    ) {
        control.onEvent(
            PS5_BRAKE_VALUE_CHANGED,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler(control.eventValue());
            }
        );
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

    const PS5_BRAKE_VALUE_CHANGED = 5010;
    const PS5_THROTTLE_VALUE_CHANGED = 5020;
    const PS5_BUTTON_CLICKED = 5090;

    export enum Buttons {
        //% block=" A"    
        A = 1,
        //% block="B"
        B = 2,
        //% block="X"
        X = 3,
        //% block="Y"
        Y = 4,
        //% block="L1"
        L1 = 5,
        //% block="L2"
        L2 = 6,
        //% block="R1"
        R1 = 7,
        //% block="R2"
        R2 = 8,
        //% block="Left Thumb"
        LTHUMB = 9,
        //% block="Right Thumb" 
        RTHUMB = 10
    }

    /**
     * Do something when a button is touched.
     * @param btn the button to be checked
     * @param handler body code to run when the event is raised
     */
    //% weight=60
    //% block="on button %btn | clicked"
    export function onClicked(
        btn: Buttons,
        handler: () => void
    ) {
        control.onEvent(
            PS5_BUTTON_CLICKED + btn,
            EventBusValue.MICROBIT_EVT_ANY,
            () => {
                handler();
            }
        );
    }
}
