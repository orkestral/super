# <a href='https://github.com/orkestral/superchats/'><img src='./img/superchats.png' height='60' alt='SuperChats' aria-label='https://github.com/orkestral/superchats/' /></a>
 <a href='https://github.com/orkestral/superchats/'>
Access SuperChats git and leave your star</a> <br>  <br>
<b>SuperChats</b> is a premium library with unique features that control Whatsapp functions with socket.
With Superchats you can build service bots, multiservice chats or any system that uses Whatsapp

<b>Superchats</b> is a premium version of <a target="_blank" href='https://github.com/orkestral/venom'>Venom</a>, with exclusive features and support for companies and developers worldwide

## Buy a license

The value of the license is $30 monthly dollars, to acquire contact in whatsapp by clicking on the image below !!

<a target="_blank" href="https://web.whatsapp.com/send?phone=556181590153&text=I%20want%20to%20buy%201%20license" target="_blank"><img title="whatzapp" height="100" width="375" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/WhatsApp_logo.svg/2000px-WhatsApp_logo.svg.png"></a>


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
- <a href="#disconnect-functions">Disconnect Functions </a>
- <a href="#message-sending-functions">Message Sending Functions </a>
  - <a href="#send-message-text">Send Text </a>
  - <a href="#send-message-image">Send Image </a>
  - <a href="#send-message-sticker">Send Sticker </a>
  - <a href="#send-message-video">Send Video </a>
  - <a href="#send-message-audio">Send Audio </a>
  - <a href="#send-message-audio-voice">Send Voice </a>
  - <a href="#send-message-document">Send Document </a>
  - <a href="#send-message-location">Send Location </a>
  - <a href="#send-message-contact">Send Contact </a>
  - <a href="#send-message-link">Send Link </a>
  - <a href="#send-message-buttons">Send Buttons </a>
  - <a href="#send-message-list">Send List </a>
- <a href="#get-all-contacts">Get All Contacts </a>
- <a href="#delete-message">Delete Message </a>
- <a href="#forwarding-message">Forwarding Message </a>
- <a href="#mute-chat">Mute Chat </a>
- <a href="#get-chats">Get Chats </a>
- <a href="#read-chat-messages">Read Chat Messages</a>
- <a href="#get-block-list">Get Block List </a>
- <a href="#archive-chat">Archive Chat </a>
- <a href="#delete-chat">Delete Chat </a>
- <a href="#pin-chat">Pin Chat </a>
- <a href="#block-contact">Block Contact </a>
- <a href="#get-profile-status">Get Profile Status </a>
- <a href="#get-picture">Get Picture </a>
- <a href="#set-picture">Set Picture </a>
- <a href="#get-number-profile">Get Number Profile </a>
- <a href="#groups-functions">Groups Functions </a>
  - <a href="#create-group">Create Group</a>
  - <a href="#add-participants-group">Add Participants Group</a>
  - <a href="#add=admins-group">Add Admins Group</a>
  - <a href="#change-name-of-group">Change Name of Group</a>
  - <a href="#change-name-of-group">Change Description of Group</a>
  - <a href="#join-group">Join Group</a>
  - <a href="#leave-group">Leave Group</a>
  - <a href="#get-group-link">Get Group Link</a>
  - <a href="#revoke-group-link">Revoke Group Link</a>
  - <a href="#info-group">Info Group</a>
  - <a href="#set-group-settings">Set Group Settings</a>
  - <a href="#get-groups-list">Get Groups List</a>
- <a href="#get-battery-level">Get Battery Level</a>
- <a href="#get-host-device">Get Host Device</a>
- <a href="#chat-messages-functions">Chat Messages Functions</a>
- <a href="#update-presence">Update Presence</a>
- <a href="#send-messages-for-status">Send Messages for Status</a>
- <a href="#observation-events">Observation Events</a>

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
const superchats = require("super-chats");

