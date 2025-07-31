import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctorAgent: doctorAgent,
  setSelectedDoctor: any
  selectedDoctor: doctorAgent
};

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, selectedDoctor }: props) {
  return (
    <div className={`flex flex-col items-center border shadow p-5 rounded-2xl hover:border-blue-500 cursor-pointer 
    ${selectedDoctor?.id === doctorAgent.id && 'border-blue-500'}` } onClick={()=> setSelectedDoctor(doctorAgent)}>
      <Image
        className="w-[50px] h-[50px] rounded-4xl object-cover"
        src={doctorAgent?.image}
        alt={doctorAgent.specialist}
        width={70}
        height={70}
      />
      <h2 className="font-bold text-center text-sm">{doctorAgent.specialist}</h2>
      <p className="text-xs text-center line-clamp-2">
        {doctorAgent.description}
      </p>
    </div>
  );
}

export default SuggestedDoctorCard;
