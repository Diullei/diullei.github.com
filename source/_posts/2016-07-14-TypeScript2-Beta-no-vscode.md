---
layout: post
title: Configurando o TypeScript 2.0 Beta no VSCode
category: TypeScript
tags : [TypeScript, JavaScript, VSCode]
---

Tenho escrito alguns posts falando sobre as novidades do [TypeScript 2.0 Beta](/posts/TypeScript2-Beta-nun-nullable-types) que foi lançado há alguns dias e algumas pessoas vieram me perguntar como utilizar essa nova versão no Visual Studio Code ([vscode](https://code.visualstudio.com)). Resolvi escrever este post para mostrar com é fácil fazer esta configuração. O legal é que podemos fazer esta configuração por projeto, ou seja, posso ter projetos diferentes utilizando versões diferentes do TypeScript sem a necessidade de alterar a minha instalação global :)

## Configurando um novo projeto

Crie um diretório para o seu projeto e execute dentro deste diretório o seguinte comando:

    npm init -y

Isso irá criar um arquivo de configuração padrão do `npm` chamado `package.json`. Agora vamos instalar a versão desejada do TypeScript. No nosso caso vamos instalar a versão 2.0 Beta:

    npm install typescript@beta

Esse comando irá instalar o TypeScript dentro de uma pasta local chamada `node_modules`. Feito isso vamos abrir o vscode e criar um outro arquivo de configuração que irá informar ao vscode que ele deverá utilizar a versão do TypeScript instalada dentro da pasta `node_modules` local.

Abra o vscode e vá em `File > Preferences > Workspace Settings`. note que serão abertos 2 arquivos lado a lado. O arquigo `settings.json` será criado dentro de um diretório chamado `.vscode` e é esse arquivo que iremos alterar para informar ao vscode que sempre que estivermos neste diretório a versão do TypeScript que deverá ser utilizada será a versão 2.0 Beta instalada via `npm`. Para isso altere o conteúdo deste arquivo para o seguinte:

    {
        "typescript.tsdk": "node_modules/typescript/lib"
    }

Feito isso salve o arquivo. Pronto! Vamos agora testar para entender se tudo foi configurado corretamente. Crie um arquivo chamado `tsconfig.json` e insira o seguinte código:

    {
        "compilerOptions": {
            "target": "es5",
            "module": "commonjs",
            "moduleResolution": "node",
            "isolatedModules": false,
            "jsx": "react",
            "experimentalDecorators": true,
            "emitDecoratorMetadata": true,
            "declaration": false,
            "noImplicitAny": true,
            "noImplicitUseStrict": true,
            "removeComments": true,
            "noLib": false,
            "preserveConstEnums": true,
            "suppressImplicitAnyIndexErrors": true,
            "strictNullChecks": true
        },
        "exclude": [
            "node_modules"
        ]
    }

Agora crie um novo arquivo chamado `exemplo.ts` e insirea o seguinte código:

```typescript
declare let names: string[] | undefined;

// Error! 'names' is possibly undefined.
let upperCased = names!.map(s => s.toUpperCase());
```

Feito isso tente compilar esse código com o comando `Ctrl+shift+B`. Repare que o vscode irá exibir uma mensagem dizendo: `No task runner configured`. Clique no botão `Configue Task Runner` exibido ao lado direito dessa mensagem e selecione `TypeScript - tsconfig.json` na lista de opções que será exibida. Com isso o vscode irá criar um novo arquivo dentro da pasta `.vscode` chamado `tasks.json`. Altere a linha `"command": "tsc"` para `"command": "node_modules/.bin/tsc"`. Reinicie o vscode e tente executar novamente o comando de build `Ctrl+shift+B`.

Se tudo foi configurado corretamente o vscode irá compilar o código do arquivo `exemplo.ts` utilizando a versão local do TypeScript configurada. Note que se você remover o operador `!` da linha 4 o vscode já ira informar um erro parecido com `'names' is possibly undefined`.

É isso. Agora você já pode testar novas features do TypeScript 2.0 no vscode \o/
