---
layout: post
title: TypeScript e o futuro dos arquivos de declaração
category: [TypeScript, TypeScript v2.0, DefinitelyTyped]
tags : [TypeScript, JavaScript]
---

Alguns anos se passaram desde que a primeira versão do TypeScript veio a público. Agora quando a versão 2.0 está quase sendo lançada vemos o quanto esse projeto evoluiu. Uma das mudanças significativas desta nova versão é com relação aos arquivos de definição.

Até hoje, para encontrar um arquivo de definição nós tinhamos 2 opções: ir até o repositório do [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) no github e baixar manualmente o arquivo ou utilizar uma das ferramentas criadas para automatizar esse trabalho, o [TSD](https://github.com/DefinitelyTyped/tsd) ou o [typings](https://github.com/typings/typings).

Pensando em melhorar esse trabalho o time do TypeScript está colocando suporte à instalaçao desses arquivos direto do [npm](https://www.npmjs.com/). Como um dos administradores do grupo DefinitelyTyped eu me sinto muito feliz por saber que fizemos parte dessa mudança ajudando o time do TypeSript a entender como os membros da comunidade desenvolvem e utilizam esses arquivos. O DefinitelyTyped se tornou o repositório central dos arquivos de definição para o Typescript e é a partir dele que os pacotes no npm são gerados.

Agora para instalar por exemplo a definição do `lodash` podemos utilizar a seguinte linha de comando:

    npm install --save @types/lodash

Com isso seremos capazes de utilizar o `lodash` no nosso código TypeScript. Exemplo:

```
import * as _ from "lodash";
_.padStart("Hello TypeScript!", 20, " ");
```

Uma lista de todas as tipagens disponíveis pode ser encontrada neste link: [https://aka.ms/types]( https://aka.ms/types).

Se você nao quiser esperar até o release da versão 2.0 você pode instalar o nightly builds. Apenas execute:

    npm install -g typescript@next

Ferramentas como o TSD e o typings continuarão funcionando mas com certeza será muito mais interessante utilizar o npm.

Bem, é isso, Até a próxima!
