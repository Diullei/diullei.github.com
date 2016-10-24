---
layout: post
title: TypeScript 2.0
category: TypeScript
tags : [TypeScript, TypeScript v2.0]
---

Finalmente consegui voltar a ativa depois de algum tempo sem escrever. Hoje vou falar sobre a ultima versão do TypeScript, a versão 2.0. Essa versão é o resultado de muito trabalho e esforço do time do TypeScript e da comunidade.

Para começar a utilizar esta nova versão você pode baixar via npm utilizando o seguinte comando:

> npm install -g typescript@2.0

Pronto! Agora você já está pronto para começar a explorar as novas features!

## Um pouco de história (Acontecimentos principais)

* _TypeScript 0.8_ - Em Outubro de 2012 os desenvolvedores foram surpreendidos com o que muitos chamavam de "O CofeeScript da Microsoft". O TypeScript veio ao mundo e muitos começaram a entender as inúmeras possibilidades de se ter uma linguagem mundialmente popular como o `JavaScript` mesclada a um forte sistema de tipos (que na época nem era tão forte assim rs).

* _DefinitelyTyped_ - Alguns meses depois do lançamento do TypeScript a comunidade começou a se movimentar. Nesta época eu iniciei a construção do [TSD](https://github.com/DefinitelyTyped/tsd) com a intenção de aprender mais sobre TypeScript e ao mesmo tempo criar alguma ferramenta que fosse útil não apenas pra mim, mas para outros desenvolvedores. Conversando em fóruns com outros desenvolvedores entusiastas (que eram poucos na época) eu puder conhecer alguns pessoas que hoje são figuras bastante conhecidas entre os desenvolvedores TypeScript e pudemos juntos montar o time [DefinitelyTyped](https://github.com/DefinitelyTyped).

* _TypeScript 1.0_ - Há alguns anos atrás a versão 1.0 do TypeScript foi disponibilizada e com ela os desenvolvedores puderam entender o potencial do trabalho com JavaScript combinado com um forte sistema de tipagem estática. Alertas de erro em tempo de compilação, editores com recursos de navegação e refatoração, entre outras ferramentas trouxeram para os desenvolvedores um enorme ganho de produtividade.

* _TypeScript 1.1_ - A versão 1.1 trouxe um compilador totalmente reescrito que passou a executar 4x mais rápido que o anterior. Com este novo compilador ganhamos, além da velocidade de compilação, uma grande flexibilidade ma interação com o código para adição de novas features. Uma outra grande mudança foi a migração do código do TypeScript do [Codeplex](https://typescript.codeplex.com/) para o [Github](https://github.com/Microsoft/TypeScript). Essa sem dúvidade potêncializou muito a comunicação com a comunidade permitindo uma maior participação e contrinbuição, seja ajudando a especificar novas fetures, submetendo bugs ou programando diretamente no código do compilador.

* _TypeScript 1.4 e 1.5_ - Essa versão trouxe um grande suporte a features do `ES2015/ES6`. Juntamente com isso passamos a ter suporte a modules e decorators, o que permitiu ao time do `Angular2` adotar o TypeSCript como linguagem oficial. Uma parceria muito produtiva que trouxe ainda muito mais recursos e feedbacks.

* _TypeScript 1.6 e 1.8_ - Com essa versão tivemos muitas melhorias no sistema de tipos do TypeScript. Tivemos a cada release a adição de padrões JavaScript, o que proporcionou um maior suporte a bibliotecas JavaScript existentes. Muitas melhorias no compilador também foram feitas neste período.

* _TypeScript 2.0_ - Finalmente! Agora temos um grande suporte a bibliotecas JavaScript, excelentes ferramentas, um poderoso Language Service e muito mais... vamos falar um pouco sobre as principais novidades.

## Novidades no TypeScript 2.0

Eu já tenho falado a um tempo sobre algumas features planejadas para esta versão. Algumas já haviam sido liberadas para teste em versões beta. Vou tentar mais uma vez destacar as principais features que trouzxeram grandes mudanças para a linguagem:

### Aquisição de definiçoes de tipo (os famosos arquivos .d.ts)

Grandes ferramentas desenvolvidas pela comunidade (e eu tive a oportunidade de desenvolver uma delas) como o [Typings](https://github.com/typings/typings) e o [TSD](https://github.com/DefinitelyTyped/tsd) contribuiram bastante para o ecosistema do TypeScript ajudando milhares de desenvlvedores ao redor do munto a obter arquivos de definição para as mais diversas bibliotecas JavaScript, no entanto, existe um gerenciador de download de pacotes que já se popularizou muito entre os desenvolvedores JavaScript e nada melhor do que utilizar este mesmo gerenciador no ciclo de trabalho com TypeScript, o [npm](https://www.npmjs.com/). Um esforço do time do TypeScript junto com o time do DefinitelyTyped e outros membros da comunidade trouxe ao TypeScript a capacidade de obter tipagens diretamente do npm. Isso ajuda a simplificar e muito o workflow de senvolvimento, já que, já temos uma infinidade de ferramentas diferentes que precisam ser utilizadas. Nada melhor do que tentar simplificar as coisas. O TSD e o Typings ajudaram bastante no passado, mas agora com o npm, a tendência é que o trabalho se torne mais simples e padronizado. Por exemplo, se você quiser baixar o arquivo de definição do `lodash` basta utilizar a seguinte linha de comando:

> npm install --save @types/lodash

Neste [post](/posts/The-Future-of-Declaration-Files) você encontra mais detalhes sobre a aquisição de arquivos de definição direto do npm.

### Tipos não nulos

Uma das maiores causas de bug em software são falhas relacionadas a tipos nulos. É muito comum um desenvolvedor não verificar se as variáveis e/ou parâmetros estão ou não nulos antes de começar a utilizá-los. Para facilitar nossa vida temos agora a adição deste novo recurso. Em JavaScript além do valor `null` temos o `undefined` e estes dois valores se tornam a fonte do mal quando não são bem compreendidos e tratados.

Originalmente no TypeScript todos os tipos eram `nullables`, ou seja, qualquer tupo poderia arssumir um valor nulo. Agora com o novo compilador os valores null e undefined foram separados como tipos diferentes, ou seja, ao utilizar este novo recurso precisamos de forma declarativa definir se uma variável ou argumento terá o valor `null` ou `undefined`. Fazemos isso utilizando o recurso `union types`. Você pode verificar este [post](/posts/TypeScript2-Beta-nun-nullable-types) para entender mais.

### Controle de fluxo por analize de tipos

Este não é um revcurso novo, foi inserido no TypeScript desde a versão 1.8, no entanto com a versão 2.0 este recurso foi expandido e ganhou muito mais poder, principalmente quando este é combinado com tipos `non-nullables`. Exemplo:

```typescript
function f(condition: boolean) {
    let result: number;
    if (condition) {
        result = computeImportantStuff();
    }

    // Ops! 'result' pod nunca ter sido inicializado!
    return result;
}
```

Você pode acessar este [post](/posts/TypeScript-Type-Guards) para saber mais.

### Modificador readonly

Agora podemos definir membros imutaveis em TypeScript de forma muito fácil. Basta declarar as propriedades como `readonly`. Exemplo:

```typescript
class Person {
    readonly name: string;

    constructor(name: string) {
        if (name.length < 1) {
            throw new Error("Empty name!");
        }

        this.name = name;
    }
}

// Erro! 'name' é somente leitura.
new Person("Daniel").name = "Dan";
```

Lindo neh?

Exiastem ainda muitos outros recursos que podem ser conferidos [aqui](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript).

## O que esperar do futuro?

Muita coisa ainda está por vir. O JavaScript é uma das linguagens mais utilizadas no mundo, difícil um programador web hoje em dia não ter escrito ao menos algumas linhas de código em JavaScript. O TypeScript veio para ficar. Novas features virão, novas ferramentas e editores, e quem irá usufruir de tudo isso somos nós desenvolvedores.

Até a próxima!
