"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Check, ChevronLeft, Clock, Copy, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

import {
  DEFAULT_HOURS_RANGE,
  DEFAULT_VOTING_TYPE,
  VOTING_TYPES,
  VotingType,
  buildHoursDeck,
  formatAverage,
  formatCardLabel,
  getDeck,
  getVotingTypeLabel,
  normalizeHoursRange,
  normalizeVotingType,
  validateHoursRange,
} from "@/lib/voting";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [roomType, setRoomType] = useState<"create" | "join" | null>(null);
  const [roomId, setRoomId] = useState<any>();
  const [username, setUsername] = useState("");
  const [votingType, setVotingType] =
    useState<VotingType>(DEFAULT_VOTING_TYPE);
  const [hoursMin, setHoursMin] = useState(
    String(DEFAULT_HOURS_RANGE.min).replace(".", ",")
  );
  const [hoursMax, setHoursMax] = useState(
    String(DEFAULT_HOURS_RANGE.max).replace(".", ",")
  );
  const [roomData, setRoomData] = useState<any>();
  const [card, setCard] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const [resetButtonDisabled, setResetButtonDisabled] = useState(false);
  const [resetButtonTimer, setResetButtonTimer] = useState(0);
  const [disconnect, setDisconnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "");

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

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

  if (socket) {
    socket.on("roomNotFound", () => {
      setAlertDialogOpen(true);
      setAlertDialogMessage("Sala não encontrada, verifique o ID informado.");
      setLoading(false);
    });

    socket.on("roomCreated", (roomId: any) => {
      window.localStorage?.setItem("pp@oldSocketId", socket.id ?? "");

      toast({
        title: "Sala criada!",
        description: "Compartilhe o link com seu time.",
      });

      setLoading(false);
    });

    socket.on("ressetMyCard", (roomId: any) => {
      setCard("");
      setLoading(false);
    });

    socket.on("roomJoined", (roomId: any) => {
      window.localStorage?.setItem("pp@oldSocketId", socket.id ?? "");

      toast({
        title: "Acesso concedido!",
        description: `Você entrou na sala #${roomId}.`,
      });

      setRoomId(roomId);
      setLoading(false);
    });

    socket.on("roomListUpdate", (data: any) => {
      if (!roomId) {
        window.history.pushState(
          { roomId: data.roomId },
          "Sala",
          `?roomId=${data.roomId}`
        );
      }

      setRoomId(data.roomId);
      setRoomData(data);
      setShowResetButton(data.average !== null && data.average !== undefined);
      setLoading(false);
    });

    socket.on("connect", () => {
      if (typeof window !== "undefined") {
        const oldSocketId = window.localStorage?.getItem("pp@oldSocketId");
        const frontendCode = localStorage.getItem("pp@frontendCode");
        if (!frontendCode) {
          localStorage.setItem(
            "pp@frontendCode",
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
          );
        }

        window.localStorage?.setItem("pp@oldSocketId", socket.id ?? "");

        if (oldSocketId && oldSocketId !== "" && oldSocketId !== socket.id) {
          socket.emit("reenterInRoom", oldSocketId);
        }
      }
    });

    socket.on("disconnect", () => {
      setDisconnect(true);

      toast({
        title: "Desconectado",
        description: "Você foi desconectado da sala.",
      });

      setLoading(false);
    });
  }

  const createRoom = () => {
    if (loading || !username) {
      return;
    }

    if (votingType === "hours") {
      const error = validateHoursRange(hoursMin, hoursMax);

      if (error) {
        setAlertDialogMessage(error);
        setAlertDialogOpen(true);
        return;
      }
    }

    const hoursRange = normalizeHoursRange({ min: hoursMin, max: hoursMax });

    setLoading(true);
    socket.emit(
      "createRoom",
      username,
      localStorage.getItem("pp@frontendCode"),
      votingType,
      hoursRange
    );
    window.localStorage.setItem("pp@username", username);
    window.localStorage.setItem("pp@votingType", votingType);
    window.localStorage.setItem("pp@hoursMin", hoursMin);
    window.localStorage.setItem("pp@hoursMax", hoursMax);
  };

  const joinRoom = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    socket.emit(
      "enterInRoom",
      roomId,
      username,
      localStorage.getItem("pp@frontendCode")
    );
    window.localStorage.setItem("pp@username", username);
  };

  const selectCard = (card: any) => {
    if (loading) {
      return;
    }

    setLoading(true);
    socket.emit("selectCard", roomId, card);
    setCard(card);
  };

  const showAllCards = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setShowResetButton(true);
    setResetButtonDisabled(true);
    setResetButtonTimer(3);
    socket.emit("showCards", roomId);
  };

  const resetCards = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    socket.emit("ressetCards", roomId);
    setShowResetButton(false);
    setResetButtonTimer(3);
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

  const roomVotingType = normalizeVotingType(roomData?.votingType);
  const deck = getDeck(roomVotingType, roomData?.hoursRange);
  const hoursRangeError = validateHoursRange(hoursMin, hoursMax);
  const hoursDeckPreview = hoursRangeError
    ? []
    : buildHoursDeck({ min: hoursMin, max: hoursMax }).filter(
        (value) => value !== "?"
      );
  const cardsRevealed =
    roomData?.average !== null && roomData?.average !== undefined;

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
        new URLSearchParams(window?.location?.search).get("roomId") ?? null
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
    const username = window.localStorage.getItem("pp@username");

    if (username) {
      setUsername(username);
    }

    const savedVotingType = window.localStorage.getItem("pp@votingType");

    if (savedVotingType) {
      setVotingType(normalizeVotingType(savedVotingType));
    }

    const savedHoursMin = window.localStorage.getItem("pp@hoursMin");
    const savedHoursMax = window.localStorage.getItem("pp@hoursMax");

    if (savedHoursMin && savedHoursMax) {
      if (!validateHoursRange(savedHoursMin, savedHoursMax)) {
        setHoursMin(savedHoursMin);
        setHoursMax(savedHoursMax);
      }
    }
  }, []);

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

  useEffect(() => {
    let timerInterval: any;

    if (resetButtonTimer > 0) {
      setResetButtonDisabled(true);

      timerInterval = setInterval(() => {
        setResetButtonTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResetButtonDisabled(false);
    }

    return () => clearInterval(timerInterval);
  }, [resetButtonTimer]);

  return (
    <>
      {(roomType || roomId) && (
        <main className="flex flex-1 flex-col w-full items-center px-4 py-8">
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-3xl md:text-4xl text-center tracking-tight">
                {getTitle(roomType, roomData, roomId)}
              </h1>

              {roomData && (
                <Button
                  variant="ghost"
                  size="icon"
                  title="Copiar link da sala"
                  aria-label="Copiar link da sala"
                  onClick={() => {
                    copyToClipboard(window.location.href);

                    toast({
                      title: "Link copiado!",
                      description:
                        "O link da sala foi copiado para a área de transferência.",
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>

            {roomData ? (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  <Clock className="h-3 w-3" />
                  {getVotingTypeLabel(roomVotingType, roomData?.hoursRange)}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {`${roomData.users.length} ${roomData.users.length === 1 ? "jogador" : "jogadores"
                    }`}
                </span>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm mt-3 mb-6 text-center">
                {getSubtitle(roomType, roomData, roomId)}
              </p>
            )}
          </div>

          {!roomData && (
            <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card/70 backdrop-blur p-6 shadow-sm">
              <div
                className={`flex ${roomType === "create" ? "flex-col" : "flex-col-reverse"
                  } gap-6`}
              >
                {!roomId && (
                  <div className="flex flex-col gap-4">
                    {roomType === "join" && (
                      <p className="text-sm font-medium">Criar uma nova sala</p>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="username"
                        className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                      >
                        Nome de usuário
                      </label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Insira o seu nome"
                        value={username}
                        onChange={(e) => setUsername(e?.target?.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Tipo de votação
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {VOTING_TYPES.map((option) => {
                          const selected = votingType === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              disabled={loading}
                              onClick={() => setVotingType(option.value)}
                              aria-pressed={selected}
                              className={`relative flex flex-col gap-1 rounded-xl border p-3 text-left transition-colors disabled:opacity-50 ${selected
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-primary/40 hover:bg-accent"
                                }`}
                            >
                              {selected && (
                                <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-primary" />
                              )}
                              <span className="text-sm font-medium pr-5">
                                {option.label}
                              </span>
                              <span className="text-xs text-muted-foreground leading-snug">
                                {option.description}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {votingType === "hours" && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Intervalo de horas
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="hoursMin"
                              className="text-xs text-muted-foreground"
                            >
                              Mínimo
                            </label>
                            <div className="relative">
                              <Input
                                id="hoursMin"
                                type="text"
                                inputMode="decimal"
                                placeholder="0,5"
                                className="pr-7"
                                value={hoursMin}
                                onChange={(e) => setHoursMin(e.target.value)}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                h
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label
                              htmlFor="hoursMax"
                              className="text-xs text-muted-foreground"
                            >
                              Máximo
                            </label>
                            <div className="relative">
                              <Input
                                id="hoursMax"
                                type="text"
                                inputMode="decimal"
                                placeholder="40"
                                className="pr-7"
                                value={hoursMax}
                                onChange={(e) => setHoursMax(e.target.value)}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                h
                              </span>
                            </div>
                          </div>
                        </div>

                        {hoursRangeError ? (
                          <p className="text-xs text-destructive mt-1">
                            {hoursRangeError}
                          </p>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground mr-1">
                              Cartas:
                            </span>
                            {hoursDeckPreview.map((value) => (
                              <span
                                key={value}
                                className="rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-xs text-muted-foreground"
                              >
                                {formatCardLabel(value, "hours")}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      className="w-full"
                      size="lg"
                      disabled={
                        loading || (votingType === "hours" && !!hoursRangeError)
                      }
                      onClick={createRoom}
                    >
                      Criar sala
                    </Button>
                  </div>
                )}

                {!roomId && (
                  <div className="flex w-full gap-3 items-center">
                    <div className="flex-1 h-px bg-border" />
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      ou
                    </p>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {roomType === "create" && (
                    <p className="text-sm font-medium">
                      Entrar em uma sala existente
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
                    <Button
                      className="w-full"
                      size="lg"
                      disabled={loading}
                      onClick={joinRoom}
                    >
                      Entrar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {roomData && (
            <div className="w-full max-w-md flex flex-col items-center gap-6">
              <div className="flex flex-col items-center justify-center w-full rounded-3xl border border-border/60 bg-muted/40 p-6 gap-3 min-h-[10rem]">
                {showResetButton && cardsRevealed && (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      Média
                    </span>
                    <span className="text-3xl font-bold">
                      {formatAverage(roomData?.average, roomVotingType)}
                    </span>
                  </div>
                )}

                {showResetButton && (
                  <Button
                    variant="outline"
                    onClick={resetCards}
                    disabled={resetButtonDisabled || loading}
                  >
                    Próxima rodada{" "}
                    {resetButtonDisabled && `(${resetButtonTimer})`}
                  </Button>
                )}

                {!showResetButton && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {getUsersThatSelectedMessage(getUsersThatSelected())}
                    </p>

                    {getUsersThatSelected() > 0 && (
                      <Button disabled={loading} onClick={showAllCards}>
                        Revelar cartas
                      </Button>
                    )}
                  </>
                )}
              </div>

              <div className="flex flex-col items-center justify-center w-full gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Jogadores na sala
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {roomData.users.map((user: any) => {
                    const numberSelected =
                      user.numberSelected !== null &&
                      user.numberSelected !== undefined;
                    const cardLabel = formatCardLabel(
                      user.numberSelected,
                      roomVotingType
                    );

                    return (
                      <div
                        key={user.socketId}
                        className="flex flex-col items-center justify-center gap-1 w-16"
                      >
                        <div
                          className={`flex justify-center items-center w-[50px] h-[68px] rounded-md border-2 transition-colors ${user.alreadySelected
                            ? "border-primary bg-primary/5"
                            : "border-dashed border-border bg-muted/40"
                            }`}
                        >
                          {user.alreadySelected ? (
                            <span
                              className={`font-bold text-foreground ${cardLabel.length > 3
                                ? "text-sm"
                                : cardLabel.length > 2
                                  ? "text-lg"
                                  : "text-2xl"
                                }`}
                            >
                              {numberSelected ? (
                                cardLabel
                              ) : (
                                <Check className="h-6 w-6 text-primary" />
                              )}
                            </span>
                          ) : (
                            <span className="text-2xl font-bold text-muted-foreground">
                              ?
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-center text-muted-foreground truncate w-full">
                          {user.username}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-center">
                  {roomVotingType === "hours"
                    ? "Selecione as horas estimadas"
                    : "Selecione a pontuação da tarefa"}
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {deck.map((value) => (
                    <Button
                      key={value}
                      variant={card === value ? "default" : "outline"}
                      className="h-16 w-14 text-base font-bold"
                      onClick={() => selectCard(value)}
                      disabled={loading || cardsRevealed}
                    >
                      {formatCardLabel(value, roomVotingType)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!roomData && (
            <Button
              className="mt-6"
              variant="ghost"
              disabled={loading}
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
        </main>
      )}
    </>
  );
}
