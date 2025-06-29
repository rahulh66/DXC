import { S3 } from "aws-sdk";

const s3 = new S3();
const BUCKET_NAME = "sample-rahul";
const INPUT_KEY = "sample.json";
const OUTPUT_KEY = "result.json";

export class InterviewHelper {
  static async processInterviewData(): Promise<void> {
    // Read from S3
    const input   = await s3.getObject({ Bucket: BUCKET_NAME, Key: INPUT_KEY }).promise();
    const rawData = JSON.parse(input.Body!.toString());

    //const conversation = [];
    const conversation: IConversation[] = [];

    // Navigate to Transcribe data
    const results = rawData?.Transcript?.Results || [];
    results.forEach((result: any) => {
      const items = result?.Alternatives?.[0]?.Items || [];
      items.forEach((item: any) => {
        if (item.ParticipantRole && item.Content) {
          conversation.push({
            Who: item.ParticipantRole,
            What: item.Content
          });
        }
      });
    });

    const resultJson = {
      Conversation: conversation
    };

    // Write to S3
    await s3.putObject({
      Bucket: BUCKET_NAME,
      Key: OUTPUT_KEY,
      Body: JSON.stringify(resultJson, null, 2),
      ContentType: "application/json"
    }).promise();
  }
}
