const fs = require("fs");
const path = require("path");
const contacts = require("./contacts");
const {
  getContactById,
  listContacts,
  addContact,
  removeContact,
} = require("./contacts");
const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((data) => console.table(data));
      break;

    case "get":
      getContactById(String(id)).then((data) => console.table(data));
      break;

    case "add":
      addContact(name, email, phone).then((data) => console.table(data));
      break;

    case "remove":
      removeContact(String(id)).then((data) => console.table(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
