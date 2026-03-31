const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneARRegex = /^\+54\s?[0-9\s()-]{8,20}$/;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return emailRegex.test(value);
}

function isValidPhoneAR(value) {
  return phoneARRegex.test(value);
}

module.exports = { normalizeString, isValidEmail, isValidPhoneAR };
