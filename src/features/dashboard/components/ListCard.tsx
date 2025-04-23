import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
  list: Array<any>;
  operation: string;
  nameKey: string;
  dateKey: string;
  operationKey: string;
  viewRoute: string;
};

function ListCard({ list = [], operation = "", nameKey = "", dateKey = "", operationKey = "", viewRoute = "" }: Props) {
  return (
    <div className="space-y-8">
      {list?.map((data, i) => (
        <Link
          to={`${viewRoute}/${data?.id}`}
          className="flex items-center border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
          key={i}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{i + 1}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{data?.[nameKey] ? data?.[nameKey] : "N/A"}</p>
            <p className="text-sm text-muted-foreground">
              <span>
                <span className="me-1">{operation}</span>{" "}
                {data?.[operationKey]?.length > 0 ? data?.[operationKey] : "-"}{" "}
              </span>
            </p>
          </div>
          {data?.[dateKey] ? (
            <div className="ml-auto font-medium">
              {data?.[dateKey] ? (
                <div>
                  <div>{format(data?.[dateKey], "dd-MM-yyyy")} </div>
                  <div>{format(data?.[dateKey], "hh:mm aaaa")} </div>
                </div>
              ) : (
                "N/A"
              )}
            </div>
          ) : (
            "-"
          )}
        </Link>
      ))}
    </div>
  );
}

export default ListCard;
