import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

const SIMULATE_RANDOM_HTTP_ERRORS = false;
const SIMULATE_RANDOM_PAYMENT_ERRORS = false;

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('Simulating Payment process');

  // 0.5% of the requests will fail with HTTP 500 error
  const statusCode =
    SIMULATE_RANDOM_HTTP_ERRORS && Math.random() > 0.995 ? 500 : 200;
  // 99% of the requests will succeed payment.
  const status =
    SIMULATE_RANDOM_PAYMENT_ERRORS && Math.random() > 0.99
      ? 'Failed'
      : 'Success';

  return {
    statusCode,
    body: JSON.stringify({
      status,
      transactionId: uuid(),
    }),
  };
};
