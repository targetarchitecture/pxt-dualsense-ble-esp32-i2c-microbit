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