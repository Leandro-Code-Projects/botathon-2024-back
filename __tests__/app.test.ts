import request from "supertest";

import app from "../src/app";

describe("Test ping endpoint", () => {
  test("Ping Endpoint return Pong", async () => {
    const res = await request(app).get("/ping").send();
    expect(res.text).toEqual("pong");
  });
});
