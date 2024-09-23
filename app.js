document.addEventListener("DOMContentLoaded", function () {
  const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const outputDiv = document.querySelector("#result");
  const encryptButton = document.getElementById("encryptButton");
  if (encryptButton) {
    encryptButton.addEventListener("click", function () {
      const plainText = document.getElementById("plainText").value;
      const key = document.getElementById("key").value;
      if (plainText && key) {
        const encryptedText = vigenereCipher(plainText, key, true);
        outputDiv.textContent = "Encrypted Text: " + encryptedText;
        console.log(plainText);
        console.log(encryptedText);
      } else {
        alert("Please enter both text and a key to encrypt.");
      }
    });
  }
  const decryptButton = document.getElementById("decryptButton");
  if (decryptButton) {
    decryptButton.addEventListener("click", function () {
      const cipherText = document.getElementById("ctText").value;
      const key = document.getElementById("key").value;
      if (cipherText && key) {
        const decryptedText = vigenereCipher(cipherText, key, false);
        outputDiv.textContent = "Decrypted Text: " + decryptedText;
        console.log(decryptedText);
      } else {
        alert("Please enter both text and a key to decrypt.");
      }
    });
  }
  function vigenereCipher(text, key, encrypt = true) {
    let result = "";
    let keyIndex = 0;
    const keyLength = key.length;
    for (let i = 0; i < text.length; i++) {
      let currentChar = text[i];
      let isUpperCase = uppercaseAlphabet.includes(currentChar);
      let isLowerCase = lowercaseAlphabet.includes(currentChar);
      if (isUpperCase || isLowerCase) {
        let alphabet = isUpperCase ? uppercaseAlphabet : lowercaseAlphabet;
        let currentIndex = alphabet.indexOf(currentChar);
        let keyChar = key[keyIndex % keyLength];
        let keyIndexInAlphabet = isUpperCase ? uppercaseAlphabet.indexOf(keyChar.toUpperCase()) : lowercaseAlphabet.indexOf(keyChar.toLowerCase());
        let newIndex;
        if (encrypt) {
          newIndex = (currentIndex + keyIndexInAlphabet) % 26;
        } else {
          newIndex = (currentIndex - keyIndexInAlphabet + 26) % 26;
        }
        result += alphabet[newIndex];
        keyIndex++;
      } else {
        result += currentChar;
      }
    }
    return result;
  }
});
