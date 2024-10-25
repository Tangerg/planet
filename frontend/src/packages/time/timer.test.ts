import {test} from 'vitest'
import {Timer} from "./timer";
import {sleep, sleepMilliseconds} from "./sleep";

test("Timer", async () => {
    const timer = new Timer()
    await sleepMilliseconds(500)
    console.log(timer.duration) //0
    console.log(timer.isRunning)
    timer.run()
    await sleepMilliseconds(1500)
    console.log(timer.duration) //1500
    console.log(timer.isRunning)
    timer.pause()
    await sleepMilliseconds(500)
    console.log(timer.duration) //1500
    console.log(timer.isRunning)
    timer.run()
    await sleepMilliseconds(500)
    console.log(timer.duration) //2000
    console.log(timer.isRunning)
    timer.reset()
    console.log(timer.duration) //0
    console.log(timer.isRunning)
})
