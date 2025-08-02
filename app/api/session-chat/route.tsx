import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid'
import { desc, eq } from "drizzle-orm";


export async function POST(req:NextRequest) {
  const {notes, selectedDoctor} = await req.json();
  const user = await currentUser()
  try{
    const sessionId = uuidv4();
    const result = await db.insert(SessionChatTable).values({
      sessionId: sessionId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      notes: notes,
      selectedDoctor: selectedDoctor,
      createdOn: (new Date()).toString()
      
      //@ts-ignore
    }).returning({SessionChatTable})

    return NextResponse.json(result)
  } catch(e) {
    return NextResponse.json(e)
  }
}


export async function GET(req:NextRequest) {
  const {searchParams} = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const user = await currentUser()

  if(sessionId=='all'){
      const result = await db.select().from(SessionChatTable)
    
    // @ts-ignore
    .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(SessionChatTable.id));
  
    return NextResponse.json(result);

  } else {
    
    const result = await db.select().from(SessionChatTable)
    
    // @ts-ignore
    .where(eq(SessionChatTable.sessionId, sessionId));
  
    return NextResponse.json(result[0]);
  }

}


export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (!sessionId) {
    return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
  }

  try {
    // @ts-ignore
    const email = user?.primaryEmailAddress?.emailAddress;

    const deletedRows = await db
      .delete(SessionChatTable)
      .where(
        // Optional: Restrict deletion to only the sessions created by the current user
        eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json({
      success: true,
      message: `Session chat with sessionId '${sessionId}' deleted`,
      data: deletedRows,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete session", error },
      { status: 500 }
    );
  }
}