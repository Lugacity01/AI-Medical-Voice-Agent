import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { notes } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        { 
          role: "system", 
          content: "Return a JSON array of doctor objects. Example: " + 
                   JSON.stringify(AIDoctorAgents.slice(0, 1)) + 
                   ". Only return the array, nothing else."
        },
        {
          role: "user",
          content: "Based on these symptoms: " + notes + 
                   ", suggest matching doctors from: " + 
                   JSON.stringify(AIDoctorAgents) + 
                   ". Return only a JSON array of doctor objects.",
        },
      ],
    });

    const rawResp = completion.choices[0].message || "";
    //@ts-ignore
    const Resp = rawResp.content.trim().replace("```json", '').replace("```", "")
    const JSONResp = JSON.parse(Resp);
    return NextResponse.json(JSONResp)

  } catch (e) {
    return NextResponse.json(e)
  }
}
