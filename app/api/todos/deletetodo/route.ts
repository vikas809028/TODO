import {connect} from "../../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import Todo from "../../../../models/todoModel";


connect()


export async function POST(request: NextRequest){
    try {
        const todos = await Todo.find({}).limit(7);
        const response = NextResponse.json({
            message: "Todo Fetched",
            success: true,
            todos:todos
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}