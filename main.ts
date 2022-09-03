input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
})
function incBpm () {
    bpm += 10
    music.setTempo(bpm)
    showBpm()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 1, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
}
input.onButtonPressed(Button.A, function () {
    decBpm()
})
function decBpm () {
    bpm += -10
    music.setTempo(bpm)
    showBpm()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 1, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
}
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(bpm)
    haloDisplay.clear()
    haloDisplay.show()
    music.stopAllSounds()
})
input.onButtonPressed(Button.B, function () {
    incBpm()
})
function showBpm () {
    haloDisplay.clear()
    ledsCount = Math.abs((120 - bpm) / 10)
    if (bpm >= 120) {
        haloDisplay.range(0, ledsCount).showColor(kitronik_halo_hd.colors(ZipLedColors.Indigo))
    } else {
        haloDisplay.range(60 - ledsCount, ledsCount).showColor(kitronik_halo_hd.colors(ZipLedColors.Indigo))
    }
}
let ledsCount = 0
let bpm = 0
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
bpm = 120
haloDisplay.showRainbow(1, 360)
kitronik_halo_hd.setBuzzerPin()
haloDisplay.setBrightness(101)
haloDisplay.show()
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
