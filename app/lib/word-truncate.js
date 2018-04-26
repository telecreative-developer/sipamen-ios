export const wordTruncate = (word, length) => {
  let words = word.substr(0, length)
  return words.substr(0, Math.min(words.length, words.lastIndexOf(" ")))
}