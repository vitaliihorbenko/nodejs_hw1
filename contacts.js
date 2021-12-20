const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const findId = data.find(({ id }) => id === contactId);
    return findId;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const result = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result));
    return "Contact removed";
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const lastId = data[data.length - 1];
    const nextId = +lastId.id + 1;

    const newContact = {
      id: String(nextId),
      name,
      email,
      phone,
    };

    data.push(newContact);

    const contacts = JSON.stringify(data);
    fs.writeFile(contactsPath, contacts);
    return `Contact added`;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { addContact, removeContact, getContactById, listContacts };
