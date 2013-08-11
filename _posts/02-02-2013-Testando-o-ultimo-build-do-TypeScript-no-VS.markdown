---
layout: post
title: Testando o ultimo build do TypeScript no VS
category: posts
---

## Introdução

O objetivo deste post é mostrar como você pode atualizar a versão do TypeScript instalada na sua máquina com a ultima versão em desenvolvimento. Isso é legal caso você esteja acompanhando o que o time do TypeScript está preparando para as novas versões. Você vai precisar atualizar um arquivo chamado `typescriptSerivces.js`. Vamos ver como isso pode ser feito.

## Obtendo uma nova versão do arquivo typescriptSerivces.js

### Primeira opção: Usando o "LKG"

LKG é uma sigla que significa "Last Known Good" que significa no nosso contexto algo como "ultimo arquivo bom de que temos conhecimento". Você pode pegar uma cópia deste arquivo no CodePlex [aqui](http://typescript.codeplex.com/SourceControl/BrowseLatest?branch=develop), basta navegar até o diretorio `bin` e baixar o arquivo `typescriptSerivces.js`.

### Compilando a ultima versão do TypeScript

#### Pré-requisitos

Você vai precisar das seguintes feramentas instaladas na tua máquina:

* [Git](http://git-scm.com/downloads) - Algumas recomendações para instalação do git no windows
	* Não instale com a opção de integração com o Windows Explorer a menos que você vá realmente precisar disso.
	* Selecione a opção _Run Git from the Windows Command Prompt_.
	* Selecione _Checkout as-is_ and _commit as-is_
* [Node.js](http://nodejs.org/)

#### Clonando o TypeScript

	> git clone https://git01.codeplex.com/typescript

Isso irá criar um diretório local chamado `typescript` com o código fonte do projeto.

#### Selecionar o `Branch` da ultima versão em desenvolvimento

	> cd typescript

	> git checkout develop

O branch `develop` é onde encontramos as ultimas alterações de código.

#### Instalando as dependências do projeto

	> npm install

Isso irá instalar uma ferramenta clamada [jake](https://github.com/mde/jake) a qual é usada no build do TypeScript.

#### Compilando o TypeScript

	> .\node_modules\.bin\jake local 

> NOTA: Sempre que você quiser pegar a ultima versão do código do TypeScript para compilar localmente você pode apagar o folder `typescript` e repetir todo o procedomento acima ou simplesmente executar o comando `git pull` para atualizar seu repositório com as ultimas alterações feitas pelo time do TypeScript.

### Atualizando o arquivo typescriptSerivces.js

Você vai precisar localizar o diretório local onde onde a extensão do TypeScrit está instalada. Procure por um arquivo chamada `typescriptSerivces.js` em um diretório localizado em um caminho paredico com:

`C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\Extensions\enn4wcm5.z2b\`

Note que o ultimo diretório chamado `enn4wcm5.z2b` vai ter nome diferente em cada máquina. Em alguns casos raros você pode ter mais de um subfolde com a instalação do TypeScript. Se você tiver este cenário identifique pela data de criação o mais recente.

Localize o arquivo `typescriptSerivces.js`, faça um backup e substitua este arquivo pela ultima versão optida no tópico anterior.

Feito isso, reinicie o Visual Studio e divirta-se!

Um grande abraço e até a próxima!
