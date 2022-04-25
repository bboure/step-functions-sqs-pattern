import { SQSHandler } from 'aws-lambda';
import {
  SFNClient,
  SendTaskSuccessCommand,
  SendTaskFailureCommand,
} from '@aws-sdk/client-sfn';
import axios from 'axios';

const client = new SFNClient({});

export const handler: SQSHandler = async (event) => {
  const body = JSON.parse(event.Records[0].body);

  console.log(body);

  console.log(`Processing payment calling ${process.env.HTTP_ENDPOINT}`);
  console.log(`Charging $${body.order.total}`);
  const { data } = await axios.post(process.env.HTTP_ENDPOINT!, {
    amount: body.order.total,
  });
  console.log({ data });

  if (data.status === 'Success') {
    await client.send(
      new SendTaskSuccessCommand({
        taskToken: body.token,
        output: JSON.stringify({
          status: 'Success',
        }),
      }),
    );
  } else {
    await client.send(
      new SendTaskFailureCommand({
        taskToken: body.token,
        error: 'PaymentFailed',
        cause: 'The payment failed',
      }),
    );
  }
};
