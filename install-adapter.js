// Impor modul dan dependensi yang diperlukan
require("./config.js");
const pkg = require("./package.json");
const {
    execSync
} = require("node:child_process");

// Buat console
// const console = new console({
//    tag: pkg.name
// });

// Mendapatkan adapter autentikasi dari konfigurasi
const {
    adapter
} = config.bot.authAdapter;

// Daftar modul untuk setiap adapter autentikasi
const modules = {
    mysql: "baileys-mysql",
    mongodb: "baileys-mongodb",
    firebase: "baileys-firebase"
};

// Pasang modul jika adapter ditemukan dalam daftar
if (modules[adapter]) {
    console.log(`Installing ${adapter} module...`);
    execSync(`npm install ${modules[adapter]} --no-save`, {
        stdio: "inherit"
    });
} else {
    console.log("No database module required or adapter is not set.");
}