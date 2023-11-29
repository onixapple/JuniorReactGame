import './App.css'
import _ from 'lodash'
import ReactGame from './components/capitalsGame'

function App() {

  return (
    <>
      <ReactGame data={{ Germany: "Berlin", Moldova: "Chisinau" }} />
    </>
  )
}

export default App
