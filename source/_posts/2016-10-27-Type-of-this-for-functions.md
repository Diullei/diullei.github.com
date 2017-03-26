---
layout: post
title: Definindo o tipo de "this" em funções
category: [TypeScript, TypeScript v2.0]
tags : [TypeScript]
---

O TypeScript 2.0 nos permite definir o tipo da referência `this` dentro de uma função. Como sempre, para entender melhor, vamos aos exemplos:

```typescript
class Test {
    public doSomething() {
        let self = this;
    }
}
```

Na função `doSomething()` a variavel `self` assume o tipo `Test`. Até aqui nada novo. Agora vamos a outro exemplo:

```typescript
function doSomething() {
    let self = this;
}
```

Na função `doSomething()` acima a variável `self` assume o tipo `any`. Isso por que se trata de uma função isolada, fora de uma classe. O que acontece é que agora com a nova versão do TypeScript podemos definir o tipo de `this` para funções isoladas. Vamos tomar como base a função `doSomething()`. Digamos que queiramos impedir que um desenvolvedor, por engano, tente chamar qualquer método ou atributo de `this` dentro desta função. Para isso vamos reescrever essa função da seguinte forma:

```typescript
function doSomething(this: void) {
    let self = this;
}
```

Agora o tipo de `self` é `void`. Como `void` não poss membros, caso alguem tente chamar qualquer um de seus membros por engano um erro será exibido em tempo de compilação. Utilizamos uma nova notação onde criamos um argumento chamado `this` e definimos seu tipo. Esse argumento precisa ser sempre o primeiro argumento dentro da função e ele não será repassado para o código final servindo apenas para informar ao compilador o tipo que queremos definir para `this`.

Agora vamos a um exemplo mais prático. Veja a seguinte interface:

```typescript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

Note que a função `addClickListener(...)` espera uma outra função como parâmetro que não utilize `this` no seu bloco de código. Se temtarmos passar uma função que viole essa definição teremos um erro:

```typescript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

var uiElement: UIElement = <any>{};

class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        this.info = "message";
    };
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // erro!
```

Veja que dentro da função `onClickBad()` estamos usando `this` normalmente. Mas se tentarmos passar a função `onClickBad` como argumento em `addClickListener(...)`...

```typescript
uiElement.addClickListener(h.onClickBad); // erro!
```

...teremos um erro de compilação.

> NOTA: Para utilizar este recurso precisamos habilitar a chave `--noImplicitThis` bo arquivo `tsconfig.json` ou passando diretamente via linha de comando.

É isso. Até a próxima.

> Reference: TS v2.0 [issues/3694](https://github.com/Microsoft/TypeScript/issues/3694) e [pull/4910](https://github.com/Microsoft/TypeScript/pull/4910)
