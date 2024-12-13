interface ErrorResponse {
  status: number;
  message: string;
}

export function createErrorResponse(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    if (error.message.includes('Only CSV files')) {
      return {
        status: 400,
        message: 'Only CSV files are accepted.'
      };
    }

    if (error.message.includes('Failed to process CSV')) {
      return {
        status: 500,
        message: 'An error occurred while processing the CSV file.'
      };
    }
  }

  return {
    status: 500,
    message: 'An unexpected error occurred.'
  };
}
