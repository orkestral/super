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
  - <a href="#send-message-text">Send Text </a>
  - <a href="#send-message-image">Send Image </a>
  - <a href="#send-message-video">Send Video </a>
  - <a href="#send-message-audio">Send Audio </a>
  - <a href="#send-message-voice">Send Voice </a>
  - <a href="#send-message-document">Send Document </a>
  - <a href="#send-message-contact">Send Contact </a>
  - <a href="#send-message-link">Send Link </a>
  

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

> Sending messages can be sent to the contact's number, example: **5561981590153** or to a group ID, example: **15815954040-1631239154**

### Send Message Text

```javascript
let response = await client.sendText("5561981590153", "Thanks for using Superchats!!!");

```

> To reply to a message, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendText("5561981590153", "Reply Message!!!", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'text',
  id: '3EB01A690E67',
  to: '556181590153',
  content: 'Thanks for using Superchats!!!',
  isgroup: false,
  timestamp: 1633101992
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'text',
  message: 'message of erro'
}
```
### Send Message Image

> For image submission, you can use URL or the local file path

```javascript
let response = await client.sendImage("5561981590153", "https://github.com/orkestral/superchats/raw/main/img/superchats.png", "Text optional");

```

> To reply to a message with image, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendImage("5561981590153", "https://github.com/orkestral/superchats/raw/main/img/superchats.png", "Reply with image", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'image',
  id: '3EB0FF4E2532',
  to: '556181590153',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/AmkmMjj4ZqieB6bDxS-Trox10ldAe5aIUZ5uQLutyKL8.enc',
    caption: 'Text optional',
    mimetype: 'image/jpeg',
    fileSha256: <Buffer 11 ed 0d 21 f2 59 96 9a 65 cf 7e fa c1 57 a1 ee a2 c9 50 b4 0d 09 df df a8 9f e1 44 dd cf a6 a5>,
    fileLength: Long { low: 15183, high: 0, unsigned: true },
    height: 0,
    width: 0,
    mediaKey: <Buffer 17 0e ba 4b e6 81 69 eb 2b 30 28 59 5f a1 f4 42 7d fa 18 61 8a de 74 28 09 fc 92 79 7e 3d cc d4>,
    fileEncSha256: <Buffer fe 62 a7 a4 d9 c3 ca 84 44 51 26 08 4c 7f fe 0a b1 13 f0 ad b9 9a ba 7e de a4 83 35 07 b0 5a 3e>,
    directPath: '',
    thumbnail: <Buffer >
  },
  participant: '',
  timestamp: 1633106913
}

```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'image',
  message: 'message of erro'
}
```
### Send Message Video
> For video submission, you can use URL or the local file path

```javascript
let response = await client.sendVideo("5561981590153", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", "Text optional");

```

> To reply to a message with video, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendVideo("5561981590153", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", "Reply with video", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'video',
  id: '3EB0612BED9B',
  to: '556181590153',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/AnrExTInFHkr446WcJoVnbHhhb1Tdmg8ort6g1SweEvS.enc',
    caption: 'Text optional',
    mimetype: 'video/mp4',
    fileSha256: <Buffer 75 de 47 ac c8 b9 b5 c6 ef 56 56 6e eb 50 72 af c3 bd e0 a4 ff 4f f4 09 62 a4 b5 33 c1 26 db 46>,
    fileLength: Long { low: 2252313, high: 0, unsigned: true },
    mediaKey: <Buffer f7 91 19 c6 62 30 93 cc cb 83 b0 5a 20 f7 1c 5b 62 a6 36 fc 93 53 87 df 14 69 a6 14 db 9c ff 5e>,
    fileEncSha256: <Buffer 49 d9 c9 e4 61 96 36 fc 7e ae 83 a4 da a1 70 5e d2 d5 f4 f1 74 15 52 26 84 8f f1 cb f4 54 82 3f>,
    directPath: '',
    thumbnail: <Buffer >
  },
  participant: '',
  timestamp: 1633108332
}

```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'video',
  message: 'message of erro'
}
```