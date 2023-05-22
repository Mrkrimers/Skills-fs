const fs = require(`fs`);

const path = `./storage/storage.json`;
const dataBase = JSON.parse(fs.readFileSync(path));

function getAllSkill() {
  return dataBase;
}

function getSkillById(id) {
  const findId = dataBase.find(el => el.id == id);

  if (!findId) throw new Error(`Id is not found`);

  return findId;
}

function postCreateSkill(title) {
  dataBase.push({ id: dataBase.length + 1, title });

  fs.writeFileSync(path, JSON.stringify(dataBase));

  return dataBase;
}

function deleteSkillById(id) {
  if (id > dataBase.length) throw new Error(`ID very big`);

  const filtered = dataBase.filter(el => el.id != id);

  if (filtered.length == dataBase.length) throw new Error(`your Id not found`);

  return filtered;
}

function putSkillUpdate(id, title) {
  const item = { id, title };
  const filtered = dataBase.filter(el => el.id != id);

  if (dataBase.length == filtered.length) throw new Error(`your id not Found`);

  filtered.push(item);

  fs.writeFileSync(path, JSON.stringify(filtered));
  return filtered;
}

module.exports = { getAllSkill, postCreateSkill, deleteSkillById, putSkillUpdate, getSkillById };
