import { NextRequest } from "next/server";
import { chat, ok, bad } from "./_llm";
import { polishMarkdown } from "./_polish";

export function makeHandler(buildPrompt: (body:any)=>any[], post?: (raw:string, body:any)=>Promise<any>) {
  return async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const msgs = buildPrompt(body);
      const draft = await chat(msgs, 0.2);
      const polished = await polishMarkdown(draft, {
        ko: body?.extracted?.knockouts, req: body?.extracted?.eisen, kpi: body?.extracted?.kpi, tone: "winnend"
      });
      if (post) return ok(await post(polished, body));
      return ok({ markdown: polished });
    } catch (e:any) { return bad(e.message || "Generation failed", 500); }
  };
}