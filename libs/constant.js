export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export const blockchainList = [
  { chain: "Arbitrum", id: 1 },
  { chain: "Ethereum", id: 2 },
  { chain: "Binance", id: 3 },
  { chain: "Polygon", id: 4 },
  { chain: "Avalanche", id: 5 },
  { chain: "Polygon", id: 6 },
  { chain: "Optimism", id: 8 },
  { chain: "Fuse Network", id: 15 },
  { chain: "Fantom Opera", id: 16 },
  { chain: "Optimism", id: 24 },
  { chain: "Binance Chain", id: 25 },
];

export function random() {
  return Math.floor(Math.random() * 10000000);
}

export function getRandomLetter() {
  // Generate a random number between 0 and 25 (inclusive)
  const randomNumber = Math.floor(Math.random() * 26);

  // Convert the random number to its corresponding ASCII code for lowercase letters ('a' to 'z')
  const randomCharCode = 97 + randomNumber;

  // Convert the ASCII code to its corresponding letter
  const randomLetter = String.fromCharCode(randomCharCode);

  return randomLetter;
}
