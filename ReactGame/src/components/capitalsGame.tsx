import { useState } from 'react'
import _ from 'lodash'


type ButtonState = 'DEFAULT' | 'SELECTED' | 'WRONG'
type Option = {
  value: string,
  state: ButtonState
}

export function getClassName (option: Option) {
    if(option.state === 'SELECTED') {
        return "selected"
    }else if (option.state === 'WRONG'){
        return "wrong"
    }else {
        return ""
    }
}

export default function ReactGame({ data }: { data: Record<string, string> }) {
  const countries = Object.keys(data)
  const capitals = Object.values(data)


  //using lodash libary, randomising the array
  const [options, setOptions] = useState<Option[]>(_.shuffle([...countries, ...capitals]).map((value) => ({
    value,
    state: "DEFAULT"
  })))

  const [selected, setSelected] = useState<Option>()
  const isGameOver = options.length === 0

  if(isGameOver){
    return <div>Congrtulations!</div>
  }


  //normal
  //const options = [... countries, ...capitals]
  //options.sort(() => Math.random() -0.5)

  return (
    <>{options.map((option) => (
      <button
        className={getClassName(option)}
        key={option.value}
        onClick={() => {
          if (!selected) {

            setOptions(options.map((opt) => ({
              ...opt, state: 'DEFAULT'
            })))

            setSelected(option)
            setOptions(options.map(opt => {
              return opt === option ? {
                ...opt,
                state: 'SELECTED'

              } :{ ...opt, state: 'DEFAULT'}
            }))
          } else {
            if (selected.value === data[option.value] ||
              data[selected.value] === option.value) {
              setOptions(options.filter((opt) => {
                return !(opt.value === selected.value || opt.value === option.value)
              }))
            } else {
              //wrong pair 
              setOptions(options.map((opt) => {
                return opt.value === selected.value || opt.value === option.value ? { ...opt, state: 'WRONG' } : opt
              }))
            }
            setSelected(undefined)
          }
        }}
      >{option.value}</button>
    ))}</>
  )
}