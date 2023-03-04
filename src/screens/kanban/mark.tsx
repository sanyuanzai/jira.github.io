import React from "react";
import { useTaskSearchParams } from "./util";

export default function Mark({ name }: { name: string }) {
  const { name: keyword } = useTaskSearchParams();
  if (!keyword) return <>{name}</>;
  const array = name.split(keyword);
  console.log(array, "1", name, 2, keyword, 3);
  return (
    <>
      {array.map((str, index) => (
        <span key={index}>
          {str}
          {index === array.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
}
