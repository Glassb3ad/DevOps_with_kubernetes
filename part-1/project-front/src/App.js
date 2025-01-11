import React from 'react';

const ListItem = ({ todo }) => <li className="py-3 px-4 rounded-lg border bg-white">{todo}</li>

function App() {
  return (
    <div className="w-100 h-100 content-center justify-items-center bg-slate-200 p-8">
      <h1 className="font-semibold m-4 text-2xl text-sky-800">TODO Application</h1>
      <div className="shadow box-content border-1 border-slate-500 bg-slate-100 content-center justify-items-center p-10 rounded-md">
        <div>
          <img src={"/hourly-image"} alt="random image" style={{ width: "100%", maxWidth: "400px" }} />
          <div className="flex flex-col mt-4">
            <input id="new-task" className="py-3 px-4 block w-full border-2" placeholder="new task" />
            <button className="mt-2 py-3 px-4 ml-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:bg-sky-700">Create</button>
            <div className='mt-4'>
              <h2 className="font-semibold text-lg text-sky-800">Tasks</h2>
              <ul>
                <ListItem todo="Task 1" />
                <ListItem todo="Task 2" />
                <ListItem todo="Task 3" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
