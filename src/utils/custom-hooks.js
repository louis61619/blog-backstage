import { useCallback, useState } from "react"


export const useChangeList = (func) => {
  const [list, setList] = useState([])
  const [count, setCount] = useState()
  const [changeFun, setChangeFun] = useState(() => func)

  const changeList = useCallback((page) => {
    changeFun((page - 1) * 8, 8).then(res => {
      console.log(res)
      setList(res.data)
      setCount(res.count)
    })
  }, [setList, setCount, changeFun])

  return [list, count, changeList, setList, setChangeFun]
}
