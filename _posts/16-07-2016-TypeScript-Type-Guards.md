---
layout: post
title: TypeScript - Type Guards
category: [TypeScript, TypeScript v1.4]
tags : [TypeScript, JavaScript]
---

Hoje vamos falar sobre `Type Guards`. Trata-se de um recurso do TypeScript que permite, a partir de uma validação de tipo, assumir que uma variável ou argumento declarado com o tipo `any` ou proveniente de uma uniao de tipos, é de um tipo específico préviamente verificado sem a necessidade de utilizar cast. Um pouco complicado neh? Nada melhor do que um exemplo para entendermos melhor:

Código utilizando cast:

```typescript
function fn(arg: any): any {
    if (typeof arg === "string") {
      	return (<string>arg).charCodeAt(0);
    } else if (typeof arg === "number") {
      	return (<number>arg).toFixed(10);
    } else {
      	// aqui arg continua sendo entendido como any
    }
}
```

Código utilizando type guards:

```typescript
function fn(arg: any): any {
    if (typeof arg === "string") {
      	return arg.charCodeAt(0); // arg já é entendido como string aqui
    } else if (typeof arg === "number") {
      	return arg.toFixed(10); // arg já é entendido como number aqui
    } else {
      	// aqui arg continua sendo entendido como any
    }
}
```

Note que o argumento `arg` foi declarado como `any` e dentro do bloco `if` que verifica se o tipo de `arg` é `string` o compilador entende que `arg` é `string` e lista no intellisense do editor todos os membros do tipo `string`. O mesmo acontece para o bloco de `if` que verifica se o tipo é `number`. Esse mesmo comportamento ocorre para tipos declarados com o operador de "union types".

```typescript
function fn(arg: string | number): any {
	if (typeof arg === "string") {
		return arg.charCodeAt(0); // arg é entendido como string aqui
	} else if (typeof arg === "number") {
		return arg.toFixed(10); // arg é entendido como number aqui
	}
}
```

Utilizamos o operador `typeof` para verificação de tipos primitivos. Caso queiramos utilizar o mesmo recurso para clases pré-definidas utilizamos o operador `instanceof`:

```typescript
class A {
	name: string;
}

function fn(arg: string | A): any {
	if (typeof arg === "string") {
		return arg.charCodeAt(0); // arg é entendido como string aqui
	} else if (arg instanceof A) {
		return arg.name; // arg é entendido como A aqui
	}
}
```

O legal desse recurso é que não precisamos ficar sujando o código fazendo cast. Uma solução muito mais elegante e limpa.

Até a próxima!

> Reference: TS v1.4 [https://github.com/Microsoft/TypeScript/pull/824#issuecomment-58273237](https://github.com/Microsoft/TypeScript/pull/824#issuecomment-58273237)
