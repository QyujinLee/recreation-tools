import Image from "next/image";
import style from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={style.items_wrapper}>
      <Link href="/timer">
        <button className={style.btn__item}>타이머</button>
      </Link>
      <Link href="/number-baseball">
        <button className={style.btn__item}>숫자 야구</button>
      </Link>
    </div>
  );
}
