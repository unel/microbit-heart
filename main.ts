input.onButtonPressed(Button.A, function () {
    music.changeTempoBy(-10)
    basic.showNumber(music.tempo())
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(music.tempo())
})
input.onButtonPressed(Button.B, function () {
    music.changeTempoBy(10)
    basic.showNumber(music.tempo())
})
function showNumber (num: number) {
	
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
})
basic.forever(function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . # # # .
        . # . # .
        . . # . .
        . . . . .
        `)
    basic.showLeds(`
        . # . # .
        # . # . #
        # . . . #
        . # . # .
        . . # . .
        `)
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
        `)
    basic.showLeds(`
        # . . . #
        . . . . .
        . . . . .
        . . . . .
        # . . . #
        `)
})
