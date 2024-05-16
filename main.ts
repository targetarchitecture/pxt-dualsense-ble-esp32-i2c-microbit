basic.forever(function () {
    // New Dualsense library

   dualsense.axisRightState()
    basic.pause(500)
    dualsense.buttonState()
    basic.pause(500)
})


input.onButtonPressed(Button.A, function() {
    dualsense.colour(randint(0, 255), randint(0, 255), randint(0, 255))
})

// dualsense.onClicked(dualsense.Buttons.A, function() {
//     dualsense.rumble();
// })

// dualsense.onClicked(dualsense.Buttons.X, function () {
//     dualsense.led(randint(1,4))
// })
