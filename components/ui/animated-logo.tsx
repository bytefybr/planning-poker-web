import React, { useState, useEffect } from "react";
import Image from "next/image";

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const AnimatedLogo = () => {
  const [fibonacciIndex, setFibonacciIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFibonacciIndex((prevIndex) => {
        if (prevIndex === 6) {
          return 1;
        } else {
          return prevIndex + 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-[216px] h-[212px] items-center justify-center">
      <p className="font-bold text-9xl">{fibonacci(fibonacciIndex)}</p>
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
