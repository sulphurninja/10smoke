import { useState } from 'react'

export default function SalesPerc() {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim() === '') return
    setList([...list, value])
    setValue('')
  }

  return (
    <div className="flex flex-col items-center  text-white justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none  bg-white border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Type something here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            ON
          </button>
        </div>
      </form>
      <table className="table-auto mt-5">
        <thead>
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
