import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'
import './App.css';
import axios from 'axios';

 
function App() {
  const modal = useRef(null)
  const [data, setData] = useState([]);
  const [selectedImg, setSelectedImg] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://picsum.photos/v2/list',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);

  const setModal = (imgUrl) => {
    data.map(item => (
      setSelectedImg(imgUrl)
    ))
    modal.current.open()
  }
 
  return (
    <>
    <div className="App">
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <img src={item.download_url} alt="" title={item.author} onClick={() => setModal(item.download_url)}/>
          <div className="details">
            <p>{item.author}</p>
          </div>
        </li>
      ))}
    </ul>
    </div>
    <Modal ref={modal}>
      <img src={selectedImg} alt=""/>
      </Modal>
    </>
  )
}
 
export default App;