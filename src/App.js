import './App.css';
import Container from './components/Container.jsx'
import Display from './components/Display.jsx'

function App() {
  window.addEventListener("keydown", async (e) => {
    e.stopPropagation()
    e.stopImmediatePropagation()
    let keyCode = e.keyCode;
    console.log(e.keyCode)
    if ((keyCode > 96 && keyCode < 108) || (keyCode > 47 && keyCode < 58) || ([223, 221, 189, 13, 109, 106, 111, 8].includes(keyCode))) {
      let displayScreen = document.getElementById("disp")
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)) {
        displayScreen.innerText += e.key;
      } else if (["-", "+", "*", "/"].includes(e.key)) {
        if (["-", "+", "*", "/"].some(expr => displayScreen.innerText.includes(expr))) return;
        if (displayScreen.innerText.length < 1) return;
        displayScreen.innerText += e.key;
      } else if (e.key === "Backspace") {
        return displayScreen.innerText = displayScreen.innerText.slice(0, displayScreen.innerText.length - 1)
      } else if (e.key === "Enter") {
        if (["-", "*", "/", "+"].some(expr => displayScreen.innerText.includes(expr) && displayScreen.innerText.charAt(displayScreen.innerText.length - 1) !== expr)) {
          async function calculate(expr) {
            if (expr.includes("-")) {
              let splitted = expr.split("-");
              let result = Math.floor(splitted[0]) - Math.floor(splitted[1])
              return result;
            } else if (expr.includes("+")) {
              let splitted = expr.split("+");
              let result = Math.floor(splitted[0]) + Math.floor(splitted[1])
              return result;
            } else if (expr.includes("/")) {
              let splitted = expr.split("/");
              let result = Math.floor(splitted[0]) / Math.floor(splitted[1])
              return result;
            } else if (expr.includes("*")) {
              let splitted = expr.split("*");
              let result = Math.floor(splitted[0]) * Math.floor(splitted[1])
              return result;
            }
          }
          let result = await calculate(displayScreen.innerText)
          displayScreen.innerText = result;
        }
      }
    }

  })
  return (
    <div className="App">
      <Display />
      <Container />
    </div>
  );
}

export default App;
