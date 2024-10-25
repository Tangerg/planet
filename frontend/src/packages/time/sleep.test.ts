import {test} from 'vitest'
import {sleep} from "./sleep";
import {Duration} from "./duration";

test("sleep", async () => {
    console.log("start", Date.now())
    await sleep(Duration.fromSeconds(5))
    console.log("end", Date.now())
})