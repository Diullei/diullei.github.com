---
layout: post
title: ES6 - Nova sintaxe para criação de objetos
category: [TypeScript, TypeScript v1.4, ES6]
tags : [TypeScript, JavaScript, ES6]
---

Com o ES6 temos a possibilidade de criar objetos com uma sintaxe bem diferente da que estávamos acostumados até agora. Vamos tomar como exemplo a seguinte declarção:

```JavaScript
const firstName = 'Diulle';
const secondName = 'Gomes';

let obj = {
    firstName: firstName,
    secondName: secondName
};
```

Utilizando a nova sintaxe podemos reescrever esse trecho de código da seguinte forma:

```JavaScript
const firstName = 'Diulle';
const secondName = 'Gomes';

let obj = {
    firstName,
    secondName
};
```

Note que neste caso o nome da variável será considerado também como nome da propriedade do objeto. Existe ainda uma outra forma conhecida como "Computed property key" onde podemos passar o resultado de uma expressão na criação de uma propriedade. Veja o seguinte exemplo:

```JavaScript
const firstName = 'firstName';

let obj = {
    [firstName]: 'Diullei',
    ['secondName']: 'Gomes',
    ['other' + 'name']: 'Moura'
};
```

Essa mesma sintaxe também pode ser aplicada par a criação de funções. Por exemplo, o seguinte trecho de códiogo:

```JavaScript
const obj = {
    myMethod: function(x, y) {
      //...
    }
};
```

Pode ser reescrito da seguinte forma:

```JavaScript
const obj = {
    myMethod(x, y) {
      //...
    }
};
```

Ou assim:

```JavaScript
const obj = {
    ['myMethod'](x, y) {
      //...
    }
};
```

O objetivo principal dessa nova sintaxe é facilitar a utilização de `Symbols` como nome de propriedades. Exemplo:

```JavaScript
const obj = {
    * [Symbol.iterator]() { // (A)
        yield 'hello';
        yield 'world';
    }
};

for (const x of obj) {
    console.log(x);
}
// Output:
// hello
// world
```

No código acima estamos criando um objeto com um generator identificado por `Symbol.iterator`. Veremos mais a fundo a utilização de `Symbols` em outros artigos.

O legal é que o `TypeScript` já suporta a utilização dessa sintaxe!

Por hoje é só. Abraços!
