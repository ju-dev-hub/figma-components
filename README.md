# Localiza Token Extractor

Aplicação desenvolvida em **React** dedicada a extração de tokens e iconografia a partir do **Figma**, ferramenta de design e prototipagem.


## Install Localiza Token Extractor

Para a instalação das dependências do projeto digite o seguinte comando no terminal do VS Code:

```powershell
npm install
```


## Figma Guide

### Personal Access Tokens

Permite acessar o dados do seu projeto por meio da API do Figma. O token pode ser obtido em **Settings** na sua conta pessoal do Figma.

### File ID

O **id do arquivo** do seu projeto. Pode ser obtido na própria url do seu projeto.


## Setup do ambiente de desenvolvimento

### Clonando o repositório

1) Acesse o repositório no [Azure DevOps](https://dev.azure.com/localiza/Engenharia%20-%20Lab%20Canais%20Digitais/_git/gestaodefrotas-designtokens);
2) Clique em 'Clone'  =>  'Clone in VS Code'  =>  Caso abra uma janela escolha 'Open Visual Studio Code';
3) Selecione uma pasta para o download do repositório;
4) Abra o repositório no VS Code.

### Instalando dependências

Para a instalação das dependências do projeto digite o seguinte comando no terminal do VS Code:

```powershell
npm install --save
```

### Servidor de desenvolvimento

Para subir o servidor de desenvolvimento digite o seguinte comando no terminal do VS Code:

```powershell
npm start && npm run server
``` 

Abrir no navegador `http://localhost:3000/`. A aplicação será recarregada automaticamente após salvar qualquer alteração de código.

### Extraindo tokens e iconografia

Digite no campo *Figma Token* o token de acesso e no campo *Figma ID* o id do arquivo do seu projeto. Precione **Enviar** e aguarde a extração dos dos tokens. 

Para gerar o arquivo **scss** com todos os tokens precione **Gerar Arquivo**. O arquivo será gerado na pasta *src/tokens*.


## Links úteis

* [Figma API](https://www.figma.com/developers/api)
* [Reactjs](https://reactjs.org/)