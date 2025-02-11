import { connect } from "../../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Todo from "../../../../../models/todoModel";
connect();

export async function PATCH(req: NextRequest) {

  try {
    const reqBody = await req.json()
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const todo = await Todo.findByIdAndUpdate(id,reqBody);
    const response = NextResponse.json({
      message: "Todo Edited",
      success: true,
      todo: todo,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
