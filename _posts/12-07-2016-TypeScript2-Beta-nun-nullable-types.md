---
layout: post
title: TypeScript 2.0 Beta - Non nullable types (Tipos não nulos)
category: [TypeScript, TypeScript v2.0]
tags : [TypeScript, JavaScript]
---
O TypeScript 2.0 Beta desembarcou com muitas novidades. [Veja aqui](https://blogs.msdn.microsoft.com/typescript/2016/07/11/announcing-typescript-2-0-beta/) o post original no blog da Microsoft. No decorrer dos próximos posts vou falar um pouco mais sobre as features dessa nova versão. Para iniciar, hoje quero falar sobre um dos recursos que eu já estava acompanhando e achei muito legal: a definição de tipos não nulos.

Antes, para que possamos seguir com os exemplo que irei colocar aqui no post vamos instalar essa nova versão:

    npm install -g typescript@beta

> Com este release você já pode testar (caso não tenha testado ainda) a utilização dos `dts`s direto do npm. Escrevi sobre isso nesse [outro artigo](/posts/The-Future-of-Declaration-Files).

## Tipos não nulos (Non-nullable Types)

Essa feature sem dúvidas é uma das mais legais dessa nova versão. `null` e `undefined` são a origem comum de quase todos os bugs introduzidos durante a programação em JavaScript onde `null` se aplica a objetos e `undefined` a variáveis, propriedades e funções (pretendo falar mais sobre isso em outro artigo). Nas versões anteriores do TypeScript o tipo `null` e o `undefined` faziam parte do dominio de todos os outros tipos, ou seja, uma variável declarada como `string` poderia em algum momento assumir um valor `null`. Com o TypeScript 2.0 a utilização do novo flag `--strictNullChecks` durante a compilação muda essa lógica. Agora uma variável do tipo `string` passar a ser apenas do tipo `string` e nada mais. Exemplo:

    let valor: string = null; // Error

Mas pera ai, e seu eu quiser que a variável `valor` aceite tanto um valor do tipo `string` quanto um valor nulo? Simples, basta utilizar o recurso [`union types`](/posts/union-types). Exemplo:

    let valor: string | null = null; // Ok!

Isso transfere para o desenvolvedor a decisão de aceitar ou não um valor `null` ou `undefined` e protege o código contra bugs que passariam despercebidos.

Agora observe o seguinte trecho de código:

    declare let names: string[] | undefined;

    // Error! 'names' is possibly undefined.
    let upperCased = names.map(s => s.toUpperCase());

No exemplo acima teremos um erro. O compilador do TypeScript entende que `names` pode ser `undefined` devido a sua declaração `string[] | undefined`. Mas se tivermos certeza de que nesse caso `names` nunca será `undefined` e quisermos que este código execute mesmo assim podemos utilizar o operador `!` como a seguir:

    let upperCased = names!.map(s => s.toUpperCase());

Ao utilizar o oerador `!` na variável `names!` estamos dizendo ao compilador que temos certeza de que essa variável nunca será `undefined` neste ponto do código.

### Aplicação em parâmetros e propriedades opcionais

Uma ressalva com relação a declarações opcionais. Todo parâmetro ou propriedade opcional tem de forma automática o tipo `undefined` agregado ao seu tipo original, mesmo quando isso não é declarado de forma explicita no código. por exemplo:

```typescript
// Compilado com --strictNullChecks
type T1 = (x?: number) => string;              // x é do tipo: number | undefined
type T2 = (x?: number | undefined) => string;  // x é do tipo: number | undefined
```

por isso um parâmetro ou propriedade opcional sempre será nullable.

> NOTA: Para compilar os exemplos de código acima via linha de comando basta salvar o codigo em um arquivo e executar: `tsc file.ts --strictNullChecks`

É isso aí pessoal, até a próxima!

> Reference: TS v2.0 [https://github.com/Microsoft/TypeScript/pull/7140](https://github.com/Microsoft/TypeScript/pull/7140)
