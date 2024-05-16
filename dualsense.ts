//% color=#FF6EC7 icon="\uf11b" block="PS5 DualSense"
//% category="PS5 DualSense"
namespace dualsense {

    const i2cAddress = 121;

    let DPAD_UP_PRESSED = 0;
    let DPAD_UP_RIGHT_PRESSED = 0;
    let DPAD_RIGHT_PRESSED = 0;
    let DPAD_DOWN_RIGHT_PRESSED = 0;
    let DPAD_DOWN_PRESSED = 0;
    let DPAD_DOWN_LEFT_PRESSED = 0;
    let DPAD_LEFT_PRESSED = 0;
    let DPAD_UP_LEFT_PRESSED = 0;

    let A_PRESSED = 0;
    let B_PRESSED = 0;
    let X_PRESSED = 0;
    let Y_PRESSED = 0;
    let L1_PRESSED = 0;
    let L2_PRESSED = 0;
    let R1_PRESSED = 0;
    let R2_PRESSED = 0;
    let LTHUMB_PRESSED = 0;
    let RTHUMB_PRESSED = 0;
    let SYSTEM_PRESSED = 0;
    let SELECT_PRESSED = 0;
    let START_PRESSED = 0;
    let CAPTURE_PRESSED = 0;

    let LAXISX = 0;
    let LAXISY = 0;
    let RAXISX = 0;
    let RAXISY = 0;
    let BRAKE = 0;
    let THROTTLE = 0;

    function sendi2c(command: string) {

        let buff = pins.createBuffer(command.length);

        for (let j = 0; j <= buff.length - 1; j++) {
            buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
        }

        pins.i2cWriteBuffer(i2cAddress, buff)
        buff = null;
    }

    // function recvi2c() {
    //     let retTxt = ""
    //     let ret = pins.i2cReadBuffer(i2cAddress, 32).toArray(NumberFormat.Int8LE)
    //     for (let i = 0; i <= ret.length - 1; i++) {
    //         if (ret[i] != -1) {
    //             retTxt = retTxt.concat(String.fromCharCode(ret[i]));
    //         }
    //     }
    //     ret = null;
    //     return retTxt;
    // }

    function sendAndRecv(command: string) {
        let buff = pins.createBuffer(command.length);
        let retTxt = "";

        for (let j = 0; j <= buff.length - 1; j++) {
            buff.setNumber(NumberFormat.Int8LE, j, command.charCodeAt(j))
        }

        pins.i2cWriteBuffer(i2cAddress, buff);
        basic.pause(5);
        let readBuffer = pins.i2cReadBuffer(i2cAddress, 32).toArray(NumberFormat.Int8LE);

        for (let i = 0; i <= readBuffer.length - 1; i++) {
            if (readBuffer[i] != -1) {
                retTxt = retTxt.concat(String.fromCharCode(readBuffer[i]));
            }
        }

        serial.writeLine("sendAndRecv:" + command);
        serial.writeLine("sendAndRecv (" + retTxt.replace("\n","") + ")");

        return retTxt;
    }

    // function parseInt(value: string) {
    //     let i = parseInt(value);
    //     if (i == 1) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    export const btnOffset = 1000;

    /**
     * Check for button states on the Playstation Dualsense
     */

