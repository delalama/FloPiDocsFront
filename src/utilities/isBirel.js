
export default function isBirel(string) {
  var isBirel = Boolean(string.substring(0, 4).toLowerCase() === "bire");
  const message = document.getElementById("message");
  isBirel ? (message.innerHTML = "Pues cuelga") : (message.innerHTML = "");
}