new superchats.create(
  "Marketing",
  {
    license: "asjdh-efddff734-sdsdf834-233272", // Valid license to use Superchats
    welcomeScreen: true, // Show or hide welcome in terminal
    retries: 3, // Number of connection attempts
    connectTest: 10_000, // Number of milliseconds to check internet connection
    logQr: true // Logs QR automatically in terminal
  },
  (base64QR, asciiQR, urlCode) => {
    console.log("base64 image of qrcode: ", base64QR);
    console.log("Terminal image of qrcode in caracter ascii: ", asciiQR);
    console.log("Terminal string hash of qrcode: ", urlCode);
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

##### Return of decryptFile
```javascript
{
    session: 'Marketing',
    status: 200,
    type: "decrypt-by-id-file",
    buffer: {
      type: "Buffer",
      data: [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68]
    }
}
```
##### Return of decryptFileSave
```javascript
{
    session: 'Marketing',
    status: 404,
    type: "decrypt-by-id-file-save",
    response: "./files/teste4.mp4"
}
```
## Disconnect Functions

> Disconnect Functions

```javascript
   client.close()
```
```javascript
   client.logout()
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

### Send Message Sticker

> For image sticker submission, you can use URL or the local file path

```javascript
let response = await client.sendSticker("5561981590153", "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png");

```

> To reply to a message with image sticker, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendSticker("5561981590153", "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'sticker',
  id: '3EB07B2F281B',
  to: '556181590153',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/Ak39fUdprDRnKalZbWWyepoMbvNBlEOgIqZzY7GLEBil.enc',
    mimetype: 'image/webp',
    fileSha256: <Buffer ac b2 5f f4 af a4 2e 6d 9e 15 4a e7 58 c0 b3 0f df b6 0b 3f 27 cb 6c d9 55 dd 90 7f e8 92 b8 f7>,
    fileLength: Long { low: 23001, high: 0, unsigned: true },
    mediaKey: <Buffer 6e 96 87 f9 90 1e f5 ae cb 8a c6 9d 95 92 86 ca d3 1a 2a e1 d6 f1 1f f6 5e c3 56 1f 8f 14 1b 08>,
    fileEncSha256: <Buffer 69 88 d6 36 1c 8b 5f 02 a1 8f e1 6b b2 41 3d da 68 77 b8 8b fd df f0 d0 73 5b bf 2c 84 ee 7e b4>,
    directPath: ''
  },
  participant: '',
  timestamp: 1633129024
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'sticker',
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

### Send Message Audio
> For audio submission, you can use URL or the local file path

```javascript
let response = await client.sendAudio("5561981590153", "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");

```

> To reply to a message with audio, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendAudio("5561981590153", "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'audio',
  id: '3EB072B039F6',
  to: '556181590153',
  content: '',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/AjwRfBCBZ1XgeSLtdVTr96lMJO5CtZtjCi0HpNjEctDW.enc',
    mimetype: 'audio/ogg; codecs=opus',
    fileSha256: <Buffer fa 28 20 25 6f 2c d3 f2 df 03 fa 24 7d 7b 01 e7 9d 3f e7 94 34 4a ad ce a0 8c ee 06 bc ce 3c 94>,
    fileLength: Long { low: 764176, high: 0, unsigned: true },
    seconds: 27,
    mediaKey: <Buffer ad f9 19 91 76 08 28 59 63 b2 be 43 13 8d 68 5b d3 90 e7 93 6d 32 29 5e e8 b5 b9 cb 37 76 d6 27>,
    fileEncSha256: <Buffer ab d4 0e 48 ca 4c 1e 47 86 02 50 3f 0d 87 aa 7f a7 82 ac ff eb 8d 1f ac f1 f8 6d da 36 1e ba e4>,
    directPath: ''
  },
  participant: '',
  timestamp: 1633111077
}

```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'audio',
  message: 'message of erro'
}
```
### Send Message Audio Voice
> For audio voice submission, you can use URL or the local file path

```javascript
let response = await client.sendVoice("5561981590153", "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");

```

> To reply to a message with audio voice, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendVoice("5561981590153", "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3", '3EB01A690E67');
```

##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'voice',
  id: '3EB072B039F6',
  to: '556181590153',
  content: '',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/AjwRfBCBZ1XgeSLtdVTr96lMJO5CtZtjCi0HpNjEctDW.enc',
    mimetype: 'audio/ogg; codecs=opus',
    fileSha256: <Buffer fa 28 20 25 6f 2c d3 f2 df 03 fa 24 7d 7b 01 e7 9d 3f e7 94 34 4a ad ce a0 8c ee 06 bc ce 3c 94>,
    fileLength: Long { low: 764176, high: 0, unsigned: true },
    seconds: 27,
    mediaKey: <Buffer ad f9 19 91 76 08 28 59 63 b2 be 43 13 8d 68 5b d3 90 e7 93 6d 32 29 5e e8 b5 b9 cb 37 76 d6 27>,
    fileEncSha256: <Buffer ab d4 0e 48 ca 4c 1e 47 86 02 50 3f 0d 87 aa 7f a7 82 ac ff eb 8d 1f ac f1 f8 6d da 36 1e ba e4>,
    directPath: ''
  },
  participant: '',
  timestamp: 1633111077
}

