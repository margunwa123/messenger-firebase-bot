# Messenger Chatbot

URL : https://www.messenger.com/t/105670314980606

# How to run locally:

1. Run `npm install` or `yarn install`
2. Create a firebase project, for reference see: [Create a firebase application](https://codinglatte.com/posts/how-to/how-to-create-a-firebase-project/#:~:text=First%2C%20visit%20Firebase%20Console%20using,are%20not%20already%20logged%20in.&text=Then%2C%20create%20a%20new%20project,the%20project%20and%20click%20continue.)
3. Create a facebook page, for reference see [Create a facebook page](https://www.facebook.com/help/104002523024878)
4. Rename the .env.example file to .env file
5. Change those field from the .env file:

- VERIFY_TOKEN= a random verification token
- PAGE_ACCESS_TOKEN= page access token for your page
- PRIVATE_KEY= firebase private key
- PROJECT_ID= firebase project id
- CLIENT_EMAIL= firebase client email

6. Host the page on heroku, for reference see [Host page on heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
7. Don't forget to include the heroku URL to the facebook page webhook
8. Try chatting with your application now, it's live!

# Project Description

This project is created for completing AdaKerja internship challenge. This application mainly does 2 things:

- Listen to webhooks
- Create a messages list for each user that is connected in firebase

After the user typed something, the application will determine what to do next. For example: <br/>
User: Hello!<br/>
App: Hello there, can I have your name?<br/>
...

# Folder Structure

1. **handler**
   This folder is for handling message, inside this folder are message-handler, the main handler for each message received, nlp for handling built in nlp support, and response for handling custom response (like attachment)
2. **models**
   This folder is for things related to firebase database. A model is an entity that has the same field as its database counterpart.
3. **nlp**
   This folder is for the custom NLP (that i use for extracting name)
4. **routes**
   This folder is for managing express routes
5. **util**
   This folder is for all utilities file, like birthdayCalculate to calculate how many days are left until a certain birthday

# API Documentation

1. get all messages
   path: _http://localhost:1337/messages?userId={USERID}_ <br/>
   method: DELETE <br/>
   notes: the text surrounded in {} is a variable<br/>
   to get all messages, you need to have the user id. You can get your user id by typing `user-id` in the messenger bot, the bot will then reply your account user id.
2. get message by id
   path: _http://localhost:1337/messages/{id}?userId={USERID}_<br/>
   method: DELETE <br/>
   Using the id that you got from viewing all messages or by looking at your firebase's firestore, you can view a single message
3. delete message of id
   path: _http://localhost:1337/messages/{id}?userId={USERID}_<br/>
   method: DELETE <br/>
   Using the id that you got from viewing all messages or by looking at your firebase's firestore, you can delete a single message

# Example API Usage

_GET_ http://localhost:1337/messages?userId=3854666931248323
<br/>

Result:

```json
[
  {
    "id": "273ZrVKeVb3aRbk8C3xM",
    "text": "Do you want to know how many days are left until your birthday?",
    "sender": "bot"
  },
  {
    "id": "2jcFdC4IMbnia34M4wkV",
    "text": "thanks!",
    "sender": "self"
  }
]
```

# More Information

Feel free to ask about more information if this markdown file seems lacking by contacting me at **mariogunawan.work@gmail.com**
