import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import "./app.css";
import axios from "axios";
import { CircularProgress } from '@material-ui/core';
import List from './List'


function App() {
  const modal = useRef(null);
  const [data, setData] = useState([]);
  const [selectedImg, setSelectedImg] = useState();

  // Loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Error Handling
  const [isError, setIsError] = useState(false);

  // Used useEffect Hook to fetch data with axios and error handling
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios("https://picsum.photos/v2/list");

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const setModal = (imgUrl) => {
    data.map((item) => setSelectedImg(imgUrl));
    modal.current.open();
  };

  return (
    <>
      <div className="App">
        {isError && <div>Some went wrong...</div>}
        {isLoading ? (
          <CircularProgress disableShrink />
        ) : (
          <List data={data} setModal={setModal}/>
        )}
      </div>
      <Modal ref={modal}>
        <img src={selectedImg} alt="" />
      </Modal>
    </>
  );
}

export default App;