```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'voice',
  message: 'message of erro'
}
```

### Send Message Document
> For document submission, you can use URL or the local file path

```javascript
let response = await client.sendDocument("5561981590153", "http://www.orimi.com/pdf-test.pdf", "Filename Optional");

```
> To reply to a message with document, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendDocument("5561981590153", "http://www.orimi.com/pdf-test.pdf", "Filename Optional", '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'document',
  id: '3EB07C8C333C',
  to: '556181590153',
  isgroup: false,
  file: {
    url: 'https://mmg.whatsapp.net/d/f/ArJfVUhnzdW7qcBk8-T-mzRWsfMN6k_WOS81td_xJs6E.enc',
    mimetype: 'application/pdf',
    filename: 'Filename Optional',
    fileSha256: <Buffer f6 ed cd 8a 1b 4f 7c b8 54 86 d0 c6 77 7f 91 74 ea db c4 d1 d0 d9 e5 ae ba 71 32 f3 0b 34 bc 3e>,
    fileLength: Long { low: 20597, high: 0, unsigned: true },
    mediaKey: <Buffer 1b 7d 59 ce fa 4b 3f 35 14 ca 36 1b bd ba f7 c7 ed 6a f7 3d ea c1 04 b0 7c a1 6b d4 4a ab 33 40>,
    fileEncSha256: <Buffer 37 db ac 7a aa f5 c2 aa 13 c6 ec 18 9f 32 d7 5b 8a b3 0d fc 50 4f 9c ea aa 2f 8c ed 20 c9 f5 b0>,
    directPath: '',
    thumbnail: <Buffer >
  },
  participant: '',
  timestamp: 1633121433
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'document',
  message: 'message of erro'
}
```
### Send Message Location

```javascript
let response = await client.sendLocation("5561981590153", -15.8413105, -48.0270346, 'title optional', 'address optional');

```
> To reply to a message with location, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendLocation("5561981590153", -15.8413105, -48.0270346, 'title optional', 'address optional', '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'location',
  id: '3EB01A3D9A34',
  to: '556181590153',
  name: 'title optional',
  address: 'address optional',
  url: '',
  thumbnail: <Buffer >,
  latitude: -15.8413105,
  longitude: -48.0270346,
  isgroup: false,
  participant: '',
  timestamp: 1633122748
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'location',
  message: 'message of erro'
}
```
### Send Message Contact

```javascript
let response = await client.sendContact("5561981590153",'Name of Contact', '15815954040');

```
> To reply to a message with contact, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
let response = await client.sendContact("5561981590153",'Name of Contact', '15815954040', '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'contact',
  id: '3EB00AFB1F60',
  to: '556181590153',
  display: 'Name of Contact',
  vcard: 'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    'FN:Name of Contact\n' +
    'TEL;type=CELL;type=VOICE;waid=15815954040:+15815954040\n' +
    'END:VCARD',
  isgroup: false,
  timestamp: 1633128149
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'contact',
  message: 'message of erro'
}
```
### Send Message Link

```javascript
  let response = await client.sendLink("5561981590153", "https://music.youtube.com/watch?v=mqA5iMLsME8&feature=share", 'Description optional');

