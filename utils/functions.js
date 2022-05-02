const fs = require('fs').promises;
const crypto = require('crypto');

const token = { token: crypto.randomBytes(8).toString('hex') };

async function reading() {
    const data = await fs.readFile('./talker.json');
    return JSON.parse(data);
}

async function writing(content) {
    const data = JSON.stringify(content);
    await fs.writeFile('./talker.json', data);
}

module.exports = {
    reading,
    token,
    writing,
};
