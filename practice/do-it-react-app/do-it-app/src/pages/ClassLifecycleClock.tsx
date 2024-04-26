import {Component, ReactNode} from 'react'
import {clearInterval} from 'timers'
import {Title} from '../components'

export default class ClassLifecycleClock extends Component {
  state = {
    today: new Date(),
    intervalId: null as unknown as NodeJS.Timer // 타입스크립트 요구 구현 방식
  }

  componentDidMount(): void {
    const duration = 1000
    const intervalId = setInterval(() => this.setState({today: new Date()}), duration)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount(): void {
    clearInterval(this.state?.intervalId)
  }

  render(): ReactNode {
    const {today} = this.state
    return (
      <section className="mt-4">
        <Title>ClassLifecycle Clock</Title>
        <div className="flex flex-col items-center mt-4">
          <p className="font-mono text-3xl">{today.toLocaleTimeString()}</p>
          <p className="font-mono text-3xl">{today.toLocaleDateString()}</p>
        </div>
      </section>
    )
  }
}
