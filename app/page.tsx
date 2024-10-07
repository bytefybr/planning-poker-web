"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import AnimatedLogo from "@/components/ui/animated-logo";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const disablePinchZoom = (event: any) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", disablePinchZoom, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", disablePinchZoom);
    };
  }, []);

  return (
    <div>
      <div className="flex-1">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <AnimatedLogo />
          <h1 className="font-bold text-5xl mt-4">Planning Poker Online</h1>
          <p className="text-zinc-500 text-base">
            Sem limitações, crie ou acesse uma sala e convide seu time.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/room?type=create")}>
              Criar sala
            </Button>
            <Button
              onClick={() => router.push("/room?type=join")}
              variant="secondary"
            >
              Acessar sala
            </Button>
          </div>
        </div>
        <div className="mt-10 py-10 rounded-md flex w-full text-center justify-center border border-zinc-200 flex-col px-4 max-w-[520px]">
          <p>
            A cerimônia de Planning Poker é uma técnica ágil utilizada para
            estimar o esforço necessário para completar tarefas, onde os membros
            da equipe usam cartas para votar em estimativas de forma
            colaborativa e anônima.
          </p>
        </div>
      </div>
    </div>
  );
}
