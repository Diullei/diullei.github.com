---
layout: post
title: TypeScript - Union Types
category: [TypeScript, TypeScript v1.4]
tags : [TypeScript, JavaScript]
---

Uma das caracteristicas do JavaScript é que podemos facilmente alterar o tipo de uma variável em tempo de execução simplesmente atribuindo um valor de tipo diferente a esta variável. No momento em que o valor é atribuido o tipo desta variável se altera e a partir daí inúmeros bugs podem surgir se não estivermos atentos.

Em Typecript quando declaramos uma variável com um tipo específico, `string` por exemplo, ela carregará este tipo até o fim, ou seja, em nenhum momento será permitida a atribuição de um valor de tipo diferente nesta variável.

    let val: string;
    // Erro! val só pode receber um valor do tipo string
    val = false;

O que ocorre é que em JavaScript ocasionalmente teremos variáveis ou parâmetros que irão esperar receber em momentos diferentes, valores de tipos diferentes. Prevendo esse comportamente o TypeScript definiu um tipo chamado `any`. Esse tipo aceita qualquer valor de qualquer tipo. O problema aqui é que nem sempre declarar uma variável como `any` resolverá nosso problema. Pra que isso fique bem claro vamos a um exemplo:

```typescript
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // retorna "    Hello world"
```

Note que no código acima o parâmetro `padding` está sendo declarado como `any`. O que não impede que que passemos um valor diferente de `string` ou `number` como por exemplo o valor `true`. O código acima compila normalmente sem nenhum erro mas falha no momento da execução.

    // compila sem erros mas falha no momento da execução
    let indentedString = padLeft("Hello world", true);

Para contornar esse problema o TypeScript possui uma classe especial de declaração de tipos chamado de "union types" que permite definir no momento da escrita do código quais os valores que serão aceitos pelo parâmetro ou pela variável. Com isso podemos dizer no código acima que queremos que `padding` seja um parâmetros de tipo menos permissivo e aceite apenas valores do tipo `string` ou `number`. Para isso alteramos a assinatura do tipo de `any` para `string | number`. Vamos alterar a assinatura da função `padLeft` para demonstrar esse recurso:

```typescript
function padLeft(value: string, padding: string | number) {
    //...
}

// erro durante a compilação
let indentedString = padLeft("Hello world", true);
```

Agora temos uma falha no momento da compilação do código. O que aconteceu? O compilador do TypeScript entendeu que `padding` pode assumir apenas um valor `string` ou `number`.

Veja como esse recurso nos ajuda a proteger o código de possíveis erros que passariam despercebidos.

É isso. Até a próxima!

> Spec: TS v1.4 [https://github.com/Microsoft/TypeScript/pull/824](https://github.com/Microsoft/TypeScript/pull/824)
