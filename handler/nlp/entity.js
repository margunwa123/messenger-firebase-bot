const { CONFIDENCE_THRESHOLD } = require("./contants");

function getEntityValue(nlp, name) {
  return (
    nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0].value
  );
}

function getEntityConfidence(nlp, name) {
  return (
    nlp &&
    nlp.entities &&
    nlp.entities[name] &&
    nlp.entities[name][0].confidence
  );
}

function isEntityPassable(nlp, name) {
  return (
    getEntityValue(nlp, name) &&
    getEntityConfidence(nlp, name) > CONFIDENCE_THRESHOLD
  );
}

module.exports = {
  isEntityPassable,
  getEntityValue,
};
