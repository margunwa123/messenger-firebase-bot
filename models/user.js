const { db } = require("./database");

const userCol = db.collection("users");

class User {
  name = null;
  birthdate = null;
  ref;
  messagesRef;
  context = "get-name";

  constructor(sender_psid) {
    this.ref = userCol.doc(sender_psid);
    this.messagesRef = this.ref.collection("message");
  }

  async saveUser() {
    const writeRes = await this.ref.set({
      name: this.name,
      birthdate: this.birthdate,
    });
    return writeRes;
  }

  async setName(name) {
    this.name = name;
    this.ref.update({
      name,
    });
  }

  async setContext(context) {
    this.context = context;
    this.ref.update({
      context,
    });
  }

  async setBirthdate(date) {
    this.birthdate = date;
    this.ref.update({
      birthdate: this.birthdate,
    });
  }

  async getUser() {
    const data = (await this.ref.get()).data();
    if (data) {
      this.name = data.name;
      if (data.birthdate) {
        this.birthdate = new Date(data.birthdate._seconds);
      }
      this.context = data.context;
    }
    return data;
  }

  async getName() {
    return (await this.getUser()).name;
  }

  async getBirthdate() {
    const dateFromDb = await this.getUser().date;
    return new Date(dateFromDb._seconds);
  }

  async addMessage(text, sender, id) {
    const messageAdded = await this.messagesRef.add({
      text,
      sender,
    });
    return messageAdded.id;
  }

  async getAllMessages() {
    return (await this.messagesRef.get()).docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      sender: doc.data().sender,
    }));
  }

  async getMessageById(id) {
    return this.messagesRef.where("id", "==", id).get();
  }

  async deleteMessageById(id) {
    return this.messagesRef.doc(id).delete();
  }
}

module.exports = User;
