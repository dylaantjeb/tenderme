import { NextResponse } from "next/server";
import { z } from "zod";
import { generateTenderDoc } from "@/lib/tender";

const schema = z.object({
  tender: z.object({
    title: z.string(),
    deadline: z.string().optional(),
    buyer: z.string().optional(),
    requirements: z.array(z.string()),
    questions: z.array(z.string()),
    fullText: z.string()
  }),
  company: z.object({
    companyName: z.string(),
    sector: z.string().optional(),
    usp: z.array(z.string()).optional(),
    references: z.array(z.object({
      client: z.string(),
      scope: z.string(),
      year: z.string().optional()
    })).optional()
  }),
  tone: z.enum(["formal","concise"]).optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = schema.parse(body);
    const result = await generateTenderDoc(input);
    return NextResponse.json({ ok:true, data: result });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message ?? "generate failed" }, { status: 400 });
  }
}