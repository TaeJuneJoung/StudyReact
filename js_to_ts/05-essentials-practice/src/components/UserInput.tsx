import type {INVESTMENT_TYPE} from '../util/investment'

type UserInputProps = {
  userInput: INVESTMENT_TYPE
  onChange: (type: string, value: number) => void
}

export default function UserInput({onChange, userInput}: UserInputProps) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            value={userInput.initialInvestment}
            onChange={event =>
              onChange('initialInvestment', parseInt(event.target.value))
            }
            required
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            value={userInput.annualInvestment}
            onChange={event => onChange('annualInvestment', parseInt(event.target.value))}
            required
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            value={userInput.expectedReturn}
            onChange={event => onChange('expectedReturn', parseInt(event.target.value))}
            required
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            value={userInput.duration}
            onChange={event => onChange('duration', parseInt(event.target.value))}
            required
          />
        </p>
      </div>
    </section>
  )
}
