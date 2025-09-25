import { NextResponse } from "next/server";
import { withErrorHandler } from "../with-error-handler";
import { BadRequestError } from "@/app/errors/bad-request-error";

const data = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Banana" },
  { id: "3", name: "Orange" },
  { id: "4", name: "Pineapple" },
  { id: "5", name: "Strawberry" },
  { id: "6", name: "Blueberry" },
  { id: "7", name: "Raspberry" },
  { id: "8", name: "Grape" },
  { id: "9", name: "Watermelon" },
  { id: "10", name: "Mango" },
];

const getHandler = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (query === null) {
    throw new BadRequestError("Query parameter is required");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const filteredData =
    query === ""
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

  return NextResponse.json(filteredData);
};

export const GET = withErrorHandler(getHandler);
