---
layout: post
title: TypeScript e o tipo "never"
category: [TypeScript, TypeScript v2.0]
tags : [TypeScript]
---
Continuando a série de artigos sobre as novidades da versão 2.0 do TypeScript hoje eu vou falar um pouco sobre o tipo `never`.

Como vimos no post sobre [união discriminada de tipos](/posts/Tagged-union-types) e em outro post sobre [type guards](/posts/TypeScript-Type-Guards), o compilador do TypeScript possui um recurso que analiza todas as possíveis rotas de fluxo no código que está sendo compilado com o objetivo de definir da forma mais precisa possível o tipo das variáveis que estão sendo utilizadas (Veja o ultimo post ["união discriminada de tipos"](/posts/Tagged-union-types) para entender um pouco mais).

Em um aplicativo, em alguns casos, teremos fluxos no código que nuca serão executados. Por causa disso, para prover uma analize de código mais completa o time do TypeScript inseriu um novo tipo chamado `never`. Entenda o tipo `never` com a representação de valores que nunca serão retornados.

Encontraremos o tipo `never` no código de 2 maneiras diferentes. Ele pode ocorrer naturalmente. Por exemplo:

```typescript
let result = (() => {
    while (true) {
        //...
    }
})();
// let result: never
```

Se observarmos o código da função anônima acima veremos um "loop infinito", o código fica eternamente executando dentro do bloco `while` e nunca retorna um valor, ou seja, nunca finaliza. Como o compilador do TypeScript analiza todo código que está sendo escrito, ele entende naturalmente que se trata de um bloco de código que nunca será executado e por isso, no nosso caso, ele define o valor de retorno da função como `never`.

Além de fluxos com "loop infinito" o compilador também irá inferir o tipo `never` para funções que lançam exceção em seu fluxo principal. Exemplo:

```typescript
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

let result = fail();
// let result: never
```

A outra forma de encontrar o tipo `never` é quando declaramos diretamente este tipo. Exemplo:

```typescript
function alwaysNever(): never {
    throw new Error("!");
}
```

### Confundindo o tipo "never" com o tipo "void"

É muito comum a primeira vista alguem confundir o tipo `never` com o tipo `void`, mas se olharmos com mais atenção veremos que são tipos completamente diferentes. Para explicar melhor essa diferença vamos a um caso de uso:

Antes de termos o tipo `never` o código acima (função `function alwaysNever() { ... }`) seria reconhecido como sendo do tipo `void`. Algo similar ao código abaixo:

```typescript
function alwaysThrows(): void {
    throw new Error("!");
}
```

Como `void` não é um subtipo, a auusencia do tipo `never` ocasionava em alguns momentos alguns efeitos colaterais, veja o exemplo abaixo:

```typescript
function alwaysThrows(): void {
    throw new Error("!");
}

function test(a: boolean) {
    return a ? 123 : alwaysThrows();
}

let result = test(false);
```

Se verificarmos no código acima, com a ausencia do tipo `never` a variável `result` assume o tipo `number | void`. Isso é um erro por que se verificarmos o retorno da função `test(...)` tendo o argument `a` como `false` teremos na realidade uma exceção e nunca um valor do tipo `void`. Com isso em mente o tipo da variável `result` deve ser entendido como `number` já que temos como unica possibilidadde de retorno é o valor `123`. O tipo `never` nos ajuda a arrumar este efeito colateral pois `never` é um subtipo de todos os outros tipos conhecidos.

Reescrevendo o código acima temos:

```typescript
function alwaysThrows(): never {
    throw new Error("!");
}

function test(a: boolean) {
    return a ? 123 : alwaysThrows();
}

let result = test(false);
```

Agora o compilador irá entender corretamente o código e definir o tipo da variavel `result` como `number`.

É isso, até a próxima!

> Reference: TS v2.0 [pull/8652](https://github.com/Microsoft/TypeScript/pull/8652) e [issues/3076](https://github.com/Microsoft/TypeScript/issues/3076)