    //% weight=10
    //% block="button state"   
    export function buttonState() {
        let returnedValue = sendAndRecv("BUTTONS");
        let buttons = returnedValue.split(",");

        serial.writeLine("buttonState:" + returnedValue);
      //  serial.writeLine(control.millis() + "> Button:A,parseInt:" + buttons[0] + ",Pressed:" + A_PRESSED);

        if (A_PRESSED == 0 && parseInt(buttons[1]) == 1) {
             serial.writeLine(control.millis() + "> Button:A,parseInt:" + parseInt(buttons[1]) + ",Pressed:" + A_PRESSED);
            A_PRESSED = 1;

            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.A, Buttons.A + btnOffset);
        }
        else {
            A_PRESSED = 0;
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

        } else if (SYSTEM_PRESSED == 0 && parseInt(buttons[Buttons.SYSTEM]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.SYSTEM, Buttons.SYSTEM + btnOffset);

        } else if (SELECT_PRESSED == 0 && parseInt(buttons[Buttons.SELECT]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.SELECT, Buttons.SELECT + btnOffset);

        } else if (START_PRESSED == 0 && parseInt(buttons[Buttons.START]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.START, Buttons.START + btnOffset);

        } else if (CAPTURE_PRESSED == 0 && parseInt(buttons[Buttons.CAPTURE]) == 1) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.CAPTURE, Buttons.CAPTURE + btnOffset);
        }

        //  A_PRESSED = parseInt(buttons[0]);
        B_PRESSED = parseInt(buttons[1]);
        X_PRESSED = parseInt(buttons[2]);
        Y_PRESSED = parseInt(buttons[3]);
        L1_PRESSED = parseInt(buttons[4]);
        L2_PRESSED = parseInt(buttons[5]);
        R1_PRESSED = parseInt(buttons[6]);
        R2_PRESSED = parseInt(buttons[7]);
        LTHUMB_PRESSED = parseInt(buttons[8]);
        RTHUMB_PRESSED = parseInt(buttons[9]);
        SYSTEM_PRESSED = parseInt(buttons[10]);
        SELECT_PRESSED = parseInt(buttons[11]);
        START_PRESSED = parseInt(buttons[12]);
        CAPTURE_PRESSED = parseInt(buttons[13]);
    }


    /**
     * Check for DPad states on the Playstation Dualsense
     */
    //% weight=20
    //% block="dpad state"   
    export function dpadState() {
        let returnedValue = sendAndRecv("DPAD");
        let directions = returnedValue.split(",");
        DPAD_UP_PRESSED = parseInt(directions[0]);
        DPAD_UP_RIGHT_PRESSED = parseInt(directions[1]);
        DPAD_RIGHT_PRESSED = parseInt(directions[2]);
        DPAD_DOWN_RIGHT_PRESSED = parseInt(directions[3]);
        DPAD_DOWN_PRESSED = parseInt(directions[4]);
        DPAD_DOWN_LEFT_PRESSED = parseInt(directions[5]);
        DPAD_LEFT_PRESSED = parseInt(directions[6]);
        DPAD_UP_LEFT_PRESSED = parseInt(directions[7]);
    }

    /**
     * Check for Left stick states on the Playstation Dualsense
     */
    //% weight=30
    //% block="left stick state" 
    export function axisLeftState() {
        let returnedValue = sendAndRecv("AXISL");
        let AXISL = returnedValue.split(",");
        LAXISX = parseInt(AXISL[0]);
        LAXISY = parseInt(AXISL[1]);
    }

    /**
     * Check for Right stick states on the Playstation Dualsense
     */
    //% weight=40
    //% block="right stick state" 
    export function axisRightState() {
        let returnedValue = sendAndRecv("AXISR");
        let AXISR = returnedValue.split(",");
        LAXISX = parseInt(AXISR[0]);
        LAXISY = parseInt(AXISR[1]);
    }

    /**
     * Check for trigger states on the Playstation Dualsense
     */
    //% weight=50
    //% block="trigger state" 
    export function triggerState() {
        let returnedValue = sendAndRecv("TRIGGERS");
        let TRIGGERS = returnedValue.split(",");

        if (parseInt(TRIGGERS[0]) != BRAKE) {
            BRAKE = parseInt(TRIGGERS[0]);
            control.raiseEvent(PS5_BRAKE_VALUE_CHANGED, BRAKE);
        }

        THROTTLE = parseInt(TRIGGERS[1]);
    }

    /**
     * Do something when the brake is changed
     * @param value the brake value
     */
    //% block="on brake"
    //% weight=65
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
    //% weight=60
    //% block="rumble" 
    export function rumble() {
        sendi2c("RUMBLE")
    }

    /**
     * set colour on the Playstation Dualsense
     */
    //% weight=70
    //% block="set colour" 
    export function colour(red: number, green: number, blue: number) {
        sendi2c("COLOUR:" + red + "," + green + "," + blue)
    }

    /**
     * set player LED on the Playstation Dualsense
     */
    //% weight=80
    //% block="set player LED" 
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

    const PS5_BRAKE_VALUE_CHANGED = 5010;
    const PS5_BUTTON_CLICKED = 5020;

    export enum Buttons {
        //% block=" A"    
        A = 0,
        //% block="B"
        B = 1,
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="L1"
        L1 = 4,
        //% block="L2"
        L2 = 5,
        //% block="R1"
        R1 = 6,
        //% block="R2"
        R2 = 7,
        //% block="Left Thumb"
        LTHUMB = 8,
        //% block="Right Thumb" 
        RTHUMB = 9,
        //% block="System" 
        SYSTEM = 10,
        //% block="Select"
        SELECT = 11,
        //% block="Start"
        START = 12,
        //% block="Capture" 
        CAPTURE = 13
    }

    /**
     * Do something when a button is touched.
     * @param btn the button to be checked
     * @param handler body code to run when the event is raised
     */
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
