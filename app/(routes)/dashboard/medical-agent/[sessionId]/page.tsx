"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_component/DoctorAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
// import { useRouter } from "next/router";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null); // Initialize as null
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const router = useRouter();

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const StartCall = () => {
    setLoading(true);
    // Ensure Vapi instance is created only once per call start
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I'm your AI Medical Assistant. I'm here to help you out",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessionDetail?.selectedDoctor?.agentPrompt,
          },
        ],
      },
    };

    // @ts-ignore
    vapi.start(VapiAgentConfig);

    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
      setLoading(false);
    });

    // IMPORTANT: Move GenerateReport here
    vapi.on("call-end", async () => {
      console.log("Call ended");
      setCallStarted(false);
      setLoading(false); // Set loading to false when call genuinely ends
      // Generate report ONLY when the call has officially ended
      await GenerateReport();
      // Optionally remove listeners here, or in a cleanup effect
      // if (vapiInstance) { // Check if vapiInstance is still available before removing
      //     vapiInstance.off("call-start");
      //     vapiInstance.off("call-end");
      //     vapiInstance.off("message");
      //     vapiInstance.off("speech-start");
      //     vapiInstance.off("speech-end");
      // }
      setVapiInstance(null); // Clear the instance after all cleanup
    });

    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);

        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
        } else if (transcriptType == "final") {
          // FInal Transcript
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
        }
      }
    });

    // These listeners should be on the Vapi instance directly,
    // not on `vapiInstance` from state which might be null initially.
    // Ensure 'speech-start' and 'speech-end' are correctly attached
    // to the `vapi` variable that is created and used to start the call.
    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRole("assistant");
    });
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("user"); // Assuming user speaks after assistant stops
    });
  };

  const endCall = () => {
    // Only set loading here, the rest of the logic moves to call-end event
    setLoading(true);
    if (vapiInstance) {
      vapiInstance.stop(); // This will trigger the 'call-end' event
      toast.success("Your report is generated!");
      router.replace("/dashboard");
    } else {
      setLoading(false); // If no instance, just stop loading
    }
  };

  const GenerateReport = async () => {
    console.log("Generating report..."); // Add a log to confirm
    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId,
      });
      console.log("Report generation successful:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error generating report:", error);
      // Handle error, maybe show a message to the user
      return null;
    }
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      {sessionId}
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {callStarted ? "Connected..." : "Not Conntected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt={sessionDetail?.selectedDoctor?.specialist}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg: messages, index) => (
              <p
                key={index}
                className={`text-sm p-2 ${
                  msg.role === "assistant" ? "text-blue-500" : "text-green-600"
                }`}
              >
                <strong>{msg.role}:</strong> {msg.text}
              </p>
            ))}

            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg ">
                {currentRole} {liveTranscript}
              </h2>
            )}
          </div>

          {!callStarted ? (
            <Button disabled={loading} className="mt-20" onClick={StartCall}>
              <PhoneCall /> {loading ? "Ringing..." : "Start Call"}
            </Button>
          ) : (
            <Button
              disabled={loading}
              variant={"destructive"}
              onClick={endCall}
            >
              <PhoneOff /> {loading ? "Disconnecting..." : "Disconnect"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
