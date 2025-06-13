'use client'

import { client } from "@/utils/client";
import { useEffect, useState } from "react";


export default function Home() {
  const [title, setTitle] = useState('')
  const [result, setResult] = useState('')
  const [works, setWorks] = useState<{ id: number, title: string }[]>([])

  const handleClick = async () => {
    try{
      const res = await client['/api/works'].$post({ json: { title } })
      if (res.ok){
         const data = await res.json()
         setResult('Add:' + data.work.title)
         setTitle('')
         await getWorks()
      } else {
        setResult('Failed to add work')
      }
    } catch (err: any ){
      setResult('Error: ' + err.message)
    }
  }

  const getWorks = async () => {
    const res = await client['/api/works'].$get()
    if (res.ok){
      const data = await res.json()
      setWorks(data.works)
    }
  }

  useEffect(() => {
    getWorks()
  }, [])

  return (
    <div>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter a title"
      />
      <button onClick={handleClick}>Add Work</button>
      <div>{result}</div>
      <h2>Works List</h2>
      <ul>
        {works.map(w => (
          <li key={w.id}>{w.title}</li>
        ))}
      </ul>
    </div>
  )
}