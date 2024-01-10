import axios from "axios";
import { Logger } from "./logger";

export function handleError(error: unknown) {
  const logger = new Logger("handleError");

  if (axios.isAxiosError(error) && error.response) {
    let message = String(error.response.data);

    const isErrorMessageFromDataAvailable = error.response.data?.message;

    if (isErrorMessageFromDataAvailable) {
      message = error.response.data.message;
    }

    if (
      !isErrorMessageFromDataAvailable &&
      typeof error.response.data === "object"
    ) {
      message = JSON.stringify(error.response.data);
    }

    logger.error(message);
    process.exit(1);
  }

  if (typeof error === "string") {
    logger.error(error);
    process.exit(1);
  }

  if (error instanceof Error) {
    logger.error(error.message);
    process.exit(1);
  }

  logger.error("Something went wrong. Please try again.");
  process.exit(1);
}
