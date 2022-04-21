import './App.css';
import React, { useEffect, useState, createContext } from 'react'
import Students from './components/Students'; 
export const StudentsContext = createContext([]);


function App() {
  const api = 'https://api.hatchways.io/assessment/students';
  const [studs, setStuds] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(api)
      setStuds((await res.json()).students)
    }
    fetchData()
  }, [])
  // console.log(studs)
  return (
    <StudentsContext.Provider value={{ studs, setStuds}}>
      <div className="App">
        <Students />
        {/* <Chart/> */}
      </div>
    </StudentsContext.Provider>
  );
}

export default App;
