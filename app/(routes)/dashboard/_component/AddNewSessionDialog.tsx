"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
// import { useRouter } from "next/router";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>()
  const router = useRouter()
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

    const {has} = useAuth();
  
    // @ts-ignore
    const paidUser = has && has({plan: 'pro'})
    // console.log("Paid user", paidUser)


      useEffect(() => {
        GetHistoryList();
      }, []);

       const GetHistoryList = async () =>{
            const result = await axios.get("/api/session-chat?sessionId=all");
          console.log("This is the history result", result.data);
          setHistoryList(result.data);
       }

  console.log("check for the suggestion", suggestedDoctors);
  // console.log("typeof suggestedDoctors:", typeof suggestedDoctors);
  // console.log("suggestedDoctors isArray:", Array.isArray(suggestedDoctors));
  // console.log("suggestedDoctors:", suggestedDoctors);

  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", {
      notes: note,
    });

    console.log("Isloading", setLoading(true));
    console.log("The doctor result", result.data);
    setSuggestedDoctors(result.data || "");
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true)
    // console.log("🔥 Button clicked - function started");
    // Save All info to database
    const result = await axios.post('/api/session-chat', {
      notes: note,
      selectedDoctor: selectedDoctor
    });
    console.log(result.data)

    // console.log("This is the sessionId",result.data.sessionId)
    //  console.log("Full API response:", result); // Inspect the complete response
    // console.log("Response data structure:", Object.keys(result.data));
    // console.log("My Session ID-2:", result.data.data?.[0]?.SessionChatTable?.sessionId);
    
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3" disabled={!paidUser && historyList?.length>=1}>+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2>Add Symptoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add Detail here..."
                  className="h-[200px] mt-1"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
              <h2>Select the doctor</h2>  
              <div className="grid grid-cols-3 gap-5 ">
                {/* Suggested Doctors */}
                {suggestedDoctors?.map((doctor, index) => (
                  <SuggestedDoctorCard doctorAgent={doctor} key={index}
                   setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                   //@ts-ignore
                    selectedDoctor={selectedDoctor}/>
                ))}
              </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button disabled={!note || loading} onClick={() => OnClickNext()}>
              Next{" "}
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button  disabled={loading || !selectedDoctor}  onClick={()=> onStartConsultation()}>Start Consultations
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
