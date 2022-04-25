import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  console.log('Simulating Fulfilling Order');
  console.log(event);

  return {
    fulfilled: true,
  };
};