```
> To reply to a message with link, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
  let response = await client.sendLink("5561981590153", "https://music.youtube.com/watch?v=mqA5iMLsME8&feature=share", 'Description optional', '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'link',
  id: '3EB0746BE9A9',
  to: '556181590153',
  content: 'https://music.youtube.com/watch?v=mqA5iMLsME8&feature=share\n' +
    'Description optional',
  isgroup: false,
  timestamp: 1633130029
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'link',
  message: 'message of erro'
}
```
### Send Message Buttons

```javascript

  const buttons = [
    {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1},
    {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1}
  ]

  let response = await client.sendButtons("5561981590153", "title of message", buttons, 'Description optional');

```
> To reply to a message with buttons, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
  let response = await client.sendButtons("5561981590153", "title of message", buttons, 'Description optional', '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'buttons',
  id: '3EB071B7776A',
  to: '556181590153',
  title: 'title of message',
  description: 'Description optional',
  buttons: [
    Button { buttonId: 'id1', buttonText: [ButtonText], type: 1 },
    Button { buttonId: 'id2', buttonText: [ButtonText], type: 1 }
  ],
  isgroup: false,
  timestamp: 1633142713
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'buttons',
  message: 'message of erro'
}
```
### Send Message List
> Attention! This function does not work if connected to a WhatsApp Business account

```javascript

  const options = [
 {title: 'Title of Option', description: "description", rowId:"id1"},
 {title: 'Title of Option', description: "description", rowId:"id2"}
]
  //number of contact, name of button, name of section, options <array>, description: optional
  let response = await client.sendList("5561981590153", "Name of Button", "Name of section", options, 'Description optional');

```
> To reply to a message with buttons, use the id of the message you want to reply to in the last parameter, which is optional.

```javascript
  //number of contact, name of button, name of section, options <array>, description: optional, id message for reply
  let response = await client.sendList("5561981590153", "Name of Button", "Name of section", options, 'Description optional', '3EB01A690E67');
```
##### Return with success
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'list',
  id: '3EB0F92B3F1D',
  to: '556181590153',
  description: 'Description optional',
  btnName: 'Name of Button',
  sections: [ Section { rows: [Array], title: 'Name of section' } ],
  isgroup: false,
  timestamp: 1633143340
}
```
##### Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'list',
  message: 'message of erro'
}
```

## Delete Message

> Delete messages in chats only for you or for all

Delete message only for you

```javascript
//number of chat, id of message
let response = await client.deleteMessageMe("5561981590153", "3EB071B7776A")

```
Delete Message to everyone on chat

```javascript
//number of chat, id of message
let response = await client.deleteMessageAll("5561981590153", "3EB071B7776A")

```

Return with success 
```javascript
{ 
 session: 'Marketing',
 status: 200 
 type: 'delete-chat-me'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'delete-chat-me',
  message: 'message of erro'
}
```
## Forwarding Message

> Message forwarding for any contact




```javascript
//number of chat, id of message, number chat for send
let response = await client.forwardMessage("5561981590153", "3EB042FA6555", "15815954040")

```

Return with success 
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'forwarding',
  subtype: 'text',
  id: '3EB042FA6555',
  from: '15815954040',
  text: 'oi',
  isgroup: false,
  reply: { id: undefined },
  participant: '',
  timestamp: 1633147282
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'forwarding',
  message: 'message of erro'
}
```

## Get Chats

> List All Chats of Conversations


```javascript
let response = await client.getChats()

```

Return with success 
```javascript
{
  session: 'Marketing',
  type: 'get-chats',
  chats: [
    { id: '556181590153', name: 'Joe Dutra', mute: '0', spam: 'false' },
    {
      id: '5511982743910-1596072761',
      name: 'Venom Support',
      mute: '0',
      spam: 'false'
    }
  ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-chats',
  message: 'message of erro'
}
```
## Read Chat Messages

