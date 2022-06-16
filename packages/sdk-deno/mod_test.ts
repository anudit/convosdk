import { Convo } from "./mod.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("test comments.query", async () => {

    const convo = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');
    const comments = await convo.comments.query({threadId: 'KIGZUnR4RzXDFheXoOwo', page: 1, pageSize: 10});
    assertEquals(comments.length, 10);

});

Deno.test("test base.logConfig", async () => {

    const convo = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');
    const config = await convo.logConfig();
    assertEquals(config.platform, 'deno');
    assertEquals(config.pingResult?.success, true);

});
