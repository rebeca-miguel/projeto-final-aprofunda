# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Controle de Gastos com Gemini - Aprofunda Pretalab

Uma plataforma intuitiva para você controlar seus gastos e alcançar suas metas financeiras. Com o [Nome da sua aplicação], você pode:

- **Upload de notas fiscais:** Tire uma foto da sua nota e deixe que a nossa ferramenta faça o resto.
- **Dashboard personalizado:** Visualize seus gastos de forma clara e organizada.
- **Histórico detalhado:** Acompanhe todas as suas transações.
- **Conselhos financeiros:** Receba dicas personalizadas para melhorar suas finanças.

## Como funciona

1. **Tenha uma nota em PDF:** Tenha um arquivo salvo na sua máquina: sua nota fiscal.
2. **Faça o upload:** Envie o arquivo para a plataforma.
3. **Acompanhe seus gastos:** Veja seus gastos atualizados em tempo real no dashboard.

## 🔨 Funcionalidades

- **Upload de Imagens**: Permite que o usuário envie uma imagem da nota fiscal.
- **Reconhecimento de Caracteres (OCR)**: Utiliza uma API de OCR (Google Vision API ou Gemini) para extrair o valor da nota fiscal.
- **Atualização Automática do Dashboard**: Adiciona o valor reconhecido ao controle financeiro, exibindo o total no dashboard.
- **Histórico de Transações**: Exibe o histórico de gastos com detalhes de data, valor e categoria.
- **Autenticação de Usuário**: Para que cada usuário tenha um dashboard personalizado.

## ✔️ Tecnologias Utilizadas

### Frontend

- **Frontend:** React, Vite, Styled Components
- **Backend:** Node.js, Express, Firebase
- **OCR:** Google Vision API

### Infraestrutura e Deploy

- **Google Cloud Platform (GCP)**
  - **Google Cloud Functions** para processamento assíncrono de imagens
  - **Google Cloud Storage** para armazenar imagens enviadas
  - **Firestore** para banco de dados de transações

##

## Instalação

1. Clone o repositório:

   ```bash
   git clone [https://github.com/seuusuario/plataforma-gerenciamento-gastos.git](https://github.com/seuusuario/plataforma-gerenciamento-gastos.git)

   ```

2. Acesse o projeto e instale as dependências:
   ```bash
   cd plataforma-gerenciamento-gastos
   npm install
   ```

Estrutura de Arquivos

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── app.js
│   ├── package.json
└── README.md
```

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/plataforma-gerenciamento-gastos.git
   ```

```sh
   npm install
```

## Critérios de Aceite

1. Autenticação e Autorização de Usuário
   Dado que uma usuária tenta acessar o sistema,
   Quando ela insere suas credenciais válidas e faz login,
   Então o sistema deve autenticar a usuária e redirecioná-la ao seu dashboard personalizado, garantindo o acesso apenas a suas transações.

2. Processamento OCR (Reconhecimento de Texto)
   Dado que o upload de uma imagem foi concluído,
   Quando o sistema processa a imagem através da API OCR (Google Vision ou Gemini),
   Então o valor reconhecido na imagem deve ser extraído e associado à conta da usuária.

3. Atualização Automática do Dashboard
   Dado que o valor foi extraído com sucesso de uma nota fiscal,
   Quando o processamento é concluído e os dados são salvos no banco,
   Então o dashboard da usuária deve ser atualizado automaticamente com o novo valor, somando-o ao total de gastos.

4. Histórico de Transações
   Dado que a usuária tem transações registradas no sistema,
   Quando a usuária acessa a tela de histórico de transações,
   Então o sistema deve exibir uma lista de todas as transações, incluindo a data, o valor e a categoria de cada uma.

5. Upload de Imagem da Nota Fiscal
   Dado que a usuária está autenticada e acessa a funcionalidade de upload,
   Quando a usuária faz o upload de uma imagem válida da nota fiscal,
   Então o sistema deve exibir uma mensagem de confirmação de envio e iniciar o processamento OCR para extrair os dados.

6. Validação de Upload de Imagem
   Dado que a usuária tenta fazer upload de um arquivo,
   Quando o arquivo enviado não é uma imagem válida (não está nos formatos suportados ou o tamanho é excessivo),
   Então o sistema deve exibir uma mensagem de erro orientando sobre os requisitos de upload e impedir o envio até que as condições sejam atendidas.

7. Persistência de Dados
   Dado que uma transação foi adicionada com sucesso,
   Quando o sistema armazena o valor e os detalhes no banco de dados,
   Então esses dados devem ser persistidos no histórico, permitindo recuperação futura mesmo após logout ou atualização do sistema.