> Read all messages from a chat


```javascript
let response = await client.markRead('5561981590153')

```

Return with success 
```javascript
{
    session: 'Marketing',
    status: 200,
    type: "mark-read"
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'mark-read',
  message: 'message of erro'
}
```
## Get All Contacts

> List All Contacts


```javascript
let response = await client.getAllContacts()

```

Return with success 
```javascript
{
  session: 'Marketing',
  type: 'get-all-contacts',
  qt: 2,
  contacts: [
    {
      id: '552123919428',
      name: 'Alenii Venom',
      short: '',
      isBusiness: true
    },
    {
      id: '556181590153',
      name: 'Joe Dutra',
      short: '',
      isBusiness: false
    }
  ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-all-contacts',
  message: 'message of erro'
}
```
## Get Block List

> List All Contacts Blocking


```javascript
let response = await client.getBlockList()

```

Return with success 
```javascript
{
  session: 'Marketing',
  type: 'get-block-list',
  list: [ '5561986268199', '5561998745252' ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-block-list',
  message: 'message of erro'
}
```

## Mute Chat

> Silence or remove the silence of a particular chat for a specific period


**Mute**
```javascript
//number of chat, timer: ['hour', 'week', 'ever']
let response = await client.muteChat("5561981590153", "hour")

```
**Unmute**
```javascript
//number of chat
let response = await client.unmuteChat("5561981590153")

```

Return with success 
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'mute-chat',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'mute-chat',
  message: 'message of erro'
}
```
## Archive Chat

> Archive or unarchive a specific chat


**Archive**
```javascript
//number of chat, true
let response = await client.archiveChat("5561981590153", true)

```
**Unarchive**
```javascript
//number of chat, false
let response = await client.archiveChat("5561981590153", false)

```

Return with success 
```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'archive-chat',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'archive-chat',
  message: 'message of erro'
}
```
## Delete Chat

> Delete a specific chat or group


**Archive**
```javascript
//number of chat or group
let response = await client.deleteChat("5561981590153")
```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'delete-chat',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'delete-chat',
  message: 'message of erro'
}
```
## Pin Chat

> Pin or unpin a specific chat or group


**Pin**
```javascript
//number of chat, true
let response = await client.pinChat("5561981590153", true)

```
**Unpin**
```javascript
//number of chat, false
let response = await client.pinChat("5561981590153", false)

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'pin-chat',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'pin-chat',
  message: 'message of erro'
}
```
## Block Contact

> Blocking or unblocking a specific contact


**Block**
```javascript
//number of chat
let response = await client.blockContact("5561981590153")

```
**Unblock**
```javascript
//number of chat
let response = await client.unblockContact("5561981590153")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'block-contact',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'block-contact',
  message: 'message of erro'
}
```
## Get Profile Status

> Displays the text of the status of a specific contact


```javascript
//number of chat
let response = await client.getProfileStatus("5561981590153")

```

Return with success 

```javascript
{
  session: 'Marketing',
  type: 'get-profile-status',
  status: 'Que Deus seja sempre louvado em nossas vidas'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-profile-status',
  message: 'message of erro'
}
```
## Get Picture

> Displays the image of a specific contact


```javascript
//number of chat
let response = await client.getPicture("5561981590153")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'get-picture',
  picture: 'https://pps.whatsapp.net/v/t61.24694-24/166060433_390988636021500_3494454124066997603_n.jpg?ccb=11-4&oh=453e672ddc35e64ca123439f7a89d7d2&oe=615EAAAF'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-picture',
  message: 'message of erro'
}
```
## Set Picture

> Set image for profile or group


```javascript
//number of chat, file local path
let response = await client.setPicture("5561981590153", "./image-profile.png")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'set-picture'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'set-picture',
  message: 'message of erro'
}
```
## Get Number Profile

> Checks if a number exists in the WhastApp

```javascript
//number of chat
let response = await client.getNumberProfile("5561981590153")

```

Return with success 

```javascript
{
  session: 'Marketing',
  type: 'get-number-profile',
  id: '556181590153',
  isBusiness: false,
  exist: true
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-number-profile',
  message: 'message of erro'
}
```

