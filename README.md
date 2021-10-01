# <a href='https://superchats.io'><img src='./img/superchats.png' height='60' alt='SuperChats' aria-label='superchats.io' /></a>

<b>SuperChats</b> is a freemium library with unique features that control Whatsapp functions.
With Superchats you can build service bots, multiservice chats or any system that uses whatsapp

<b>Superchats</b> is a premium version of <a target="_blank" href='https://github.com/orkestral/venom'>Venom</a>, with exclusive features and support for companies and developers worldwide

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
- <a href="#optional-parameters">Optional Parameters</a>
- <a href="#download-and-save-files">Download and Save Files </a>
- <a href="#message-sending-functions">Message Sending Functions </a>

## Getting Started

```javascript
const superchats = require("superchats");

new superchats.create("Marketing", {
  license: "asjdh-efddff734-sdsdf834-233272",
}).then(async (client) => {
  await client.onMessage(async (message) => {
    if (message.type == "text" && message.content == "hi") {
      await client.sendText("5561981590153", "Thanks for using Superchats!!!");
    }
  });
});
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

## Optional Parameters

Optional parameters are started along with the connection as events of **QRCODE and CONNECTION STATUS**, plus extra options

```javascript
const superchats = require("superchats");

new superchats.create(
  "Marketing",
  {
    license: "asjdh-efddff734-sdsdf834-233272", // Valid license to use Superchats
    welcomeScreen: true, // Show or hide welcome in terminal
    retries: 3, // Number of connection attempts
    connectTest: 10_000, // Number of milliseconds to check internet connection
    logQr: true // Logs QR automatically in terminal
  },
  (base64QR, asciiQR) => {
    console.log("base64 string qrcode: ", base64QR);
    console.log("Terminal image of qrcode in caracter ascii: ", asciiQR);
  },
  (statusSession) => {
    console.log("Status Session: ", statusSession);
  }
).then(async (client) => {
  await client.onMessage(async (message) => {
    if (message.type == "text" && message.content == "hi") {
      await client.sendText("5561981590153", "Thanks for using Superchats!!!");
    }
  });
});
```
## Callback Status Session

Get connection feedback by following codes:

| Status                  | Condition                                                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isLogged`              | When the client already has a valid token and will not need to read the qrcode again                                                                                                              |
| `notLogged`             | When the client does not have a valid token and needs to read the qr code again                           |                                      |
| `isDisconnected`    | The client has disconnected or has been disconnected                                                                                                                           |
| `isLogout`           | The client has disconnected and removed the token from the device                                                                                                                              |
| `isConnected`        | The client has successfully connected list                                                                                                                       |
| `noSync`        | The client lost synchronization with device                                                                                                                       |
| `isSynced`        | The client has sync again                                                                                                               |


## Download and Save Files

Download and save any message file with the functions below

```javascript
client.onMessage( async (message) => {
  if (message.isMedia === true) {

    //retrieve the file buffer for a given message
    const buffer = await client.decryptFile(message);

    // Save the message file in the project's root or in a directory: './diretory/filename' don't forget to create the directory
    const saveFile = await client.decryptFileSave(message, 'filename')
   
  }
});
```

## Message Sending Functions

We created the easiest way to send messages with **Superchats**

</br>

### Send Message Text

```javascript
let response = await client.sendText("5561981590153", "Thanks for using Superchats!!!");
```
##### Return
`
test
`