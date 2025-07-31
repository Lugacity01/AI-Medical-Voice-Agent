import React from "react";
import HistoryList from "./_component/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorsAgentList from "./_component/DoctorsAgentList";
import AddNewSessionDialog from "./_component/AddNewSessionDialog";

function Dashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        {/* <Button>+ Consult with Doctor</Button> */}
        <AddNewSessionDialog/>
      </div>
      <HistoryList />
      
      <DoctorsAgentList/>
    </div>
  );
}

export default Dashboard;
