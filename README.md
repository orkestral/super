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
- <a href="#multiples-sessions">Multiples Sessions</a>


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
## Multiples Sessions

After executing create() function, **Superchats** will create an instance of whatsapp. If you are not logged in, it will print a QR code in the terminal. Scan it with your phone and you are ready to go!
**Superchats** will remember the session so there is no need to authenticate everytime.
Multiples sessions can be created at the same time by pasing a session name to create() function:

```javascript
// Init sales whatsapp bot
new superchats.create('sales').then((salesClient) => {...});

// Init support whatsapp bot
new superchats.create('support').then((supportClient) => {...});
```

These events are started along with the connection and listen for events like: **QRCODE, CONNECTION STATUS**