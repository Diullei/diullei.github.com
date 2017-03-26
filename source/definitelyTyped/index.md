---
title: DefinitelyTyped
date: 2017-03-23 19:58:52
---

> The repository for high quality TypeScript type definitions

| Website                                                  | Organização                                            | Repositório                                                           |
|----------------------------------------------------------|:------------------------------------------------------:|----------------------------------------------------------------------:|
| [http://definitelytyped.org](http://definitelytyped.org) |  [DefinitelyTyped](https://github.com/DefinitelyTyped) | [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) |

O DefintelyTyped é um repositório no Github onde desenvolvedores do mundo inteiro compartilham e ajudam a manter a maior base de arquivos de definição de tipos (TypeScript typings) para as mais diversas bibliotecas javascript. Esse material serve de apoio para inúmeros desenvolvedores no mundo inteiro e podemos dizer que é praticamente impossível desenvolver algum projeto em TypeScript sem a utilização desses arquivos.

### Status atual

| Stars     | JavaScript Libraries  | Contributors  |
|-----------|:---------------------:|--------------:|
| ~10.105   | ~2.990                | ~3.515        |

### História

Este repositório é tão antigo quanto a propria linguagem que ele representa. No meado de 2012, quanto o mundo começou a ouvir sobre a nova linguagem da Microsoft não era muito fácil encontrar os famosos typings. A própria Microsoft havia liberado alguns (para o NodeJS e jQuery no que eu me lembro) e alguns outros desenvolvedores isolados estavam escrevendo suas próprias tipagens. Nesse período eu tive a ideia de montar um [repositório](https://github.com/diullei/typescript-d) no Github para agrupar o máximo de tipagens possíveis e ao mesmo tempo comecei a desenvolver o [TSD](/tsd/). Acompanhando o fórum do TypeScript no antigo CodePlex eu fiquei sabendo de um outro desenvolvedor (Boris Yankov) que estava desenvolvedo um [repositório similar](https://typescript.codeplex.com/discussions/398150) o DefinitelyTyped. 

Como eu já estava trabalhando no TSD eu resolvi submeter as tipagens que eu estava escrevendo para o DefinitelyTyped e assim eu fui agregado como colaborador passando a apoiar na manutenção deste repositório. Não demorou muito e esse projeto começou a ficar bastante conhecido. Muito desenvolvedores começaram a nos apoiar nos enviando suas tipagens e nos ajudando a manter as que possuíamos. Com o crescimento do repositório fomos aumentando o time e criando outros projetos ao redor do DefinitelyTyped. 

Com o objetivo de centralizar os projetos e ao mesmo facilitar a gestão de toda a equipe, em um concenso comum, eu criei a organização de mesmo nome: [DefinitelyTyped](https://github.com/DefinitelyTyped) no Github.

### Equipe

O projeto cresceu bastante. Temos atualmente na organização um time com 36 pessoas, incluindo 21 desenvolvedores do próprio time do TypeScript. A maior atividade (também o maior desafio) neste repositório se resume a revisão e aceitação/integração das contribuições. O legal foi que o próprio time do TypeScript abraçou o projeto e hoje tem nos ajudado a manter e a evoluir este repositório em paralelo com a própria linguagem.

O DefinitelyTyped pode ser considerado hoje como um projeto vital no ciclo de desenvolvimento de qualquer projeto TypeScript. O interessante é que mesmo desenvolvedores JavaScript, utilizando a IDE correta, podem se beneficiar deste projeto ganhando toda uma gama de ferramentas de apoio como auto-complete, validação de tipos entre outros.

## Ecosistema

Alguns projetos existem em função do DefinitelyTyped. Segue abaixo uma relação dos principais:

* [**TSD**](/tsd/) - Um gerenciador de denpendêcias que permite o download de tipagens diretamente do repositório DefinitelyTyped.
* [**typings**](https://github.com/typings/typings) - Sucessor do `TSD`. Ferramenta para gerenciamento de dependencias que permite o download de tipagens diretamente do repositório DefinitelyTyped.
* [**NugetAutomation**](https://github.com/DefinitelyTyped/NugetAutomation) - Este projeto foi construido par enviar para o [Nuget](https://www.nuget.org/profiles/DefinitelyTyped) todas as atualizações de tipagens enviadas para o DefinitelyTyped.
* [**Build tester**](https://github.com/DefinitelyTyped/definition-tester) - Projeto criado para ajudar na automatização de testes para contribuições recebidas no repositório.
* [**Review bot**](https://github.com/DefinitelyTyped/dt-review-bot) - Ferramenta de revisão. Tem com função principal notificar os autores das tipagens sempre que uma contribuição é submetida.
* [**Badges**](https://github.com/DefinitelyTyped/badges) - Badges para ser colocado em projetos que possuem tipagens no DefinitelyTyped.
* [**@types**](https://www.npmjs.com/~types) - Com o objetivo de tornar o `npm` o canal principal de aquisição dos typings, o time da Microsoft criou o `@types` no npm. 

## Reconhecimento

Estamos sempre sendo citados em fóruns, blogs e conferências ao redor do mundo. Segue abaixo alguns recortes notótios:

---
#### Build 2016
What's New in TypeScript? - by Anders Hejlsberg
https://channel9.msdn.com/events/Build/2016/B881

![](/definitelyTyped/images/img2.png)

---
#### Build 2014
Building a Large Scale JavaScript Application in TypeScript - by Erich Gamma
https://channel9.msdn.com/Events/Build/2014/3-583

![](/definitelyTyped/images/img1.png)

---
#### Somasegar 
VP corporativo da divisão de desenvolvedores da Microsoft em 2014

> "... Mas o que realmente se destacou para mim foi quando vimos o repositório do `DefinitelyTyped` sendo lançado pouco tempo depois que lançamos o TypeScript. Esta era uma comunidade de código aberto criada contendo uma coleção de bibliotecas TypeScript, o que torna ainda mais valioso nosso produto e o aproxima a um conjunto mais amplo de desenvolvedores ..."

Acesse [aqui](http://ns1.linuxmag.com.br/lm/noticia/vp_de_desenvolvedores_da_microsoft_discute_ecossistmas_livres_e_proprietari) para ver a entrevista de Somasegar na integra.

---
### Meus posts relacionados

* [DefinitelyTyped + TypeScript team = TS FTW](/2016/07/11/DefinitelyTyped-and-TypeScript-Team/)
* [TypeScript e o futuro dos arquivos de declaração](/2016/07/09/The-Future-of-Declaration-Files/)