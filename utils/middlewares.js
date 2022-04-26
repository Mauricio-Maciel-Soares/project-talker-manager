const fs = require('fs').promises;

async function reading() {
    const data = await fs.readFile('./talker.json');
    return JSON.parse(data);
}

  module.exports = {
    reading,
};
