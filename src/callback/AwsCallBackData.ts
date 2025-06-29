import { InterviewHelper } from "../helper/InterviewHelper"; // Import helper

exports.handler = async (event: any) => {
  const actionType = event?.actionType;
  try {
    if (actionType === "InterviewAction") {
      await InterviewHelper.processInterviewData(); //Call helper function
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Interview data processed successfully." })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Unknown action type" })
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." })
    };
  }
};
