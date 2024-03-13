"use client";

import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [roomId, setRoomId] = useState(
    new URLSearchParams(window.location.search).get("roomId")
  );
  const [username, setUsername] = useState("");

  const [roomData, setRoomData] = useState<any>();
  const [card, setCard] = useState("");

  const [showRessetButton, setShowRessetButton] = useState(false);

  const [showCreateRoomFields, setShowCreateRoomFields] = useState(false);

  const initSocketEvents = useCallback(() => {
    // Manipuladores de eventos do Socket.IO

    socket.on("roomCreated", (roomId) => {
      alert(1);
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

  // Função para criar uma nova sala
  const createRoom = () => {
    if (username) {
      socket.emit("createRoom", username);
    }
  };

  // Função para entrar em uma sala
  const joinRoom = () => {
    socket.emit("enterInRoom", roomId, username);
  };

  // Função para selecionar uma carta
  const selectCard = (card) => {
    socket.emit("selectCard", roomId, card);
    setCard(card);
  };

  // Função para mostrar todas as cartas
  const showAllCards = () => {
    const usersSelected = roomData.users.filter(
      (user: any) => user.alreadySelected
    );

    if (usersSelected.length !== roomData.users.length) {
      alert("Nem todos os jogadores selecionaram suas cartas");
      return;
    }

    setShowRessetButton(true);
    socket.emit("showCards", roomId);
  };

  const ressetCards = () => {
    socket.emit("ressetCards", roomId);
    setShowRessetButton(false);
    setCard("");
  };

  useEffect(() => {
    if (!roomId || roomData || !username) {
      return;
    }

    socket.emit("roomUpdate", roomId);
  }, [roomId, roomData]);

  useEffect(() => {
    initSocketEvents();
  }, [initSocketEvents]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Planning Poker</h1>
      {!roomData && !roomId && (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowCreateRoomFields(true)}
          >
            Criar Sala
          </button>

          {showCreateRoomFields && (
            <div>
              <input
                type="text"
                placeholder="Seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={createRoom}
              >
                Criar
              </button>
            </div>
          )}
        </>
      )}
      <br />

      {!roomData && (
        <div>
          <label>Entrar em uma sala:</label>
          <input
            type="text"
            placeholder="Digite o ID da sala"
            value={roomId || ""}
            onChange={(e) => setRoomId(e.target.value)}
            className="ml-2"
          />

          {roomId && (
            <input
              type="text"
              placeholder="Seu nome"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="mr-2 ml-2"
            />
          )}
          {roomId && username && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={joinRoom}
            >
              Entrar
            </button>
          )}
        </div>
      )}

      {roomData && (
        <>
          <h4>Link para compartilhar: {window.location.href}</h4>

          <div className="mt-4 mb-4">
            Jogadores
            <ul>
              {roomData.users.map((user: any) => (
                <li key={user.socketId}>{user.username}</li>
              ))}
            </ul>
          </div>

          <h3>Selecione seu ponto:</h3>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => selectCard("1")}
          >
            1
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => selectCard("2")}
          >
            2
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => selectCard("3")}
          >
            3
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => selectCard("5")}
          >
            5
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => selectCard("8")}
          >
            8
          </button>
          <br />
          <br />
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={showAllCards}
          >
            Mostrar Todas as Cartas
          </button>

          {showRessetButton && (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={ressetCards}
            >
              Reiniciar pontuação
            </button>
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
    </div>
  );
}
