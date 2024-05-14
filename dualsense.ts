//% color=#FF6EC7 icon="\uf11b" block="PS5 DualSense"
//% category="PS5 DualSense"
namespace dualsense {

    const i2cAddress = 121;

    export let DPAD_UP_PRESSED = false;
    export let DPAD_UP_RIGHT_PRESSED = false;
    export let DPAD_RIGHT_PRESSED = false;
    export let DPAD_DOWN_RIGHT_PRESSED = false;
    export let DPAD_DOWN_PRESSED = false;
    export let DPAD_DOWN_LEFT_PRESSED = false;
    export let DPAD_LEFT_PRESSED = false;
    export let DPAD_UP_LEFT_PRESSED = false;

    export let A_PRESSED = false;
    export let B_PRESSED = false;
    export let X_PRESSED = false;
    export let Y_PRESSED = false;
    export let L1_PRESSED = false;
    export let L2_PRESSED = false;
    export let R1_PRESSED = false;
    export let R2_PRESSED = false;
    export let LTHUMB_PRESSED = false;
    export let RTHUMB_PRESSED = false;
    export let SYSTEM_PRESSED = false;
    export let SELECT_PRESSED = false;
    export let START_PRESSED = false;
    export let CAPTURE_PRESSED = false;

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
        return retTxt;
    }

    function sendAndRecv(command: string) {
        sendi2c(command);
        return recvi2c();
    }

    function parseBool(value: string) {
        let i = parseInt(value);
        if (i == 1) {
            return true;
        } else {
            return false;
        }
    }

    export const btnOffset = 1000;

    /**
     * Check for button states on the Playstation Dualsense
     */
    //% weight=10
    //% block="button state"   
    export function buttonState() {
        let returnedValue = sendAndRecv("BUTTONS");
        let buttons = returnedValue.split(",");

        if (A_PRESSED == false && parseBool(buttons[Buttons.A]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.A, Buttons.A + btnOffset);
        } else if (B_PRESSED == false && parseBool(buttons[Buttons.B]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.B, Buttons.B + btnOffset);
        } else if (X_PRESSED == false && parseBool(buttons[Buttons.X]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.X, Buttons.X + btnOffset);
        } else if (Y_PRESSED == false && parseBool(buttons[Buttons.Y]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.Y, Buttons.Y + btnOffset);
        } else if (L1_PRESSED == false && parseBool(buttons[Buttons.L1]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.L1, Buttons.L1 + btnOffset);
        } else if (L2_PRESSED == false && parseBool(buttons[Buttons.L2]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.L2, Buttons.L2 + btnOffset);
        } else if (R1_PRESSED == false && parseBool(buttons[Buttons.R1]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.R1, Buttons.R1 + btnOffset);
        } else if (R2_PRESSED == false && parseBool(buttons[Buttons.R2]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.R2, Buttons.R2 + btnOffset);
        } else if (LTHUMB_PRESSED == false && parseBool(buttons[Buttons.LTHUMB]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.LTHUMB, Buttons.LTHUMB + btnOffset);
        } else if (RTHUMB_PRESSED == false && parseBool(buttons[Buttons.RTHUMB]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.RTHUMB, Buttons.RTHUMB + btnOffset);
        } else if (SYSTEM_PRESSED == false && parseBool(buttons[Buttons.SYSTEM]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.SYSTEM, Buttons.SYSTEM + btnOffset);
        } else if (SELECT_PRESSED == false && parseBool(buttons[Buttons.SELECT]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.SELECT, Buttons.SELECT + btnOffset);
        } else if (START_PRESSED == false && parseBool(buttons[Buttons.START]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.START, Buttons.START + btnOffset);
        } else if (CAPTURE_PRESSED == false && parseBool(buttons[Buttons.CAPTURE]) == true) {
            control.raiseEvent(PS5_BUTTON_CLICKED + Buttons.CAPTURE, Buttons.CAPTURE + btnOffset);
        }

        A_PRESSED = parseBool(buttons[0]);
        B_PRESSED = parseBool(buttons[1]);
        X_PRESSED = parseBool(buttons[2]);
        Y_PRESSED = parseBool(buttons[3]);
        L1_PRESSED = parseBool(buttons[4]);
        L2_PRESSED = parseBool(buttons[5]);
        R1_PRESSED = parseBool(buttons[6]);
        R2_PRESSED = parseBool(buttons[7]);
        LTHUMB_PRESSED = parseBool(buttons[8]);
        RTHUMB_PRESSED = parseBool(buttons[9]);
        SYSTEM_PRESSED = parseBool(buttons[10]);
        SELECT_PRESSED = parseBool(buttons[11]);
        START_PRESSED = parseBool(buttons[12]);
        CAPTURE_PRESSED = parseBool(buttons[13]);
    }


    /**
     * Check for DPad states on the Playstation Dualsense
     */
    //% weight=20
    //% block="dpad state"   
    export function dpadState() {
        let returnedValue = sendAndRecv("DPAD");
        let directions = returnedValue.split(",");
        DPAD_UP_PRESSED = parseBool(directions[0]);
        DPAD_UP_RIGHT_PRESSED = parseBool(directions[1]);
        DPAD_RIGHT_PRESSED = parseBool(directions[2]);
        DPAD_DOWN_RIGHT_PRESSED = parseBool(directions[3]);
        DPAD_DOWN_PRESSED = parseBool(directions[4]);
        DPAD_DOWN_LEFT_PRESSED = parseBool(directions[5]);
        DPAD_LEFT_PRESSED = parseBool(directions[6]);
        DPAD_UP_LEFT_PRESSED = parseBool(directions[7]);
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
