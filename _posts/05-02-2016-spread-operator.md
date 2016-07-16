---
layout: post
title: Spread Operator (Operador de Propagação)
category: [TypeScript, TypeScript v1.5]
tags : [TypeScript, JavaScript]
---

No ultimo artigo eu falei de forma bem rapida e simple sobre um recurso muito interessante do TypeScript `rest parameters`. Seguindo esta mesma linha hoje eu quero falar sbore um outro recuro muito legal chamado `spread operator`.

O `Spread Operator` (Operador de Propagação) permite que uma expressão seja expandida em locais onde são esperados vários argumentos (chamadas de função) ou múltiplos elementos (arrays literais).

Para entender melhor este recurso, como de costume vamos a um exemplo:

```
function myFunc(...val: string[]) {
    //...
}

let animals = ['dog', 'cat'];

myFunc('dog', 'cat');

myFunc(...animals);
```

Veja que a função `myFunc` possui um parâmetro do tipo [`rest parameter`](/posts/rest-parameters). Para entender sobre `rest parameter` veja o meu [ultimo artigo](/posts/rest-parameters). Esta função pode ser chamada opcionalmente passando um array seguindo a mesma sintaxe usada na assinatura da função `...`:

    myFunc(...animals);

onde `animals` é o nosso array: `let animals = ['dog', 'cat'];`

## Recuperando valores com destrutores

Podemos facilmente recuperar os valores dentro da função `myFunc` utilizando um recurso chamado `Destructuring` (Veremos este recurso com mais detalhes em outro artigo). Exemplo:

```
function myFunc(...val: string[]) {
    let [val1, val2] = val;
    //...
}
```

Note que estamos "destruindo" o valor do array `val` em 2 outras variáveis `val1` e `val2`. Sendo `val` um array, estamos criando uma variavel `val1` com o primeiro valor de `val` e uma outra variavel `val2` com o segundo valor de `val`.

Este recurso também pode ser utilizado na construção de arrays:

```typescript
let array1 = [1, 2, 3];
let array2 = [0, ...array1, 4, 5, 6];
```

onde retemos o valor de `array2` como: `[0, 1, 2, 3, 4, 5, 6]`.

Aqui temos outro exemplo concatenando 2 arrays usando a função `push`:

```typescript
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```

O código acima seria similar à utilização da função [`concat`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).

Este reurso está definido na especificação do ES6 e não foi totalmente implementado no TypeScript ainda. Exemplo de sintax que ainda não funciona no TypeScript mas que já pode ser testado utilizando o babeljs por exemplo:

```
function foo(x, y, z) { }
let args = [0, 1, 2];
foo(...args);
```

Repare que no exemplo acima o valor do array `args` está sendo "destruído" para alimentar os argumentos da função `foo`. Para saber mais sobre Spread Operators no ES6 [acesse aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

É isso, Abraços!

> Spec: TS v1.5 [https://github.com/Microsoft/TypeScript/pull/1931](https://github.com/Microsoft/TypeScript/pull/1931)
