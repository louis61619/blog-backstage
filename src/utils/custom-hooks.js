import { useCallback, useState } from "react"


export const useChangeList = (changeFun) => {
  const [list, setList] = useState([])
  const [count, setCount] = useState()

  const changeList = useCallback((page) => {
    changeFun((page - 1) * 8, 8).then(res => {
      setList(res.data)
      setCount(res.count)
    })
  }, [setList, setCount, changeFun])

  return [list, count, changeList, setList]
}
