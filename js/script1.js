// Daftar substitusi homofonik
const homophonicSubstitution = {
  'a': ['x', 'y', 'z'],
  'b': ['p', 'q'],
  'c': ['r', 's', 't'],
  'd': ['l', 'm'],
  'e': ['a', 'b', 'c', 'd', 'e'],
  'f': ['f'],
  'g': ['g'],
  'h': ['h'],
  'i': ['i'],
  'j': ['j'],
  'k': ['k'],
  'l': ['l'],
  'm': ['m'],
  'n': ['n'],
  'o': ['o'],
  'p': ['p'],
  'q': ['q'],
  'r': ['r'],
  's': ['s'],
  't': ['t'],
  'u': ['u'],
  'v': ['v'],
  'w': ['w'],
  'x': ['x'],
  'y': ['y'],
  'z': ['z'],
};
const displayCharacter = document.getElementById("character-display");
function encryptCaesarHomophonic(plaintext, shift) {
  let ciphertext = '';
  let totalCharcter = 0;

  for (let char of plaintext.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      let shiftedChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));
      const substitutes = homophonicSubstitution[shiftedChar];
      if (substitutes) {
        const randomSubstitute = substitutes[Math.floor(Math.random() * substitutes.length)];
        ciphertext += randomSubstitute;
        totalCharcter += 1;
      }
    } else {
      ciphertext += char; // Jika bukan huruf, tambahkan karakter asli
    }
  }
  displayCharacter.textContent = totalCharcter;
  return ciphertext;
}

function decryptCaesarHomophonic(ciphertext, shift) {
  let plaintext = '';

  for (let char of ciphertext) {
    let found = false;
    for (const [key, substitutes] of Object.entries(homophonicSubstitution)) {
      if (substitutes.includes(char)) {
        let shiftedIndex = (key.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26;
        plaintext += String.fromCharCode(shiftedIndex + 'a'.charCodeAt(0));
        found = true;
        break;
      }
    }
    if (!found) {
      plaintext += char; // Jika bukan huruf, tambahkan karakter asli
    }
  }

  return plaintext;
}

// Event listeners untuk input
const inputPlaintext = document.getElementById('input-plaintext');
const inputCiphertext = document.getElementById('input-ciphertext');
const inputShift = document.getElementById('input-shift');

inputPlaintext.addEventListener('input', () => {
  const shiftValue = parseInt(inputShift.value, 10);
  inputCiphertext.value = encryptCaesarHomophonic(inputPlaintext.value, shiftValue);
});

inputCiphertext.addEventListener('input', () => {
  const shiftValue = parseInt(inputShift.value, 10);
  inputPlaintext.value = decryptCaesarHomophonic(inputCiphertext.value, shiftValue);
});