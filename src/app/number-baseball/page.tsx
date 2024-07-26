import React from "react";
import style from "./page.module.scss";
import TeamBlock from "@/components/number-baseball/TeamBlock";

export default function NumberBaseballPage() {
  const COLORS = ["purple", "blue", "yellow", "pink"];

  return (
    <div className={style.wrapper}>
      {Array.from({ length: 4 }).map((_, idx) => (
        <TeamBlock key={idx} color={COLORS[idx]} />
      ))}
    </div>
  );
}
