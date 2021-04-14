const { CONFIDENCE_THRESHOLD } = require("./contants");

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

function getTraitConfidence(nlp, name) {
  return (
    nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0].confidence
  );
}

function isTraitPassable(nlp, name) {
  return (
    firstTrait(nlp, name) &&
    getTraitConfidence(nlp, name) > CONFIDENCE_THRESHOLD
  );
}

module.exports = {
  firstTrait,
  isTraitPassable,
};
