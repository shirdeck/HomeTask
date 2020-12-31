import React from 'react'
import ProgressiveImage from "react-progressive-graceful-image"
import loading from './loading.png'

const List = ({data, setModal}) => {
    return (
<ul>
            {data.map((item) => (
              <li key={item.id}>
                <ProgressiveImage src={item.download_url} placeholder={loading}>
  {(src, loading) => (
    <img style={{ opacity: loading ? 0.5 : 1 }} src={src} alt="" />
  )}
</ProgressiveImage>
                <div
                  className="details"
                  onClick={() => setModal(item.download_url)}
                >
                  <p>{item.author}</p>
                </div>
              </li>
            ))}
          </ul>
    )
}

export default List