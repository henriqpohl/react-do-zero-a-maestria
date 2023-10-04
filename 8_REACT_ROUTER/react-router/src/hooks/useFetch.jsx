// React
import { useState, useEffect } from "react"

// 4 - Custom Hook
export const useFetch = (url) => {
  const [data, setData] = useState(null)

  // 5 - Rafatorando POST
  const [config, setConfig] = useState(null)
  const [method, setMethod] = useState(null)
  const [callFetch, setCallFetch] = useState(false)

  // 6 - Loading
  const [loading, setLoading] = useState(false)

  // 7 -  Tratando Erro
  const [error, setError] = useState(null)

  // 9 - Desafio
  const [itemId, setItemId] = useState(null)

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setMethod(method)
    } // 9 - Desafio 
      else if (method === "DELETE") {
      setConfig({
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      setMethod("DELETE")
      setItemId(data)
    }
  }

  useEffect(() => {
    const fetchdata = async () => {

      
      // 6 - Loading
      setLoading(true)
      
      try {
        const res = await fetch(url)

        const json = await res.json()

        setData(json)
      } catch (error) {
        //console.log(error.message)
        setError("Houve algum erro ao carregar os dados!")
      }

      setLoading(false)


    }

    fetchdata()
    // const fetchData = async () => {
    //   const res = await fetch(url)
    //     .then((res) => res.json())
    //     .then((json) => setData(json))
    // }

    // fetchData()
  }, [url, callFetch])

  // 5 - Refatorando POST
  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config]
        const res = await fetch(...fetchOptions)
        const json = await res.json()

        setCallFetch(json)
      } // 9 - Desafio
        else if (method === "DELETE") {
        const deleteUrl = `${url}/${itemId}`

        const res = await fetch(deleteUrl, config)

        const json = await res.json()

        setCallFetch(json)
      }
    }

    httpRequest()
  }, [config, method,])

  return {data, httpConfig, loading, error}
}
