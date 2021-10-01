# <a href='https://superchats.io'><img src='./img/superchats.png' height='60' alt='SuperChats' aria-label='superchats.io' /></a>

<b>SuperChats</b> is a freemium library with unique features that control Whatsapp functions.
With Superchats you can build service bots, multiservice chats or any system that uses whatsapp

<b>Superchats</b> is a premium version of <a href='https://github.com/orkestral/venom'>Venom</a>, with exclusive features and support for companies and developers worldwide

## Quickstart

Run the following command to ensure you have SuperChats installed:

```bash
$ npm install superchats
```
or using yarn:

```bash
$ yarn add superchats
```

## Documentations

- <a href="#getting-started">Getting Started</a>


## Getting Started

```javascript

const superchats = require('superchats');

new superchats.create('Marketing',{
  license: 'asjdh-efddff734-sdsdf834-233272',
}).then(async client => {

   await client.onMessage(async message => {
     if(message.type == 'text' && message.content == 'hi'){
     await client.sendText('5561981590153', 'Thanks for using Superchats!!!')
     }
    
   })

})


```
