import {connect} from "../../../../dbConfig/dbConfig";
import Todo from "../../../../models/todoModel"
import { NextRequest, NextResponse } from "next/server";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {title,description,date} = reqBody

        console.log(reqBody);

        const newTodo = new Todo({
            title,
            description,
            date
        })

        const savedTodo = await newTodo.save()

        return NextResponse.json({
            message: "Todo added successfully",
            success: true,
            savedTodo
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}