## Groups Functions

We created the easiest way to create groups with **Superchats**

## Create Group

> Create a group with participants


```javascript
//name of group, array with number of contacts
let response = await client.createGroup("Name Group", ["556181590153", "5561981819855"])

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'create-group',
  groupId: "15815954040-1631239154"
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'create-group',
  message: 'message of erro'
}
```

## Add Participants Group

> Add participants in group


```javascript
//id of group, array with number of contacts
let response = await client.addParticipantsGroup("15815954040-1631239154", ["556181590153", "5561981819855"])

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'add-participants-group',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'add-participants-group',
  message: 'message of erro'
}
```
## Add Admins Group

> Add or Remove participants of group as admin


```javascript
//id of group, array with number of contacts
let response = await client.addGroupAdmins("15815954040-1631239154", ["556181590153", "5561981819855"])

```
```javascript
//id of group, array with number of contacts
let response = await client.removeGroupAdmins("15815954040-1631239154", ["556181590153", "5561981819855"])

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'add-group-admins',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'add-group-admins',
  message: 'message of erro'
}
```
## Change Name of Group

> Change name of group


```javascript
//id of group, name group
let response = await client.groupTitle("15815954040-1631239154", "new name of group")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'group-title',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'group-title',
  message: 'message of erro'
}
```
## Change Description of Group

> Change description of group


```javascript
//id of group, name group
let response = await client.groupDescription("15815954040-1631239154", "description of group")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'group-description',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'group-description',
  message: 'message of erro'
}
```
## Join Group

> Join a group specified


```javascript
//id of group
let response = await client.joinGroup("15815954040-1631239154")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'join-group',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'join-group',
  message: 'message of erro'
}
```
## Leave Group

> Leaves a group specified


```javascript
//id of group
let response = await client.leaveGroup("15815954040-1631239154")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'leave-group',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'leave-group',
  message: 'message of erro'
}
```

## Revoke Group Link

> Revoke link from a specified group


```javascript
//id of group
let response = await client.revokeGroupLink("15815954040-1631239154")

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'revoke-group-link',
  linkGroup: 'G3M81fQbuwDB2cuAdPIv0h'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'revoke-group-link',
  message: 'message of erro'
}
```
## Info Group

> Get info from a specified group


```javascript
//id of group
let response = await client.infoGroup("15815954040-1631239154")

```

Return with success 

```javascript
{
  session: 'Marketing',
  type: 'info-group',
  status: 200,
  id: '15795662985-1631581942',
  owner: '15795662985@c.us',
  title: 'Teste Grupo Live',
  create: 1631581942,
  participants: [
    {
      id: '556181590153',
      name: 'Joe Dutra',
      short: 'Joe',
      isAdmin: false,
      isSuperAdmin: false
    },
    {
      id: '5521991977392',
      name: 'Israel - Fabrica de Sonhos',
      short: 'Israel - Fabrica',
      isAdmin: false,
      isSuperAdmin: false
    }
  ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'info-group',
  message: 'message of erro'
}
```
## Set Group Settings

> Get info from a specified group

**Set sending messages in group only for admins**
```javascript
//id of group, type, boolean
let response = await client.setGroupSettings("15815954040-1631239154", "message", true)

```
**Set change settings in group only for admins**
```javascript
//id of group, type, boolean
let response = await client.setGroupSettings("15815954040-1631239154", "settings", true)

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'set-group-settings',
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'set-group-settings',
  message: 'message of erro'
}
```
## Get Groups List

> Get all groups list

```javascript
let response = await client.getGroups()

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'get-groups',
  chats: [
    { id: '5511982743910-1596072761', name: 'Venom Support' },
    { id: '556181590153-1625838636', name: 'Venom Business' }
  ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-groups',
  message: 'message of erro'
}
```
## Get Battery Level

> Get porcent of battery

```javascript
let response = await client.getBatteryLevel()

```

Return with success 

