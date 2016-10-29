---
layout: post
title: Arrays tipados - ES6
category: [JavaScript]
tags : [JavaScript, ES6]
---

Os arrays tipados são parte da especificação do ECMAScript 2015 (também conhecido como ES6). Eles foram projetados para facilitar o trabalho com estruturas de dados binárias. Inicialmente os arrays tipados foram introduzidos pelas APIs WebGL com o objetivo de diminuir a dissonância entre as estruturas de dados padrões do `JavaScript` e as estruturas de dados do `C`, linguagem base da API `WebGL`, e com isso permitir ao JavaScript acessar diretamente a estrutura já alocada em memória.

Você pode acessar este [link](http://caniuse.com/#feat=typedarrays) para saber quais browsers já suportam esse recurso: [http://caniuse.com/#feat=typedarrays](http://caniuse.com/#feat=typedarrays)

## Criando Arrays tipados

Aqui não existe nenhum segredo, criamos um array tipado da mesma forma que criarpiamos qualquer instância de objeto. em JavaScript:

```javascript
var arr = new Uint16Array(10);
arr[0] = 0xFFFF;
console.log(arr[0]);
```

O argumento passado no construtor define o número de elementos que estamos alocando neste array (No exemplo acima estamos alocando 10 elementos do tipo numérico `uint16`, o que de acordo com a especificação deste tipo de array irá alocar 20 bytes de memória).

Veja abaixo uma lista com os tipos de arrays tipados disponíveis:

| Tipo                | Tamanho (byte)   | tipo correspondente em C |
|:--------------------|:----------------:|:----------|
| `Int8Array`         |  1               | int8_t    |
| `Uint8Array`        |  1               | uint8_t   |
| `Uint8ClampedArray` |  1               | uint8_t   |
| `Int16Array`        |  2               | int16_t   |
| `Uint16Array`       |  2               | uint16_t  |
| `Int32Array`        |  4               | int32_t   |
| `Uint32Array`       |  4               | uint32_t  |
| `Float32Array`      |  4               | float     |
| `Float64Array`      |  8               | double    |

## ArrayBuffer e DataView

`ArrayBuffer` e `DataView` são parte da implementação de arrays tipados. Um `ArrayBuffer` básicamente armazena os dados de um array tipado. Por exemplo:

```javascript
var fileArrayBuffer = reader.readAsArrayBuffer(file);
```

Neste código `ArrayBuffer` ira armazenar todos os bytes do arquivo. Como esse arquivo pode estar em encodes diferentes, precisaremos fazer alguma manipulação para ler seu conteúdo. Por exemplo, se este arquivo for do tipo `UTF-8` poderemos associar este `ArrayBuffer` ao tipo `Uint16Array` para ler corretamente seu conteúdo.

```javascript
var arr = new Uint16Array(fileArrayBuffer);
String.fromCharCode(arr[0]); // A
```

Já o `DataView` é um tipo que nos permite acessar estruturas binrias em memória. Exemplo, se tivermos uma estrutura em `C` declarada da seguinte forma:

```c
struct data {
    unsigned int id;
    char[10] username;
}
```

Iremos ler esta estrutura em JavaScript com o código:

```javascript
var buf = new ArrayBuffer(11);
var id = new Uint8Array(buf, 0, 1);
var username = new Uint8Array(buf, 1, 10);
```

Note que se trata de uma leitura sequencial da memória onde o primeiro byte contém o valor de `id` e os outros 10 bytes seguintes o valor de `username`. Aqui estamos utilizando `Uint8Array` como `DataView`.

## Onde esse recurso ja está sendo utilizado?

* **WebGL** - Utiliza typed arrays em buffer, pixels e mapas de testuras
* **Canvas** - Canvas utiliza um arrau tipado para armazenar uma imagem.

```javascript
var uint8ClampedArray = ctx.getImageData(...).data;
```

* **WebSockets** - Uma vez habilitado permite a transferência de dados utilizando um `ArrayBuffer`.

```javascript
webSocket.binaryType = 'arraybuffer';
```

* **Outras APIs** - _File API_, _XMLHttpRequest,_ _Fetch API_, `window.postMessage()` entre outros.

## Conclusão

Iremos utilizar os Arrays typados em trechos de código muito específicos onde a performance com a manipulação de estruturas de dados mais complexas for importante, como por exemplo a manipulação de imagens e de som.

É isso, até a próxima.
