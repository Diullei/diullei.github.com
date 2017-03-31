---
layout: post
title: TypeScript - Um pouco mais sobre Union types
category: [TypeScript, TypeScript v1.4]
tags : [TypeScript, JavaScript]
---

Esse post é uma continuação do post anterior onde eu falei sobre [union types](/2016/07/13/union-types/). Meu objetivo aqui é expor algumas propriedades básicas inerentes a declaração dos "union types". Para ficar fácel de entender vou colocar um exemplo de código para cada propriedade. Vamos lá!

## Identidade

> `A | A` é equivalente a `A`

```typescript
class A { /* ... */ }

let a: A | A = new A();
```

## Comutativa

> `A | B` é equivalente a `B | A`

```typescript
class A { /* ... */ }
class B { /* ... */ }

let a: A | B;
let b: B | A;

a = b;
```

> OBS: O tipo resultante de `A | B` será um tipo com todas as propriedades comuns a `A` e `B`. Equivalente a uma intercessão entre os tipos.

## Associativa

> `(A | B) | C` é equivalente a `A | (B | C)`

```typescript
class A { /* ... */ }
class B { /* ... */ }
class C { /* ... */ }

let a: (A | B) | C;
let b: A | (B | C);

a = b;
```

> O tipo `S` pode ser associado ao tipo `T1 | T2` se `S` for do tipo `T1` ou `S` for do tipo `T2`.

```typescript
let x: string | number;
x = 'olá'; // OK
x = 42; // OK
x = { }; // Erro
```

## Outros casos notáveis

### Herança

> `A | B` é equivalente a `A` se `B` é um subtipo de `A`

```typescript
class A { /* ... */ }
class B extends A { /* ... */ }

let a: A;
let b: A | B;

a = b;
```

### Propriedades

> O tipo `A | B` tem uma propriedade `P` do tipo `X | Y` se á tiver uma propriedade `P` do tipo `X` e `B` tiver uma propriedade `P` do tipo `Y`. Essas propriedades precisam ter o mesmo tipo de acessor, ou seja precisam ser ao mesmo tempo `public`, `private` or `protected`.

```typescript
class A { prop: number; }
class B { prop: string; }

let x: A | B;
let y = x.prop; // o tipo de y é number | string
```

### Funções

A mesma regra aplicada às propriedades exibida no item anterior também se aplica a funções.

> Em `A | B` se `A` e `B` tiverem uma função com o mesmo nome `X`, o tipo resultante terá uma função `X` identica, caso a funçao `X` seja identica em `A` e `B` ou sobrecarregada caso a função `X` possua assinatura diferente em `A` e `B`.

```typescript
class A {
	fn1(a: number): string { return ""; }
	fn2(): void { }
}

class B {
	fn1(b: string): number { return 0; }
	fn2(): void { }
}

let x: A | B;

// Aqui a função fn2 é do tipo: ((a: number) => string | (b: string) => number)
let fn2 = x.fn1;
// Aqui a função fn3 é do tipo: () => void
let fn3 = x.fn2;
```

### Inferência

Numa operação ternária entre valores de tipos diferentes `... ? a : b` o tipo do valor resultante será `A | B`.

Numa operação lógica `ou` entre valores de tipos diferentes `a || b` o tipo do valor resultante será `A | B`.

Num array de elementos de tipos diferentes `[a, b, c, ...]` o tipo deste array será inferido para `A | B | C | ...`.

### Conclusão

Este post foi totalmente teórico e muito dos comportamentos descritos aqui podem ser percebidos de forma intuitiva, no entando, é sempre bom entender um pouco mais esses fundamentos. Até a próxima!

> Reference: TS v1.4 [https://github.com/Microsoft/TypeScript/pull/824](https://github.com/Microsoft/TypeScript/pull/824)
