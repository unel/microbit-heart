control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    if (lastTimeAClicked) {
        timeBetweenClickToA = control.millis() - lastTimeAClicked
        if (timeBetweenClickToA < 3000) {
            toggleDecBpm()
        }
    }
    lastTimeAClicked = control.millis()
})
function toggleIncBpm () {
    isIncBpmEnabled = !(isIncBpmEnabled)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
})
function incBpm () {
    bpm += 10
    music.setTempo(bpm)
    showBpm()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 1, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    if (lastTimeBClicked) {
        timeBetweenClickToB = control.millis() - lastTimeBClicked
        if (timeBetweenClickToB < 3000) {
            toggleIncBpm()
        } else {
        	
        }
    }
    lastTimeBClicked = control.millis()
})
function decBpm () {
    bpm += -10
    music.setTempo(bpm)
    showBpm()
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 1, 255, 0, 10, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
}
function toggleDecBpm () {
    isDecBpmEnabled = !(isDecBpmEnabled)
}
input.onButtonPressed(Button.AB, function () {
    haloDisplay.clear()
    haloDisplay.show()
    music.stopAllSounds()
    basic.showNumber(bpm)
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
let isDecBpmEnabled = false
let timeBetweenClickToB = 0
let lastTimeBClicked = 0
let isIncBpmEnabled = false
let timeBetweenClickToA = 0
let lastTimeAClicked = 0
let bpm = 0
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
basic.showLeds(`
    . . . . #
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    `)
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
bpm = 120
haloDisplay.showRainbow(1, 360)
kitronik_halo_hd.setBuzzerPin()
haloDisplay.setBrightness(101)
haloDisplay.show()
loops.everyInterval(Math.max(timeBetweenClickToB, 200), function () {
    if (isIncBpmEnabled) {
        incBpm()
    }
})
loops.everyInterval(Math.max(timeBetweenClickToA, 200), function () {
    if (isDecBpmEnabled) {
        decBpm()
    }
})
