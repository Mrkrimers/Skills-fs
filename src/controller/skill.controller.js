const route = require(`express`).Router();
const { buildResponse } = require(`../helper/buildResponse`);
const { isValidSkillId, isValidSkillTitle } = require(`../helper/validation`);
const { getAllSkill, postCreateSkill, deleteSkillById, putSkillUpdate, getSkillById } = require(`../service/skill.service`);

route.get(`/`, (req, res) => {
  try {
    const data = getAllSkill();

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get(`/:id`, isValidSkillId, (req, res) => {
  try {
    const { id } = req.params;
    const data = getSkillById(id);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post(`/`, isValidSkillTitle, (req, res) => {
  try {
    const { title } = req.body;
    const data = postCreateSkill(title);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put(`/:id`, isValidSkillId, isValidSkillTitle, (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const data = putSkillUpdate(id, title);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete(`/:id`, isValidSkillId, (req, res) => {
  try {
    const { id } = req.params;
    const data = deleteSkillById(id);

    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
