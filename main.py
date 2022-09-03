def on_microbit_id_button_a_evt_up():
    global timeBetweenClickToA, lastTimeAClicked
    if lastTimeAClicked:
        timeBetweenClickToA = control.millis() - lastTimeAClicked
        if timeBetweenClickToA < 500:
            toggleDecBpm()
    lastTimeAClicked = control.millis()
control.on_event(EventBusSource.MICROBIT_ID_BUTTON_A,
    EventBusValue.MICROBIT_BUTTON_EVT_UP,
    on_microbit_id_button_a_evt_up)

def on_logo_pressed():
    music.start_melody(music.built_in_melody(Melodies.ENTERTAINER),
        MelodyOptions.ONCE)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def incBpm():
    global bpm
    bpm += 10
    music.set_tempo(bpm)
    showBpm()
    music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
            500,
            1,
            255,
            0,
            10,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LINEAR),
        SoundExpressionPlayMode.IN_BACKGROUND)
def decBpm():
    global bpm
    bpm += -10
    music.set_tempo(bpm)
    showBpm()
    music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE,
            500,
            1,
            255,
            0,
            10,
            SoundExpressionEffect.NONE,
            InterpolationCurve.LINEAR),
        SoundExpressionPlayMode.IN_BACKGROUND)
def toggleDecBpm():
    global isDecBpmEnabled
    isDecBpmEnabled = not (isDecBpmEnabled)

def on_button_pressed_ab():
    basic.show_number(bpm)
    haloDisplay.clear()
    haloDisplay.show()
    music.stop_all_sounds()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    incBpm()
input.on_button_pressed(Button.B, on_button_pressed_b)

def showBpm():
    global ledsCount
    haloDisplay.clear()
    ledsCount = abs((120 - bpm) / 10)
    if bpm >= 120:
        haloDisplay.range(0, ledsCount).show_color(kitronik_halo_hd.colors(ZipLedColors.INDIGO))
    else:
        haloDisplay.range(60 - ledsCount, ledsCount).show_color(kitronik_halo_hd.colors(ZipLedColors.INDIGO))
ledsCount = 0
isDecBpmEnabled = False
timeBetweenClickToA = 0
lastTimeAClicked = 0
bpm = 0
haloDisplay: kitronik_halo_hd.ZIPHaloHd = None
haloDisplay = kitronik_halo_hd.create_zip_halo_display(60)
bpm = 120
haloDisplay.show_rainbow(1, 360)
kitronik_halo_hd.set_buzzer_pin()
haloDisplay.set_brightness(101)
haloDisplay.show()

def on_every_interval():
    if isDecBpmEnabled:
        decBpm()
loops.every_interval(500, on_every_interval)

def on_forever():
    pass
basic.forever(on_forever)