```javascript
{ 
  session: 'Marketing',
  status: 200,
  type: 'get-battery-level',
  level: 56 
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-battery-level',
  message: 'message of erro'
}
```
## Get Host Device

> Get info of device

```javascript
let response = await client.getHostDevice()

```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'get-host-device',
  phone: '556181590153',
  pushName: 'Joe Dutra',
  wa_version: '2.21.19.21',
  mcc: '724',
  mnc: '004',
  os_version: '11',
  device_manufacturer: 'IPHONE 13 PRO',
  device_model: 'OSX 14',
  os_build_number: 'RKQ1.200826.002 test-keys'
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-host-device',
  message: 'message of erro'
}
```
## Chat Messages Functions

> Know the types of functions to recover chat messages

**Take the last 10 messages from a chat**
```javascript
//number of chat, Number
let response = await client.getChatMessages('556181590153', 10)

```
**Take all messages from a chat**
```javascript
//number of chat
let response = await client.getChatAllMessages('556181590153')

```
**Take all unread messages from all chats**
```javascript
let response = await client.getAllUnreadMessages()

```
Return with success 

```javascript
{
  session: 'Marketing',
  type: 'get-chat-messages',
  messages: [
    {
      session: 'Marketing',
      type: 'reply',
      subtype: 'text',
      id: '3EB082EFA70F',
      from: '556181590153',
      text: 'Oi',
      isgroup: false,
      reply: [Object],
      participant: '',
      timestamp: 1633407729
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '3EB0D91B1ECF',
      from: '556181590153',
      content: 'Oi',
      isgroup: false,
      participant: '',
      timestamp: 1633408611
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '3EB0AD7A246F',
      from: '556181590153',
      content: 'Testando',
      isgroup: false,
      participant: '',
      timestamp: 1633411173
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '46110924F9C202D3933AA4CBC2F209A3',
      from: '556181590153',
      content: 'Oi',
      isgroup: false,
      participant: '',
      timestamp: 1633411357
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '3EB0EE5900AF',
      from: '556181590153',
      content: 'Testando',
      isgroup: false,
      participant: '',
      timestamp: 1633411382
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '96033721D4426073C37802F407251F9A',
      from: '556181590153',
      content: 'Oi',
      isgroup: false,
      participant: '',
      timestamp: 1633411396
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '3EB067D84A06',
      from: '556181590153',
      content: 'Testando',
      isgroup: false,
      participant: '',
      timestamp: 1633411746
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '2CDF9BAF7E20E72BC74D602A339DA2C2',
      from: '556181590153',
      content: 'Oiiii',
      isgroup: false,
      participant: '',
      timestamp: 1633411781
    },
    {
      session: 'Marketing',
      type: 'text',
      id: '4DEBB46473A8E642E8764F6C70567089',
      from: '556181590153',
      content: 'Como vai???',
      isgroup: false,
      participant: '',
      timestamp: 1633411792
    },
    {
      session: 'Marketing',
      type: 'text',
      id: 'B536EAE6275FD6FF98F3E3326FE1682F',
      from: '556181590153',
      content: 'Top',
      isgroup: false,
      participant: '',
      timestamp: 1633411811
    }
  ]
}
```
Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'get-chat-messages',
  message: 'message of erro'
}
```

## Update Presence

Update your presence for a certain contact

Types of state: a = available, c = composing, r = recording, p = paused

```javascript
//chat number, state: a, c, r, p
let response = await client.setPresence('556181590153', 'c');

```
Return with success

```javascript
{ 
  session: 'Marketing',
  status: 200, 
  type: 'set-presence' 
}
```

Return with erro
```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'set-presence',
  message: 'message of erro'
}
```

## Send Messages for Status

> Send messages for status of whatsapp

**Send Text for Status**
```javascript
//number of chat, Number
let response = await client.sendTextStatus("Text Status");
```
**Send Image for Status**
```javascript
//number of chat
let response = await client.sendImageStatus("https://github.com/orkestral/superchats/raw/main/img/superchats.png", "Text optional");
```
**Send Video for Status**
```javascript
//number of chat
let response = await client.sendVideoStatus("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", "Text optional");
```

