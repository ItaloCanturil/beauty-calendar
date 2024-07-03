"use client"

import * as React from "react"

interface DateTime {
  date: string, hours: string
}

export default function Home() {
  const [dateAvailable, setDateAvailable] = React.useState<DateTime[]>([])
  const [date, setDate] = React.useState({
    date: '',
    hours: ''
  })

  const handleDataChange = (e: any) => {
    const { name, value} = e.target;

    setDate({
      ...date,
      [name]: value
    })
  }

  const addDateTime = () => {
    setDateAvailable(prevDates => [...prevDates, {date: date.date, hours: date.hours}])

    console.log(dateAvailable, date)
  }

  const removeDate = (e) => {
    console.log("🚀 ~ removeDate ~ e:", e)

    const newDates = dateAvailable.filter((_, i) => i !== e);

    console.log("🚀 ~ removeDate ~ dateAvailable:", dateAvailable)
    setDateAvailable(newDates)
  }

  return (
    <main className="min-h-screen grid grid-cols-2 p-24">
      <div className="flex items-center flex-col gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="date">
            Selecione a data: 
            <input className="ml-2" type="date" name="date" id="date" onChange={handleDataChange}/>
          </label>
          <label htmlFor="hours">
            Selecione a hora: 
            <input className="ml-2" type="time" name="hours" id="time" onChange={handleDataChange}/>
          </label>
        </div>
        <button className="mt-3 bg-slate-500 rounded-lg p-2" onClick={addDateTime}>Adicionar horário a lista</button>
      </div>


      <div className="justify-self-center">
        <h2>Horários disponíveis:</h2>
        <ol>
          {dateAvailable?.map((date, index) => (
            <li className="my-2" key={index}>
              <div className="flex items-center gap-2">
                <span>{`${date.date} ${date.hours}` }</span>

                <button className="p-1 rounded-full bg-red-500" onClick={() => removeDate(index)}>X</button>
              </div>
            </li>
          ))}
        </ol>

        <div>
          <button className="mt-3 bg-orange-600 rounded-lg p-2">Adicionar horários</button>
        </div>
      </div>
    </main>
  );
}
