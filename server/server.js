// Exemplo de código no seu SERVIDOR (backend - Node.js/Express)
import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config"; // Para carregar variáveis de ambiente como GEMINI_API_KEY

const app = express();
const port = 3001;

// Inicializa a API do Gemini com a chave de API segura no servidor
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

app.use(express.json()); // Middleware para parsear o corpo das requisições JSON

// Configuração de CORS se seu front-end estiver em um domínio diferente
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Ajuste para a URL do seu front-end
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Endpoint para o chat
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Configuração para o modelo (ajuste conforme a necessidade)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
    });

    // Envia a resposta de volta para o front-end
    res.json({ text: response.text });
  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao processar a requisição." });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
