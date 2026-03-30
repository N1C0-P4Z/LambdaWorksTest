const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return emailRegex.test(value);
}

module.exports = { normalizeString, isValidEmail };
