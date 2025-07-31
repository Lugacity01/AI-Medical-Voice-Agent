'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
    const [loading, setLoading] = useState(false);
      const router = useRouter()
    const {has} = useAuth();

  // @ts-ignore
  const paidUser = has && has({plan: 'pro'})
  console.log("Paid user", paidUser)

    const onStartConsultation = async () => {
        setLoading(true)
    
        // Save All info to database
        const result = await axios.post('/api/session-chat', {
          notes: "New Query",
          selectedDoctor: doctorAgent
        });
        console.log(result.data)
        
        console.log("My Session ID:", result.data[0]?.SessionChatTable?.sessionId);
      const sessionIdCall = result.data[0]?.SessionChatTable?.sessionId
        if(sessionIdCall){
          console.log('THe Doctor Record', sessionIdCall)
          // Route new conversation screen
          router.push('/dashboard/medical-agent/' + sessionIdCall)
        }

        setLoading(false)

  }
  return (
    <div className="relative">
      {doctorAgent.subscriptionRequired &&
      <Badge className="absolute m-2 right-0">
        Premium
      </Badge>
      }
      <Image
        className="w-full h-[200px] object-cover rounded-xl  "
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        width={200}
        height={300}
      />
      <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2  text-sm text-gray-500">{doctorAgent.description}</p>
      <Button className="w-full p-3 mt-2"
      onClick={onStartConsultation} disabled={!paidUser&&doctorAgent.subscriptionRequired}>
        Start Consultation{loading ? <Loader2Icon className="animate-spin"/> : <IconArrowRight/> }
        </Button>
    </div>
  );
}

export default DoctorAgentCard;
