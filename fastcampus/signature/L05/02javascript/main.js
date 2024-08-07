const h1El = document.querySelector("h1");
const h2El = document.querySelector("h2");

/*
// 별도의 상태 관리 필요
let h1IsRed = false;
let h2IsRed = false;

h1El.addEventListener("click", (event) => {
  h1IsRed = !h1IsRed;
  h1El.style.color = h1IsRed ? "red" : "black";
});

h2El.addEventListener("click", (event) => {
  h2IsRed = !h2IsRed;
  h2El.style.color = h2IsRed ? "red" : "black";
});
*/

// 하나의 함수로 처리
const createToggleHandler = () => {
  let isGreen = false;
  return (event) => {
    isGreen = !isGreen;
    event.target.style.color = isGreen ? "green" : "black";
  };
};

h1El.addEventListener("click", createToggleHandler());
h2El.addEventListener("click", createToggleHandler());
// 함수를 호출했는데 함수가 호출하면 return키워드로 반환되는 데이터가 남는다.
/* 반환되는 데이터
(event) => {
  isGreen = !isGreen;
  event.target.style.color = isGreen ? "green" : "black";
};
*/
