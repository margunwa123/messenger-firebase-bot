const { getTaggedWords, defaultCategories } = require("./natural");

function extractName(string) {
  const taggedWords = getTaggedWords(string);
  const nouns = taggedWords.filter((el) => defaultCategories.includes(el.tag));
  if (nouns.length == 1) {
    // return the only noun
    return nouns[0].token;
  }
  // search for verb pronoun preceeding or verb 3rd person
  const verbIndex = taggedWords.findIndex((el) =>
    ["VBP", "VBZ"].includes(el.tag)
  );
  const nounIndex = verbIndex + 1;
  try {
    return taggedWords[nounIndex].token;
  } catch (err) {
    // index error
    return null;
  }
}
module.exports = extractName;
