"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";

function HistoryList() {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ✅ loading state
 const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    GetHistoryList();
  }, []);

   const GetHistoryList = async () => {
    setLoading(true);
    setError(null); 
    try {
      const result = await axios.get("/api/session-chat?sessionId=all");
      console.log("This is the history result", result.data);
      setHistoryList(result.data);
    } catch (err: any) {
      console.error("Failed to fetch history:", err);
      if (err.response) {
        setError("Something went wrong while fetching your consultation history.");
      } else {
        setError("Network error: Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      {loading ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          Loading history...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600 font-medium">
          {error}
          <div className="mt-4">
            <Button onClick={GetHistoryList}>Retry</Button>
          </div>
        </div>
      ) : historyList.length === 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border-2 border-dashed rounded-2xl">
          <Image
            src={"/medical-assistance.png"}
            alt="empty"
            width={150}
            height={150}
          />
          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet.</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div>
          <HistoryTable historyList={historyList} />
        </div>
      )}
    </div>
  );
}

export default HistoryList;
