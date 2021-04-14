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

After the user typed something, the application will determine what to do next. For example
