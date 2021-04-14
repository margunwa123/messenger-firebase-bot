var natural = require("natural");
const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

var lexicon = new natural.Lexicon(
  language,
  defaultCategory,
  defaultCategoryCapitalized
);
var ruleSet = new natural.RuleSet("EN");
var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);
const tokenizer = new natural.WordTokenizer();

function getTaggedWords(string) {
  const tokenizedString = tokenizer.tokenize(string);
  const taggedString = tagger.tag(tokenizedString);
  return taggedString.taggedWords;
}

const defaultCategories = [defaultCategory, defaultCategoryCapitalized];

module.exports = {
  getTaggedWords,
  defaultCategories,
};
