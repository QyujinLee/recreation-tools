"use client";

import React, { useRef, useState } from "react";
import style from "./TeamBlock.module.scss";

type TypeProps = {
  color: string;
};

type TypeHistory = {
  value: number;
  strike: number;
  ball: number;
  isOut: boolean;
};

export default function TeamBlock({ color }: TypeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [target, setTarget] = useState<number>();
  const [histories, setHistories] = useState<TypeHistory[]>([]);

  const generateUnique4DigitNumber = (): number => {
    const digits = Array.from({ length: 10 }, (_, i) => i);
    let result = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      result += digits[randomIndex];
      digits.splice(randomIndex, 1); // Remove the used digit to avoid duplicates
    }

    return parseInt(result, 10);
  };

  /**
   * ball 갯수 조회
   * @param num1
   * @param num2
   * @returns
   */
  const getBallCnt = (num1: number, num2: number): number => {
    const num1Str = num1.toString().padStart(4, "0");
    const num2Str = num2.toString().padStart(4, "0");
    const set1 = new Set(num1Str);
    const set2 = new Set(num2Str);

    let overlapCount = 0;
    set1.forEach((digit) => {
      if (set2.has(digit)) {
        overlapCount++;
      }
    });

    return overlapCount;
  };

  /**
   * strike 갯수 조회
   * @param num1
   * @param num2
   * @returns
   */
  const getStrikeCnt = (num1: number, num2: number) => {
    let result = 0;
    const num1Str = num1.toString().padStart(4, "0");
    const num2Str = num2.toString().padStart(4, "0");

    for (let i = 0; i < num1Str.length; i++) {
      if (num1Str[i] === num2Str[i]) {
        result++;
      }
    }

    return result;
  };

  /**
   * 초기화 및 랜덤 생성 버튼 클릭
   */
  const btnClickInit = () => {
    setTarget(generateUnique4DigitNumber());
    setHistories([]);
  };

  /**
   * 검증 버튼 클릭
   * @returns
   */
  const btnClickValid = () => {
    if (!inputRef.current) return;

    if (!target) {
      alert("초기화를 진행하세요");
      return;
    }

    if (inputRef.current.value.trim() === "") {
      alert("숫자를 입력하세요");
      return;
    }

    const value = inputRef.current.value as unknown as number;

    let ball = getBallCnt(target, value);

    if (ball === 0) {
      setHistories((prev) => [
        ...prev,
        { value, strike: 0, ball: 0, isOut: true },
      ]);
    } else {
      const strike = getStrikeCnt(target, value);
      ball = ball - strike;

      setHistories((prev) => [...prev, { value, strike, ball, isOut: false }]);
    }

    inputRef.current.value = "";
  };

  return (
    <div className={`${style.wrapper} ${style[color]}`}>
      <div className={style.info}>
        <input type="text" ref={inputRef} />
        <div className={style.btn__wrapper}>
          <button className={style.btn} onClick={btnClickValid}>
            검증
          </button>
          <button className={style.btn} onClick={btnClickInit}>
            초기화 및 랜덤 생성
          </button>
        </div>
      </div>

      <div className={style.history}>
        {histories.map((history, idx) => (
          <div className={style.row} key={`${color}_${idx}`}>
            <p className={style.value}>{history.value}</p>
            <div className={style.result}>
              {history.isOut ? (
                <p className={style.out}>OUT💥</p>
              ) : (
                <div className={style.cnt}>
                  <p className={`${style.cnt_item} ${style.strike}`}>
                    {history.strike}S
                  </p>
                  <p className={`${style.cnt_item} ${style.ball}`}>
                    {history.ball}B
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
