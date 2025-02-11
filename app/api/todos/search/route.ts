import { connect } from "../../../../dbConfig/dbConfig";
import Todo from "../../../../models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { page = 1, limit = 5, search = "" } = await req.json();
    const skip = (page - 1) * limit;

    // Create a query object for searching
    const query = search
      ? { title: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};

    // Find all matching todos
    const allTodos = await Todo.find(query);
    const totalTodos = allTodos.length;

    // Paginate the filtered todos
    const todos = allTodos.slice(skip, skip + limit);

    return NextResponse.json({
      message: "Todos Fetched",
      success: true,
      todos,
      totalTodos,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
