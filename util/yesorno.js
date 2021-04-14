const yes_array = [
  "yes",
  "of",
  "yea",
  "allright",
  "good",
  "yeah",
  "yup",
  ,
  "yep",
  "totally",
  "sure",
  "ya",
  "right",
  "alright",
  "okay",
  "kay",
];
const no_array = ["no", "nah", "nope", "nay", "not", "don't"];

function isSayingYes(string) {
  const string_parts = string.trim().split(" ");
  for (const part of string_parts) {
    if (yes_array.includes(part)) {
      return true;
    }
  }
  return false;
}

function isSayingNo(string) {
  const string_parts = string.trim().split(" ");
  for (const part of string_parts) {
    if (no_array.includes(part)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  isSayingYes,
  isSayingNo,
};
