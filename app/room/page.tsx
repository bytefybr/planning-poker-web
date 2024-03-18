"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Adsense } from "@ctrl/react-adsense";
import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "");

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");

  const [roomType, setRoomType] = useState<"create" | "join" | null>(null);

  const [roomId, setRoomId] = useState<any>();
  const [username, setUsername] = useState("");

  const [roomData, setRoomData] = useState<any>();
  const [card, setCard] = useState("");

  const [showResetButton, setShowResetButton] = useState(false);

  const initSocketEvents = useCallback(() => {
    socket.on("roomCreated", (roomId) => {
      toast({
        title: "Sala criada!",
        description: "Compartilhe o link com seu time.",
      });
    });

    socket.on("ressetMyCard", (roomId) => {
      setCard("");
    });

    socket.on("roomJoined", (roomId) => {
      toast({
        title: "Acesso concedido!",
        description: `Você entrou na sala #${roomId}.`,
      });

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
      setShowResetButton(!!data.average);
    });
  }, [roomId, toast]);

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
      setAlertDialogMessage("Nem todos os jogadores selecionaram suas cartas");
      setAlertDialogOpen(true);

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

  const getTitle = (type?: string | null, roomData?: any, roomId?: string) => {
    if (!!roomData) {
      return `Sala #${roomId}`;
    }

    if (roomType === "create") {
      return "Criar nova sala";
    }

    return "Acessar uma sala";
  };

  const getSubtitle = (
    type?: string | null,
    roomData?: any,
    roomId?: string
  ) => {
    if (!!roomData) {
      return `Link para compartilhar: ${window.location.href}`;
    }

    if (roomType === "create") {
      return "Sem limitações, insira seu nome, crie uma sala e convide seu time:";
    }

    return "Insira o ID para acessar uma sala existente:";
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getUsersThatSelected = () => {
    return (
      roomData.users.filter((user: any) => user.alreadySelected).length || 0
    );
  };

  const getUsersThatSelectedMessage = (selected: number) => {
    let message = "Nenhum jogador selecionou ainda.";

    if (selected === 1) {
      message = "1 jogador selecionou.";
    } else if (selected > 1) {
      message = `${selected} jogadores selecionaram.`;
    }

    return message;
  };

  useEffect(() => {
    if (!roomId || roomData || !username) {
      return;
    }

    socket.emit("roomUpdate", roomId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, roomData]);

  useEffect(() => {
    if (searchParams.has("roomId")) {
      setRoomId(
        new URLSearchParams(window.location.search).get("roomId") ?? null
      );
      return;
    }

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

  return (
    <>
      {(roomType || roomId) && (
        <main className="flex flex-1 flex-col w-full justify-center items-center">
          <h1
            className="font-bold text-5xl text-center cursor-pointer"
            onClick={() => {
              copyToClipboard(window.location.href);

              toast({
                title: "Link copiado!",
                description:
                  "O link da sala foi copiado para a área de transferência.",
              });
            }}
          >
            {getTitle(roomType, roomData, roomId)}
          </h1>

          <p
            className="text-zinc-500 text-sm mb-4 text-center cursor-pointer"
            onClick={() => {
              copyToClipboard(window.location.href);

              toast({
                title: "Link copiado!",
                description: "O link foi copiado para a área de transferência.",
              });
            }}
          >
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
                    <p className="text-zinc-500 text-sm mb-2 text-center">
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

              {!roomId && (
                <div className="flex w-full max-w-52 gap-2 items-center my-8">
                  <div className="flex-1 h-[1px] bg-slate-300" />
                  <p className="text-zinc-500 text-sm">ou</p>
                  <div className="flex-1 h-[1px] bg-slate-300" />
                </div>
              )}

              <div className="flex flex-col gap-3">
                {roomType === "create" && (
                  <p className="text-zinc-500 text-sm text-center">
                    Entrar em uma sala existente:
                  </p>
                )}

                <Input
                  type="text"
                  placeholder="ID da sala"
                  value={roomId || ""}
                  onChange={(e) => setRoomId(e.target.value)}
                />

                {roomId && (
                  <Input
                    type="text"
                    placeholder="Insira o seu nome"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}

                {roomId && username && (
                  <Button onClick={joinRoom}>Entrar</Button>
                )}
              </div>
            </div>
          )}

          {roomData && (
            <>
              <div className="flex flex-col items-center justify-center w-80 h-40 bg-zinc-200 rounded-3xl gap-4 mb-4">
                {showResetButton && (
                  <Button variant="outline" onClick={resetCards}>
                    Próxima rodada
                  </Button>
                )}

                {!showResetButton && getUsersThatSelected() > 0 && (
                  <Button onClick={showAllCards}>Revelar cartas</Button>
                )}

                {!showResetButton && (
                  <p className="text-zinc-500 text-sm">
                    {getUsersThatSelectedMessage(getUsersThatSelected())}
                  </p>
                )}

                {showResetButton && roomData.users[0].numberSelected && (
                  <p className="text-zinc-500 text-sm font-bold">{`Média: ${roomData.average}`}</p>
                )}
              </div>

              <div className="flex flex-col items-center justify-center mb-4 gap-3">
                <p className="text-zinc-500 text-sm text-center">
                  Jogadores na sala:
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {roomData.users.map((user: any) => {
                    return (
                      <div
                        key={user.socketId}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="flex justify-center items-center w-[50px] h-[65px] rounded-sm border-zinc-950 border-2 dark:border-zinc-500">
                          {user.alreadySelected ? (
                            <p className="text-zinc-500 text-2xl font-bold">
                              {user.numberSelected || <Check />}
                            </p>
                          ) : (
                            <p className="text-zinc-500 text-2xl font-bold">
                              ?
                            </p>
                          )}
                        </div>
                        <p className="text-zinc-500 text-base font-bold text-center">
                          {user.username}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-3">
                <p className="text-zinc-500 text-sm text-center">
                  Selecione a pontuação da tarefa:
                </p>
                <div className="flex gap-2 flex-wrap justify-center max-w-60">
                  <Button
                    variant={card === "1" ? "default" : "outline"}
                    onClick={() => selectCard("1")}
                  >
                    1
                  </Button>
                  <Button
                    variant={card === "3" ? "default" : "outline"}
                    onClick={() => selectCard("3")}
                  >
                    3
                  </Button>
                  <Button
                    variant={card === "5" ? "default" : "outline"}
                    onClick={() => selectCard("5")}
                  >
                    5
                  </Button>
                  <Button
                    variant={card === "8" ? "default" : "outline"}
                    onClick={() => selectCard("8")}
                  >
                    8
                  </Button>
                  <Button
                    variant={card === "13" ? "default" : "outline"}
                    onClick={() => selectCard("13")}
                  >
                    13
                  </Button>
                  <Button
                    variant={card === "21" ? "default" : "outline"}
                    onClick={() => selectCard("21")}
                  >
                    21
                  </Button>
                  <Button
                    variant={card === "?" ? "default" : "outline"}
                    onClick={() => selectCard("?")}
                  >
                    ?
                  </Button>
                </div>
              </div>
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

          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Atenção</AlertDialogTitle>
                <AlertDialogDescription>
                  {alertDialogMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Ok</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Adsense client="ca-pub-8772352972494567" slot="5902105855" />
        </main>
      )}
    </>
  );
}
