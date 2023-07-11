import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPromt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPromt.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Prompt added successfully",
        data: newPromt,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
};
