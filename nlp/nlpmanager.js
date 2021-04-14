// const { NlpManager } = require("node-nlp");

// class NLPManagers {
//   context;
// }

// const manager = new NlpManager({ languages: ["en"], forceNER: true });
// // Adds the utterances and intents for the NLP
// manager.addDocument("en", "im cathleen", "greetings.bye");
// manager.addDocument("en", "mario", "person.name");
// manager.addDocument("en", "daren", "person.name");
// manager.addDocument("en", "rojap", "person.name");
// manager.addDocument("en", "helios", "person.name");
// manager.addDocument("en", "14 august 2020", "person.birthday");
// manager.addDocument("en", "13 may 2019", "person.birthday");
// manager.addDocument("en", "10 March 2000", "person.birthday");

// // Train also the NLG
// manager.addAnswer("en", "person.name", "Nice to meet you");
// manager.addAnswer("en", "person.name", "Well hello there!");
// manager.addAnswer("en", "person.birthday", "nice la!");
// manager.addAnswer("en", "person.birthday", "wowowoo!");

// // Train and save the model.
// (async () => {
//   await manager.train();
//   const response = await manager.process("en", "my name is Titin");
//   console.log(response);
// })();
