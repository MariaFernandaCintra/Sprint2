const app = require("./index");
const cors = require('cors');

const corsOptions = {
    origin: '*', // Substitua pela origem permitida se necessário
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Corrigido aqui para 'PATCH' em vez de 'PATH'
    credentials: true, // Permite o uso de cookies e credenciais
    optionsSuccessStatus: 204, // Define o status de resposta para o método OPTIONS
};

// Aplicando o middleware CORS no app
app.use(cors(corsOptions));

// Inicia o servidor na porta 5000
app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000');
});
