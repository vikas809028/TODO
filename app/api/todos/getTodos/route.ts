import { connect } from "../../../../dbConfig/dbConfig";
import Todo from "../../../../models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { page = 1, limit = 5 } = await req.json();
    const skip = (page - 1) * limit;

    const todos = await Todo.find({}).skip(skip).limit(limit);
    const totalTodos = await Todo.countDocuments();

    return NextResponse.json({
      message: "Todos Fetched",
      success: true,
      todos: todos,
      totalTodos: totalTodos,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
