import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <p>{props.text} {props.value}</p>
)


const Statistics = (props) => {
  if(props.total > 0){
    return(
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.total} />
        <StatisticLine text="average" value ={(props.good - props.bad)/props.total} />
        <StatisticLine text="positive" value ={(props.good/props.total)*100 +'%'}/>        
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <h3>No feedback given</h3>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () =>{
  const updatedGood = good + 1
   setGood(updatedGood)
   setTotal(updatedGood + neutral + bad)
  }
  const handleNeutralClick = () =>{
     const updatedNeutral = neutral + 1
     setNeutral(updatedNeutral)
     setTotal(good + updatedNeutral + bad)
    }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"/>
      <Button handleClick={handleNeutralClick} text="neutral"/>
      <Button handleClick={handleBadClick} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

export default App;
