import { makeHandler } from "../_factory";
import { promptEvidence } from "../prompts";

export const dynamic = "force-dynamic";
export const POST = makeHandler((b)=>promptEvidence(b, b.compliance||[], b.keyRequirements||[]));