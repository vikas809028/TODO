import { connect } from "../../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Todo from "../../../../../models/todoModel";
import { useParams } from "next/navigation";
connect();

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop();
    const todo = await Todo.findById(id);
    const response = NextResponse.json({
      message: "Todo Fetched",
      success: true,
      todo: todo,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
