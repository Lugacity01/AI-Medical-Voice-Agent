"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type props = {
  record: SessionDetail;
};
function ViewReportDialog({ record }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size={"sm"}>
          {" "}
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-blue-600 font-semibold text-lg">
              🩺 Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10 border rounded-lg shadow p-5 space-y-5 bg-white w-full text-sm">
              {/* Session Info */}
              <div>
                <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                  Session Info
                </h3>
                <div className="grid grid-cols-2 mt-2">
                  <p>
                    <span className="font-semibold">Doctor:</span>{" "}
                    {record.selectedDoctor?.specialist || ""}
                  </p>
                  <p>
                    <span className="font-semibold">User:</span>{" "}
                    {/* @ts-ignore */}
                    {record?.report?.user || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Consulted On:</span>{" "}
                    {moment(record?.createdOn).format("MMMM Do YYYY, h:mm A")}
                  </p>
                  <p>
                    <span className="font-semibold">Agent:</span>{" "}
                    {/* @ts-ignore */}
                    {record?.report?.agent || "N/A"}
                  </p>
                </div>
              </div>

              {/* Chief Complaint */}
              <div>
                <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                  Chief Complaint
                </h3>
                <p className="mt-1">
                  {/* @ts-ignore */}
                  {record?.report?.chiefComplaint || "N/A"}
                </p>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                  Summary
                </h3>
                {/* @ts-ignore */}
                <p className="mt-1">{record?.report?.summary || "N/A"}</p>
              </div>

              {/* Symptoms */}
              <div>
                <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                  Symptoms
                </h3>
                <ul className="list-disc list-inside mt-1">
                  {/* @ts-ignore */}
                  {record?.report?.symptoms?.map(
                    (symptom: string, index: number) => (
                      <li key={index}>{symptom}</li>
                    )
                  )}
                </ul>
              </div>

              {/* Duration & Severity */}

              <div>
                <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                  Duration & Severity
                </h3>
                <div className="grid grid-cols-2 mt-1">
                  <p>
                    <span className="font-semibold">Duration:</span>{" "}
                    {/* @ts-ignore */}
                    {record?.report?.duration || "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold">Severity:</span>{" "}
                    {/* @ts-ignore */}
                    {record?.report?.severity || "Not specified"}
                  </p>
                </div>
              </div>

              {/* Medications Mentioned */}
              {/* @ts-ignore */}
              {record?.report?.medicationsMentioned?.length > 0 && (
                <div>
                  <h3 className="text-blue-500 text-lg font-semibold border-b pb-1">
                    Medications Mentioned
                  </h3>
                  <ul className="list-disc list-inside mt-1">
                    {/* @ts-ignore */}

                    {record.report.medicationsMentioned.map(
                      (med: string, index: number) => (
                        <li key={index}>{med}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {/* @ts-ignore */}
              {record?.report?.recommendations?.length > 0 && (
                <div>
                  <h3 className="text-lg text-blue-500 font-semibold border-b pb-1">
                    Recommendations
                  </h3>
                  <ul className="list-disc list-inside mt-1">
                    {/* @ts-ignore */}
                    {record.report.recommendations.map(
                      (rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
