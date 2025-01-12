import React, { useState } from 'react';
import axios from "axios"
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

const API_URL = '/tasks'
const ListItem = ({ todo }) => <li className="py-3 px-4 rounded-lg border bg-white">{todo}</li>

const App = () => {
  const queryClient = useQueryClient()
  const [task, setTask] = useState('');

  const { data, isFetching } = useQuery({
    queryKey: ['tasks'], queryFn: async () => {
      const response = await fetch(
        API_URL,
      )
      return await response.json()
    }
  })

  const mutation = useMutation({
    mutationFn: (task) => {
      return axios.post(API_URL, { task })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
  const input = document.getElementById('new-task')

  return (
    <div className="w-100 h-100 min-h-screen content-center justify-items-center bg-slate-200 p-8">
      <h1 className="font-semibold m-4 text-2xl text-sky-800">TODO Application</h1>
      <div className="shadow box-content border-1 border-slate-500 bg-slate-100 content-center justify-items-center p-10 rounded-md">
        <div>
          <img src={"/hourly-image"} alt="random image" style={{ width: "100%", maxWidth: "400px" }} />
          <div className="flex flex-col mt-4">
            <input value={task} onChange={(e) => setTask(e.target.value)} id="new-task" className="py-3 px-4 block w-full border-2" placeholder="new task" />
            <button
              onClick={() => {
                if (task) {
                  mutation.mutate(task)
                  setTask("")
                }
              }}
              className="mt-2 py-3 px-4 ml-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:bg-sky-700">Create
            </button>
            <div className='mt-4'>
              <h2 className="font-semibold text-lg text-sky-800">Tasks</h2>
              {!isFetching ?
                <ul>
                  {data?.tasks?.map(task => <ListItem todo={task} />)}
                </ul> : "Fetching tasks..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
