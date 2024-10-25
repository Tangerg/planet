import {test} from 'vitest'
import {sleep} from "./time";
import {Duration} from "./time";
import {Timer} from "./time";

test("sleep", async () => {
    console.log("start", Date.now())
    await sleep(Duration.fromSeconds(5))
    console.log("end", Date.now())
})


test("Timer", async () => {
    const timer = new Timer()
    await sleep(Duration.fromMilliseconds(500))
    console.log(timer.duration.milliseconds) //0
    console.log(timer.isRunning)
    timer.run()
    await sleep(Duration.fromMilliseconds(1500))
    console.log(timer.duration.milliseconds) //1500
    console.log(timer.isRunning)
    timer.pause()
    await sleep(Duration.fromMilliseconds(500))
    console.log(timer.duration.milliseconds) //1500
    console.log(timer.isRunning)
    timer.run()
    await sleep(Duration.fromMilliseconds(500))
    console.log(timer.duration.milliseconds) //2000
    console.log(timer.isRunning)
    timer.reset()
    console.log(timer.duration.milliseconds) //0
    console.log(timer.isRunning)
})
