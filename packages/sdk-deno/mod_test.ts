import { Convo } from "./mod.ts";
import { assertEquals } from "./test_deps.ts";

Deno.test("test comments.query", async () => {

    let convo = new Convo('CSCpPwHnkB3niBJiUjy92YGP6xVkVZbWfK8xriDO');
    let comments = await convo.comments.query({threadId: 'KIGZUnR4RzXDFheXoOwo', page: 1, pageSize: 10});
    assertEquals(comments.length, 10);

});
