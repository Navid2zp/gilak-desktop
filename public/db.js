const path = require("path");
const isDev = require("electron-is-dev");
const sqlite3 = require("sqlite3").verbose();
const electron = require("electron");

var DB;
function initListeners() {
  electron.ipcMain.on("getWord", (event, arg) => {
    getWord(arg, (err, row) =>
      event.reply("getWord-reply", { success: !err, error: err, word: row })
    );
  });

  electron.ipcMain.on("getAlphabet", (event, arg) => {
    getAlphabet((err, rows) =>
      event.reply("getAlphabet-reply", {
        success: !err,
        error: err,
        alphabet: rows,
      })
    );
  });

  electron.ipcMain.on("getWords", (event, char) => {
    getWords(char, (err, rows) =>
      event.reply("getWords-reply", {
        success: !err,
        error: err,
        words: rows,
      })
    );
  });
  electron.ipcMain.on("searchWords", (event, search) => {
    searchWords(search, (err, rows) =>
      event.reply("searchWords-reply", {
        success: !err,
        error: err,
        words: rows,
      })
    );
  });
  console.log("Listeners initialized ...");
}

async function initDB() {
  const dataPath = isDev
    ? path.join(__dirname, "../db/dictionary.db")
    : path.join(process.resourcesPath, "db/dictionary.db");

  DB = await new sqlite3.Database(dataPath, (err) => {
    if (err) {
      throw err;
    }
    console.log("Database initialized ...");
  });

  initListeners();
}

function randomWord(callback) {
  DB.all("select * from dictionary order by random() limit 1", callback);
}

function getWord(wordId, callback) {
  DB.get("select * from dictionary where id = ?", wordId, callback);
}

function getAlphabet(callback) {
  DB.all(
    "select distinct substr(word, 1, 1) as alphabet from dictionary order by alphabet",
    callback
  );
}

function getWords(char, callback) {
  DB.all(`select * from dictionary where substr(word, 1, 1) like '${char}' order by word`, callback);
}

function searchWords(search, callback) {
	DB.all(`select * from dictionary where word like '%${search}%' limit 20`, callback);
  }

module.exports.initDB = initDB;
module.exports.randomWord = randomWord;
