---
layout: post
title: jQuery - 10 dicas de performance
category: [JavaScript, jQuery]
tags : [JavaScript, jQuery]
---

Os anos se passaram e o jQuery continua relevante em pleno 2016. A facilidade de manipulação e a infinidade de artigos na internet ajuda a reforçar a utilização do jQuery e a manter essa biblioteca viva. De fato, poucos anos atrás, escrever codigo compatível com diferentes versões de navegadores seria um trabalho muito árduo se não fosse pelo nosso amigo jQuery.

O grande problema com o jQuery é que muitos desenvolvedores ignoram as boas práticas e escrevem codigo muito pobres em performance (isso sem falar sobre design de código).

## Por que performance é importante?

Vou expor duas boas razões:

* Uma boa performance pode trazer uma boa experiência de uso. Nem sempre seus visitanes vão lhe dizer que seu site está lento, eles simplesmente não vão voltar a acessar o site.
* O Google leva a performance em consideração para a classificação do seu site no PageRank.

Então, vamos aos pontos...

## 1. Use a versão mais atual do jQuery sempre que possível

As novas versões sempre trazem melhorias de performance e atualizações de segurança.

## 2. Utilize os seletores da forma correta

Cada seletor possui uma performance diferente. Organizando do mais rápido para o mais lento temos:

* Seleção por ID - `$('#element-id')`
* Seleção por Elemento - `$('form')`
* Seleção por Classe - `$('.some-class')`
* Seleção por Pseudo Atributo - `$('[data-attr]'), $(':hidden')`

## 3. O algoritmo de seleção do jQuery funciona da esquerda para a direita

Isso significa que o lado direto da query de busca precisa ser o mais específico possivel. Neste caso, queries muito longas acabam não fazendo muito sentido e podem ser evitadas. Exemplo:

> Ruim

    $('div.page div.block .element')

> Bom

    $('.page div.element')

> Sempre que possível utilize _tag + class_

## 4. Quebre sua query em blocos sempre que possível

Seguindo o conceito do item (3) considere os seguintes códigos:

> Ruim

    $('#container .element')

> Bom

    $('#container').find('.element')

Lembre-se que a busca é sempre feita da direita para a esquerda e por isso, no primeiro exemplo o jQuery irá primeiro buscar por todos os elementos com a classe `element` e depois filtrar todos os elementos que contenham o id `container`.

Uma outra sintaxe similar ao método `find(...)` é:

    $('.element', '#container')

## 5. Faça sempre um cache dos seus seletores

Este item é muito simular ao anterior. Os exemplos de código abaixo falam por sí só:

> Ruim

    var block = $('.block');
    var elements = $('.block').find('.element');
    var title = $('.block').data('title');

> Bom

    var block = $('.block');
    var elements = block.find('.element');
    var title = block.data('title');

## 6. Evite a manipulação pesada do DOM

Você pode se surpreender com a quantidade de elementos que é possível manipular utilizando JavaScript. No entanto, se estes elementos estiverem ligados ao DOM essa surpreza será ruim. Manipular elementos no DOM é uma operação muito lenta e quanto mais elementos você precise manipular, pior será a performance.

A melhor forma de fazer isso utilizando jQuery é primiro "desacoplar" esses elementos no DOM, manipular e depois retorná-los ao DOM. Exemplo:

    var elem = $('.element');
    var parent = elem.parent();
    elem.detach();
    ... operações muito pesadas, ordenação de tabelas por exemplo ...
    parent.append(elem);

## 7. Evite "appends" desnecessários

Ao invés de ficar utilizando o método `append(...)` pra cada elemento que estiver adicionando, procure sempre montar uma string HTML e utiliar o `append(...)` de uma só vez.

## 8. Prefira utilizar data() no lugar de attr()

O método `attr(...)` escreve os atributos direto no DOM, e como falamos no item (6), qualquer manipulação direta do DOM deve ser evitada sempre que possível por questões de performance.

> NOTA: a utilização de `data(...)` embora preferível pelas questões citadas, deve ser verificada com cautela. Se voce estiver utilizando uma biblioteca de terceiros que esteja manipulando os atributos direto no DOM você poderá ter problemas.

## 9. Verifique se o elemento realmente existe antes de usá-lo

> Ruim

    $('.element').slideDown();
    // esse ponto executa uma chamada pesada que efetua vários
    // cálculos mesmo se o elemento não existir

> Bom

    var element = $('.element');
    if (element.length) {
        element.slideDown();
    }

Verificar se o elemento existe antes de efetuar algumas operações evita que alguns algoritmos sejam executados desnecessáriamente.

## 10. Evite a utilização de loops

> Ruim

    $('.element').each(function() {
        $(this).something().somethingElse();
    });

> Bom

    $('.element').something().somethingElse();

A API do jQuery nos permite executar muitas operações em grupo baseado no resultado da query. Utilize as operações em grupo sempre que possível.

## Conclusão

jQuery é sem dúvida uma das bibliotecas javascript mais utilizadas e dificilmente perderá esse ranking. Por isso, vale a pena entender melhor como esta biblioteca funciona para utiliza-la da maneira mais correta possível.

Até a próxima!
