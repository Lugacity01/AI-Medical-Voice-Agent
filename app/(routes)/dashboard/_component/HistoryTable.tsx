import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";
import { FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const handleDelete = async (sessionId: string) => {
    setDeletingId(sessionId);
    try {
      const res = await fetch(`/api/session-chat?sessionId=${sessionId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setDeletedIds((prev) => [...prev, sessionId]);
        toast.success('Deleted Successful')
      } else {
        console.error("Delete failed", data.message);
        toast.error('Delete Not Successful')

      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-left">Action</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList
            .filter((record) => !deletedIds.includes(record.sessionId))
            .map((record: SessionDetail, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {record.selectedDoctor.specialist}
                </TableCell>
                <TableCell>{record.notes}</TableCell>
                <TableCell>{moment(record.createdOn).fromNow()}</TableCell>
                <TableCell className="text-left">
                  <ViewReportDialog record={record} />
                </TableCell>

                    {/* <TableCell>{moment(format(record.createdOn)).fromNow() }</TableCell> */}
                    {/* https://momentjs.com/docs/?/displaying/format/#/use-it/ */}
                    {/* <TableCell>{moment(record.createdOn).format("MMMM Do YYYY, h:mm A")}</TableCell> */}
                 <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={deletingId === record.sessionId}
                    onClick={() => handleDelete(record.sessionId)}
                  >
                    {deletingId === record.sessionId ? (
                      <ImSpinner2 className="animate-spin text-red-900 w-4 h-4" />
                    ) : (
                      <FaTrash className="text-red-900 w-4 h-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