Return with success 

```javascript
{
  session: 'Marketing',
  status: 200,
  type: 'status-image',
  id: '3EB0FF4E2532',
  to: 'status@broadcast',
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
Return with erro

```javascript
{
  session: 'Marketing',
  status: 404,
  type: 'status-image',
  message: 'message of erro'
}
```
## Observation Events

> Follow each event at the time that happen


### **Received Message Event**
<br>

> Receive an event all the time you receive a message from some contact

```javascript
//event:any
client.onMessage(event => {
  console.log(event)
});
```
Return of event onMessage

```javascript
{
  session: 'Marketing',
  type: 'text',
  id: '3EB07A5B9979E8CB453A',
  from: '556181590153',
  content: 'oiii',
  isgroup: false,
  participant: '',
  timestamp: 1633414066
}
```

### **Reading Confirmation Event**
<br>

> Receive an event every time you send a message to some contact with the States of: failed, pending, sent, received or read

```javascript
//event:any
client.onAck(event => {
  console.log(event)
});
```
Return of event onAck

```javascript
{
  session: 'Marketing',
  status: 'RECEIVED',
  type: 'text',
  id: '3EB02BC6217B',
  to: '556181590153',
  text: 'Hii',
  isgroup: false,
  timestamp: 1633414317
}
```
### **Presence Event**
<br>

> Receive an event every time a contact is: typing, recording, online or offline with you
<br>
Types of state: **available**, **composing**, **recording** and **paused**

```javascript
//event:any
client.onPresence(event => {
  console.log(event)
});

```
Return of event onPresence

```javascript
{
  session: 'Marketing',
  from: '556181590153',
  status: 'composing',
  pushname: 'Joe Dutra'
}
```
### **Group Event**
<br>

> Receive events all time the name of a group, configurations are changed
<br>
Types of return: **change-name**, **change-messages-admin**, **change-settings-admin** and **paused**

```javascript
//event:any
client.onGroup(event => {
  console.log(event)
});

```
Return of event onGroup
<br>

##### **Name change group**

```javascript
{
  session: 'Marketing',
  action: 'change-name',
  changed: [ 'Grupo Live', 'Teste Grupo Live' ],
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '15795662985',
  participants: 3
}
```

##### **Group changes for messages just for admins**

```javascript
{
  session: 'Marketing',
  action: 'change-messages-admin',
  changed: 'active',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '15795662985',
  participants: 3
}
```
##### **Group changes for settings just for admins**
```javascript
{
  session: 'Marketing',
  action: 'change-settings-admin',
  changed: 'active',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '15795662985',
  participants: 3
}
```
### **Participants Event**
<br>

> Receive events about group participants
<br>

Types of action: **add**, **remove**, **promote** and **demote**

```javascript
//event:any
client.onParticipants(event => {
  console.log(event)
});

```
Return of event onParticipants
<br>

##### **Add participants**

```javascript
{
  session: 'Marketing',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '5521991977392',
  action: 'add',
  participants: 3
}
```
##### **Remove participants**

```javascript
{
  session: 'Marketing',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '5521991977392',
  action: 'remove',
  participants: 2
}
```

##### **Promote participants**

```javascript
{
  session: 'Marketing',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '5521991977392',
  action: 'promote',
  participants: 3
}
```
##### **Demote participants**

```javascript
{
  session: 'Marketing',
  group: 'Grupo Live',
  from: '15795662985-1631581942',
  participant: '5521991977392',
  action: 'demote',
  participants: 3
}
```
### **Delete Event**
<br>

> Receive events every time a message is deleted


```javascript
//event:any
client.onDelete(event => {
  console.log(event)
});

```
Return of event onDelete
<br>

```javascript
{
  session: 'Marketing',
  type: 'message-delete',
  from: '15795662985-1631581942',
  id: '3EB07E88FDCF1C4EF887',
  timestamp: 1633453902
}
```
### **Force Status Always Online**
<br>

> This event force is always online


```javascript
//event:any
client.forceStatusOn();

```
