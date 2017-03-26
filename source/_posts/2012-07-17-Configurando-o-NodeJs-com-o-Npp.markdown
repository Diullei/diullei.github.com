---
layout: post
title: Configurando o Nodejs com o Notepad++
category: NodeJs
tags : [NodeJs, Notepad++]
---

O note pad++ é na minha opinião um excelente editor. É claro, com o Sublime Text 2 na área muita gente deixou de olhar para p Np++ :). Minha dica de hoje é mostrar como configurar o Np++ para executar arquivos javascript usando o nodeJs.

###NodeJs

Caso você não possua o nodejs instalado na sua máquina vá até o site http://www.nodejs.org/ e faça o download. A instalação é bem simples e você encontra no site toda orientação necessária.

###Configurando o NotePad++ com o NodeJs

Primeiro de tudo será necessário instalalar o plugin **NppExec**. Vá até o menu **Plugins->Plugin Manager->Show Plugin Manager**.

![Valid XHTML](/images/npp_node/menu.png)

Na aba Avaliable selecione **NppExec** e clique em install. Feito isso reinicie o npp++.

![Valid XHTML](/images/npp_node/install.png)

Feito isso vamos configurar o NppExec.

Acesse o menu **Plugins->NppExec** e selecione **Follow $(CURRENT_DIRECTORY)**.

![Valid XHTML](/images/npp_node/current_dir.png)

Em seguida acesse o menu **PLugins->NppExec->Execute...**. Na janela que vai aparecer digite:

```javascript
cd "$(CURRENT_DIRECTORY)"
node $(FILE_NAME)
```

Clique no botão **Save** e na janela que se abre de o nome "Run" e clique em **Save**. Em seguida basta dar ok.

![Valid XHTML](/images/npp_node/execute.png)

Agora vamos configurar um atalho. Vá no menu **Plugins->NppExec->Advanced Options**

![Valid XHTML](/images/npp_node/advanced_options.png)

Selecione o checkbox **Place to the Macros submenu**. Selecione **Run** na combo **Associated script** e dê o nome **Run Nodejs** no campo **Item name**. Em seguida clique no botão **Add/Modify button**. Clique no botão Ok e reinicie o Np++.

Vá no menu **Settings->Short Mapper**...

![Valid XHTML](/posts/img/npp_node/advanced_options2.png)

Selecione **Plugin commands** e localize **Run NodeJs** na lista de nomes. Clique no botão **Modify** e e configure a janela seguinte conforme a imagem abaixo:

![Valid XHTML](/images/npp_node/shortcut.png)

Clique em Ok e pronto!

Note que no menu **Macro** irá aparecer o atalho que acabamos de criar.

![Valid XHTML](/images/npp_node/menu2.png)

##Testando

Crie um novo arquivo e escreva o seguinte código:

```javascript
console.log('np++ test!!!');
```

Salve o arquivo e tecle o atalho Ctrl+F5.

Se tudo tiver sido configurado corretamente você terá algo como na imagem abaixo:

![Valid XHTML](/images/npp_node/fim.png)

OBS.: O arquivo precisa estar salvo para você conseguir executa-lo.

Espero que esta dica seja útil.

Até!
