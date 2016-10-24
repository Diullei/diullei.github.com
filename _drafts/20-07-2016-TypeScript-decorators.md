---
layout: post
title: TypeScript - Decorators
category: [TypeScript, TypeScript v1.5]
tags : [TypeScript, JavaScript]
---

Fala pessoal! Hoje vou falar sobre uma feature muito legal `decorators`. Utilizamos decorators para inserir metadados e comportamentos em uma declaração de classe, propriedade, métodos ou parâmetro de uma métodos. Trata-se de uma função com uma assunatura específica (de acordo com o target). Para utilizar um decorator precisamos utilizar o simbolo `@` junto com o nome do decorator antes do membro do código que estivermos decorando. Exemplo:

```typescript
class MyClass {
    @log
    doSomething(arg) {
        //...
    }
}
```

> NOTA: para utilizar esse recurso é necessário configurar a propriedade `experimentalDecorators` no arquivo `tsconfig.json`. Para compilar o arquivo via linha de comando utilize: `tsc myFile.ts –target ES5  –emitDecoratorMetadata`.

## Pontos importantes

* Os decorators são sempre chamados quando uma classe é declarada e não quando um objeto é instanciado.
* Multiplos decorators podem ser declarados para um mesmo target.
* não é permitida a utilização de decorators em construtores.
* Os decorators podem ser do tipo: `ClassDecorator`, `PropertyDecorator`, `MethodDecorator` ou `ParameterDecorator`.

## Decorators em Métodos

Para definir um decorator para um étido precisamos criar uma função com os seguintes parâmetros:
* `target` - Protótipo da classe que possui o método.
* `propertyKey` - Nome do método em que estamos aplicando o decorator. Pode ser um `string` ou um [`Symbol`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
* `descriptor` - Uma instância da insterface [`TypedPropertyDescriptor`](https://github.com/Microsoft/TypeScript/blob/727b9a9ceb37c77ba5b69c452cc118a8913d9cf2/src/lib/core.d.ts#L1241)

No primeiro exemplo eu utilizei um decorator chamado `@log`. Vamos ver uma possível implementação deste decorator:

```typescript
function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let originalMethod = descriptor.value; // salvando uma referência para o método original

    // NOTE: não use arrou fynction. Utilize uma declaração normal de função para que o contexto `this` seja interpretado corretamente.
    descriptor.value = function(...args: any[]) {
        console.log("Argumentos da chamada: " + JSON.stringify(args));
        let result = originalMethod.apply(this, args);               // Executa a função e armazena o resultado
        console.log("Valor de retorno: " + result);               
        return result;                                               // retorna o resultado
    };

    return descriptor;
}
```

Chamando a função:

```typescript
class MyClass {
    @log
    doSomething(arg) {
        return "Message -- " + arg;
    }
}

new MyClass().doSomething("test");
// => Argumentos da chamada: ["test"]
// => Valor de retorno: Message -- test
```

Agora que vimos como uma declaração simples de decorator funciona vamos entender como declarar decorators que esperam parâmetros. Para isso precisamos declarar uma função com a assinatura de parâmetros desejado e retornar uma outra função com a mesma assinatura do exemplo anterior. Veja o seguinte código:

```typescript
function log(showArgs: boolean) {
    return function(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let originalMethod = descriptor.value; // salvando uma referência para o método original

        // NOTE: não use arrou fynction. Utilize uma declaração normal de função para que o contexto `this` seja interpretado corretamente.
        descriptor.value = function(...args: any[]) {
            if (showArgs) {
                console.log("Argumentos da chamada: " + JSON.stringify(args));
            }
            let result = originalMethod.apply(this, args);               // Executa a função e armazena o resultado
            console.log("Valor de retorno: " + result);               
            return result;                                               // retorna o resultado
        };

        return descriptor;
    }
}
```

Mais uma vez vamos chamar a função:

```typescript
class MyClass {
    @log(false)
    doSomething(arg) {
        return "Message -- " + arg;
    }
}

new MyClass().doSomething("test");
// => Valor de retorno: Message -- test
```

> NOTA: sempre que utilizarmos uma decorator em uma função estática o target será a propria função ou invés do protótipo da classe.

## Decorators em Classes

A assinatura da função que define um decorator para uma classe possui apenas o parâmetro `target`.

```typescript
const __myClassDecoratorMetaData: any = {};

function MyClassDecorator(value: string) {
  return function (target: Function) {
      __myClassDecoratorMetaData[target] = value;
  }
}

@MyClassDecorator(“my metadata”)
class MyClass { }

var myClass = new MyClass();
let value: string = __myClassDecoratorMetaData[myClass.constructor];
console.log(value); //=> my metadata
```

## Decorators em propriedades

A assinatura da função que define um decorator em uma propiedade possui apenas os parâmetros `target` e `propertyKey`.


## Decorators em parâmetros

target: The prototype of the class (Function—it seems Function doesn't work anymore. You should use any or Object here now in order to use the decorator within any class. Or specify the class type(s) you want to restrict it to)
propertyKey: The name of the method (string | symbol).
parameterIndex: The index of parameter in the list of the function's parameters (number).
