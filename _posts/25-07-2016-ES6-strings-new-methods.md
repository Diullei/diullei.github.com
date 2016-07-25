---
layout: post
title: ES6 - strings - Novos métodos
category: [TypeScript, ES6]
tags : [TypeScript, JavaScript, ES6]
---

O ES6 trouxe várias features legais para manipulação de strings. Hoje quero falar sobre 4 funções: `startsWith`, `endsWith`, `includes` e `repeat`.

Se você já precisou verificar o inicio ou final de um texto para validar se o mesmo inicia com algum padrão pré estabelecido você certamente já precisou escrever algum código utilizando a função `indexOf`. Exemplo:

```javascript
var list = ['iPhone 5', 'Moto X2', 'iPad 2', 'iPhone 6'];


var iphones = list.filter(function(x) {
    // verifica se o texto inicia com "iPhone"
    // esse trecho de código não é nada legível
    return x.indexOf('iPhone') === 0;
});

iphones.forEach(function(x) {
    console.log(x);
});
// => iPhone 5
// => iPhone 6
```

Note que foi necessário utilizar a função `indexOf`. Essa função retorna o número correspondente ao caracter no texto (iniciando com zero) que inicia com o padrão passado como parâmetro. No nosso caso "iPhone". Caso o padrão não seja encontrado a função retorna o valor -1.

O que algumas pessoas fazem é adicionar "na força" um método novo ao objeto `string` para que o código fique mais legíveil:

```javascript
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
```

Com isso podemos reescrever o código do nosso primeiro exemplo da seguinte forma:

```javascript
var list = ['iPhone 5', 'Moto X2', 'iPad 2', 'iPhone 6'];

var iphones = list.filter(function(x) {
    return x.startsWith('iPhone');
});

iphones.forEach(function(x) {
    console.log(x);
});
// => iPhone 5
// => iPhone 6
```

Repare que com a utilizção do método "startsWith" o código ficou mais intuitivo do que o anterior.

## ES6 - Novas funções

Com a chegada do ES6 não precisamos mais fazer essas manobras. Segue abaixo a descrição de algumas funções que foram adicionadas ao javascript:

### startsWith(...)

Isso mesmo, a função que acabamos de ver nos exemplos anteriores!

```javascript
'hello'.startsWith('hell');
//=> true
```

### endsWith(...)

Similar a função `startsWith` só que esta verifica se o texto termina com o padrão informado:

```javascript
'hello'.endsWith('ello');
//=> true
```

### includes(...)

Utilizamos esta função para identificar se um texto contem um outro texto:

```javascript
'hello'.includes('ell');
//=> true
```

> No caso acima o texto "hello" contem uma ocorrencia do outro texto "ell"

### repeat(...)

Utilizamos o `repeat` para repetir um texto `n` vezes:

```javascript
'blah '.repeat(3);
//=> "blah blah blah "
```

Existem ainda outras funções no objeto `string`. Irei apresenta-las num próximo post. Até a próxima!
