# Section07: Debugging

Section 05내용과 크게 다른건 없음.

## Strict Mode

```jsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

엄격모드 실행시에 컴포넌트들이 두 번씩 실행된다.

왜 굳이 두 번씩 실행되어야 하는가에 대해서는 다음과 같은 문제를 보여줄 수 있기 때문이다.

```jsx
// Results.jsx
import { calculateInvestmentResults, formatter } from "../util/investment.js";

const results = [];

export default function Results({ input }) {
  calculateInvestmentResults(input, results);

  if (results.length === 0) {
    return <p className="center">Invalid input data provided.</p>;
  }

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
```

`results`가 함수 안이 아니라 밖에 위치하게 된다면 값들이 한 차례 더 돌아서 쓰여지게 된다. 이러한 문제들을 파악할 수 있게 해주기 때문이다.

## React DevTools 사용하기

Chrome Extesion 설치
