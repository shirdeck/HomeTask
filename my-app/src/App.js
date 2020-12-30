import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal'
import './app.css';
import axios from 'axios';

 
function App() {
  const modal = useRef(null)
  const [data, setData] = useState([]);
  const [selectedImg, setSelectedImg] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
      const result = await axios(
        'https://picsum.photos/v2/list',
      );
 
      setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
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
      {isError && <div>Some went wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
<ul>
      {data.map(item => (
        <li key={item.id}>
          <img src={item.download_url} alt="" title={item.author} />
          <div className="details" onClick={() => setModal(item.download_url)}>
            <p>{item.author}</p>
          </div>
        </li>
      ))}
    </ul>
      )}
    </div>
    <Modal ref={modal}>
      <img src={selectedImg} alt=""/>
      </Modal>
    </>
  )
}
 
export default App;