import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AudioLines, Send, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    // Mensagens iniciais para simular a conversa
    {
      role: "model",
      text: "Olá! Como um modelo de linguagem, estou pronto para te ajudar. Em que posso ser útil hoje?",
    },
  ]);

  // Função para enviar a mensagem
  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const newMessage = message.trim();
    setMessage(""); // Limpa o input
    setLoading(true);

    // Adiciona a mensagem do usuário ao histórico
    setChatHistory((prev) => [...prev, { role: "user", text: newMessage }]);

    try {
      // **CHAMADA PARA O SEU BACK-END SEGURO**
      const response = await fetch("http://localhost:3001/api/chat", {
        // **URL DO SEU BACK-END**
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) {
        throw new Error("Erro na comunicação com o servidor.");
      }

      const data = await response.json();

      // Adiciona a resposta do Gemini ao histórico
      setChatHistory((prev) => [...prev, { role: "model", text: data.text }]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      // Adiciona uma mensagem de erro ao histórico se necessário
      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          text: "Desculpe, houve um erro ao receber a resposta.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Mapeamento dos balões de chat (você terá que ajustar o CSS para usar o 'role')
  const ChatBubble = ({ role, text }) => (
    <div
      className={`flex ${role === "user" ? "justify-end" : "items-end gap-3"}`}
    >
      {role === "model" && (
        <div className="shadow rounded-full py-2 px-3">
          <img
            src="./src/assets/robot.png"
            className="flex h-7"
            alt="Avatar do Bot"
          />
        </div>
      )}
      <span
        className={`p-5 shadow flex items-center max-w-[70%] font-medium 
          ${
            role === "user"
              ? "rounded-bl-4xl rounded-br-4xl rounded-tl-4xl bg-primary-blue text-white max-w-130 justify-end"
              : "rounded-tl-4xl rounded-br-4xl rounded-tr-4xl bg-gray-100 text-black"
          }`}
      >
        {text}
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center">
      <div className="p-5 grid grid-rows-[min-content_1fr_min-content] gap-5 h-full max-w-250">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 ">
              <Link to={"/"}>
                <ArrowLeft />
              </Link>
              <img src="./src/assets/robot.png" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-primary-blue">ChatGPT</h2>
              <span className="flex items-center">
                <li className="font-medium ml-5 text-green-600">Online</li>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <AudioLines />
            <Upload className="text-gray-400" />
          </div>
        </div>
        <Separator />

        <ScrollArea className="w-full h-200 max-h-[700px] pr-5">
          <div className="flex flex-col gap-5">
            {chatHistory.map((msg, index) => (
              <ChatBubble key={index} role={msg.role} text={msg.text} />
            ))}
            {loading && <ChatBubble role="model" text="Digitando..." />}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <div className="flex gap-3 items-center shadow rounded-full py-3 px-5">
          <Input
            placeholder="Write your mesage..."
            className="border-none shadow-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={loading}
          ></Input>
          <Send
            className={`cursor-pointer ${
              loading ? "text-gray-400" : "text-primary-blue"
            }`}
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
