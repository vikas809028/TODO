import { connect } from "../../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Todo from "../../../../../models/todoModel";
connect();

export async function DELETE(req: NextRequest) {

  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    console.log("before delete")
    const todo = await Todo.findByIdAndDelete(id);
    console.log("after delete")
    const response = NextResponse.json({
      message: "Todo Deleted",
      success: true,
      todo: todo,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
