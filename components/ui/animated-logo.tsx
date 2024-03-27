import React, { useState, useEffect } from "react";
import Image from "next/image";

const AnimatedLogo = () => {
  const [fibonacciIndex, setFibonacciIndex] = useState<number>(0);
  const fibonacciNumbers = [0, 1, 2, 3, 5, 8];

  useEffect(() => {
    const interval = setInterval(() => {
      setFibonacciIndex((prevIndex: number) => {
        if (prevIndex >= 5) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-[216px] h-[212px] items-center justify-center">
      <p className="font-bold text-9xl">{fibonacciNumbers[fibonacciIndex]}</p>
      <div className="absolute flex w-[216px] h-[212px] ml-[78px] mt-[14px]">
        <Image
          src="/logo-empty.png"
          alt="Poker Plan"
          className="dark:invert"
          width={216}
          height={212}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
