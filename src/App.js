import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';
import Chats from './components/Chats/Chats';

export const DataContext = createContext();
const socket = io.connect('https://still-cove-60578.herokuapp.com');

function App() {

  return (
    <>
      <BrowserRouter>
        <DataContext.Provider
          value={{
            socket
          }}
        >
          <Routes>
            <Route path="/" element={<Chats />}>
              <Route path="room/:roomID" element={<Chats />} />
            </Route>
          </Routes>
        </DataContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
