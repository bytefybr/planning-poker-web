"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Adsense } from "@ctrl/react-adsense";

import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "");

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [roomType, setRoomType] = useState<"create" | "join" | null>(null);

  const [roomId, setRoomId] = useState<any>();
  const [username, setUsername] = useState("");

  const [roomData, setRoomData] = useState<any>();
  const [card, setCard] = useState("");

  const [showResetButton, setShowResetButton] = useState(false);

  const initSocketEvents = useCallback(() => {
    socket.on("roomCreated", (roomId) => {
      alert(1);
    });

    socket.on("ressetMyCard", (roomId) => {
      setCard("");
    });

    socket.on("roomJoined", (roomId) => {
      console.log("Você entrou na sala:", roomId);
      alert("Você entrou na sala: " + roomId);
      setRoomId(roomId);
    });

    socket.on("roomListUpdate", (data) => {
      console.log("Sala atualizada:", data);

      if (!roomId) {
        window.history.pushState(
          { roomId: data.roomId },
          "Sala",
          `?roomId=${data.roomId}`
        );
      }
      setRoomId(data.roomId);
      setRoomData(data);
    });
  }, [roomId]);

  const createRoom = () => {
    if (username) {
      socket.emit("createRoom", username);
    }
  };

  const joinRoom = () => {
    socket.emit("enterInRoom", roomId, username);
  };

  const selectCard = (card: any) => {
    socket.emit("selectCard", roomId, card);
    setCard(card);
  };

  const showAllCards = () => {
    const usersSelected = roomData.users.filter(
      (user: any) => user.alreadySelected
    );

    if (usersSelected.length !== roomData.users.length) {
      alert("Nem todos os jogadores selecionaram suas cartas");
      return;
    }

    setShowResetButton(true);
    socket.emit("showCards", roomId);
  };

  const resetCards = () => {
    socket.emit("ressetCards", roomId);
    setShowResetButton(false);
    setCard("");
  };

  const getTitle = (type: string, roomData?: any, roomId?: string) => {
    if (!!roomData) {
      return `Sala #${roomId}`;
    }

    if (roomType === "create") {
      return "Criar nova sala";
    }

    return "Acessar uma sala";
  };

  const getSubtitle = (type: string, roomData?: any, roomId?: string) => {
    if (!!roomData) {
      return `Link para compartilhar: ${window.location.href}`;
    }

    if (roomType === "create") {
      return "Sem limitações, insira seu nome, crie uma sala e convide seu time:";
    }

    return "Insira o ID para acessar uma sala existente:";
  };

  useEffect(() => {
    if (!roomId || roomData || !username) {
      return;
    }

    socket.emit("roomUpdate", roomId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, roomData]);

  useEffect(() => {
    if (searchParams.has("type")) {
      const type = searchParams.get("type");
      if (type === "create" || type === "join") {
        setRoomType(type);
      }
      return;
    }

    if (roomData) return;

    router.push("/");
  }, [searchParams, router, roomData]);

  useEffect(() => {
    initSocketEvents();
  }, [initSocketEvents]);

  useEffect(() => {
    if (window) {
      setRoomId(
        new URLSearchParams(window.location.search).get("roomId") ?? null
      );
    }
  }, []);

  return (
    <>
      {roomType && (
        <main className="flex flex-1 flex-col w-full justify-center items-center">
          <h1 className="font-bold text-5xl text-center">
            {getTitle(roomType, roomData, roomId)}
          </h1>

          <p className="text-zinc-500 text-base mb-4 text-center">
            {getSubtitle(roomType, roomData, roomId)}
          </p>

          {!roomData && (
            <div
              className={`flex ${
                roomType === "create" ? "flex-col" : "flex-col-reverse"
              } justify-center items-center`}
            >
              {!roomId && (
                <div className="flex flex-col">
                  {roomType === "join" && (
                    <p className="text-zinc-500 text-base mb-2 text-center">
                      Criar uma nova sala:
                    </p>
                  )}
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Insira seu nome"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button onClick={createRoom}>Criar</Button>
                  </div>
                </div>
              )}

              <div className="flex w-full max-w-52 gap-2 items-center my-8">
                <div className="flex-1 h-[1px] bg-slate-300" />
                <p className="text-zinc-500 text-sm">ou</p>
                <div className="flex-1 h-[1px] bg-slate-300" />
              </div>

              <div>
                {roomType === "create" && (
                  <p className="text-zinc-500 text-base mb-2 text-center">
                    Entrar em uma sala existente:
                  </p>
                )}

                <Input
                  type="text"
                  placeholder="ID da sala"
                  value={roomId || ""}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="ml-2"
                />

                {roomId && (
                  <Input
                    type="text"
                    placeholder="Insira o seu nome"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mr-2 ml-2"
                  />
                )}

                {roomId && username && (
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={joinRoom}
                  >
                    Entrar
                  </Button>
                )}
              </div>
            </div>
          )}

          {roomData && (
            <>
              <div className="flex flex-col items-center justify-center w-80 h-40 bg-zinc-200 rounded-3xl gap-4">
                <Button onClick={showAllCards}>Revelar cartas</Button>
              </div>

              <div className="flex flex-col items-center justify-center mt-4 mb-4 gap-2">
                <p className="text-zinc-500 text-base text-center">
                  Jogadores na sala:
                </p>
                <div className="grid grid-cols-4">
                  {roomData.users.map((user: any) => (
                    <div key={user.socketId}>
                      <div className="flex justify-center items-center w-[50px] h-[65px] rounded-sm border-zinc-950 border-2"></div>
                      <p className="text-zinc-500 text-base font-bold text-center">
                        {user.username}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-3">
                <p className="text-zinc-500 text-base text-center">
                  Pontuação da tarefa:
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => selectCard("1")}>1</Button>
                  <Button onClick={() => selectCard("2")}>2</Button>
                  <Button onClick={() => selectCard("3")}>3</Button>
                  <Button onClick={() => selectCard("5")}>5</Button>
                  <Button onClick={() => selectCard("8")}>8</Button>
                  <Button onClick={() => selectCard("13")}>13</Button>
                  <Button onClick={() => selectCard("21")}>21</Button>
                  <Button onClick={() => selectCard("?")}>?</Button>
                </div>
              </div>

              {showResetButton && (
                <Button variant="outline" onClick={resetCards}>
                  Reiniciar pontuação
                </Button>
              )}
              <br />
              <br />
              <p>Carta Selecionada: {card}</p>

              <p>Quem já selecionou:</p>

              <ul>
                {roomData.users
                  .filter((user: any) => user.alreadySelected)
                  .map((user: any) => (
                    <li key={user.socketId}>{user.username}</li>
                  ))}
              </ul>

              {roomData.users[0].numberSelected && (
                <>
                  <p>Média: {roomData.average}</p>
                  <p>Estimativas Recebidas:</p>
                  <ul>
                    {roomData.users.map((user: any) => (
                      <li key={user.socketId}>
                        {user.username}: {user.numberSelected}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}

          {!roomData && (
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => router.push("/")}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          )}

          <Adsense client="ca-pub-8772352972494567" slot="5902105855" />
        </main>
      )}
    </>
  );
}
