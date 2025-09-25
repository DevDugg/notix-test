import { NextResponse } from "next/server";
import { CustomError } from "../errors/custom-error";

type RouteHandler = (req: Request, context: any) => Promise<NextResponse>;

export const withErrorHandler =
  (handler: RouteHandler): RouteHandler =>
  async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      if (error instanceof CustomError) {
        console.error(
          JSON.stringify(
            {
              error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
                errors: error.serializeErrors(),
                statusCode: error.statusCode,
              },
            },
            null,
            2
          )
        );

        return NextResponse.json(
          { errors: error.serializeErrors() },
          { status: error.statusCode }
        );
      }

      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      console.error(
        JSON.stringify(
          {
            error: {
              name: (error as Error).name,
              message: errorMessage,
              stack: (error as Error).stack,
              cause: (error as Error).cause,
            },
            statusCode: 500,
          },
          null,
          2
        )
      );

      return NextResponse.json(
        { errors: [{ message: "An unexpected error occurred" }] },
        { status: 500 }
      );
    }
  };
