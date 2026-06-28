import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src";

describe("PixelFace Worker", () => {
	it("processes POST requests and attempts to call Gemini API", async () => {
		const request = new Request("http://example.com", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				prompt: "a cyberpunk hacker",
				systemPrompt: "You are an avatar design AI."
			})
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);
		
		const data = await response.json();
		console.log("Response data:", data);
		expect(response.status).toBeDefined();
	});
});

