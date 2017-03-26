---
layout: post
title: TypeScript - Rest Parameters
category: [TypeScript, TypeScript v1.0]
tags : [TypeScript, JavaScript]
---

Hoje vou falar rapidamente sobre um recurso muito legal do TypeScript: rest parameters. Se você programa em C# você vai entender bem o conceito, é uma feature similar ao [`params`](https://msdn.microsoft.com/en-us/library/w5zay9db.aspx).

No TypeScript este recurso nos permite recuperar todos os parâmetros informados para uma função como um unico argumento do tipo array. Para entender melhor nada melhor do que um exemplo:

```
function buildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Diullei", "de", "Moura", "Gomes");

//=> Diullei de Moura Gomes
```

Note que a assinatura desta função declara 2 parâmetros diferentes: `firstName: string` e `...restOfName: string[]`. Ao utilizarmos o símbolo `...` na declaração do segundo argumento estamos dizendo ao compilador que todos os argumentos passados a para a função `buildName` a partir do segundo serão agrupados em um array do tipo `string`. Note que o operador `...` só pode ser aplicado a um argumento do tipo `array` e que este precisa ser sempre o ultimo argumento da função. Este recurso é chamado de `Rest Parameter`.

Este não é um recurso original do TypeScript e já havia sido definido para o ES6 ([para saber mais sobre rest parameters no ES6](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/rest_parameters)).

Abraços!
