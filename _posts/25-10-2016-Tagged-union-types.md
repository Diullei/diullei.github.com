---
layout: post
title: União discriminada de tipos (Tagged union types)
category: [TypeScript, TypeScript v2.0]
tags : [TypeScript]
---

Hoje vou falar sobre uma feature muito legal que desenbarcou junto com a versão 2.0 to TypeScript, a união discriminada de tipos. Trata-se de uma extensão do recurso [type guards](/posts/TypeScript-Type-Guards) que baseia a verificação do tipo dentro de um determinado fluxo do código, tomando como base valor de uma propriedade. A definição pode parecer um pouco confusa, por isso vamos a um exemplo:

```typescript
interface Square {
    kind: "square";
    size: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
    // Repare que no bloco switch abaixo, o tipo da variável "s" é reconhecido pelo
    // compilador de forma diferente em cada bloco condicional. O compilador define
    // o tipo correto baseado no valor da propriedade "kind" definida nas interfaces
    // acima como um valor constante. Por esse motivo podemos utilizar as propriedades
    // específicas de cada interface sem precisar fazer uma conversão (cast).
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.width * s.height;
        case "circle": return Math.PI * s.radius * s.radius;
    }
}

// Repare como nas funções abaixo o compilador entende a lógica aplicada nos if's e
// interpreta o tipo de "s" de acordo com a propriedade "kind".

function test1(s: Shape) {
    if (s.kind === "square") {
        s;  // Aqui "s" é do tipo: "Square"
    }
    else {
        s;  // Aqui "s" é do tipo: "Rectangle | Circle"
    }
}

function test2(s: Shape) {
    if (s.kind === "square" || s.kind === "rectangle") {
        return;
    }
    s;  // Aqui "s" é do tipo "Circle"
}
```

Por enquanto esse recurso opera apenas sobre propriedades tipo `string`. Existe a intenção de, no futuro, adicionar suporte a outros tipo como `boolean` e `number`.

Esper oque este post tenha sido útil.

Até a próxima!
