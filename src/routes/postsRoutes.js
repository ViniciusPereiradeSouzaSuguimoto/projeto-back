import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOpitions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o middleware Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os uploads.
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // 'uploads/' é a pasta onde os arquivos serão salvos.
  },
  // Define o nome do arquivo no servidor.
  filename: function (req, file, cb) {
    cb(null, file.originalname); // O nome do arquivo será o nome original enviado pelo cliente.
  }
})

// Cria uma instância do middleware Multer com as configurações de armazenamento.
const upload = multer({ dest: "./uploads", storage });
// Opcional: para Linux/Mac, sem configuração de storage, o Multer usa um armazenamento temporário.
// const upload = multer({dest: "./uploads"})

// Função para definir as rotas da aplicação.
const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON.
  app.use(express.json()); // Habilita o middleware para lidar com requisições JSON.
  app.use(cors(corsOpitions))

  // Rota GET para listar todos os posts.
  app.get("/posts", listarPosts); // Chama a função listarPosts para recuperar todos os posts.

  // Rota POST para criar um novo post.
  app.post("/posts", postarNovoPost); // Chama a função postarNovoPost para criar um novo post.

  // Rota POST para upload de imagem.
  // O middleware upload.single("imagem") intercepta a requisição e processa o arquivo enviado com o campo "imagem".
  app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função uploadImagem para processar a imagem enviada.

  app.put("/upload/:id", atualizarNovoPost)

};

export default routes;