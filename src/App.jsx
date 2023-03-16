import { useState } from 'react';
import './App.css'
import UpbeatGrid from './components/UpbeatGrid'

function App() {
  const [zoom, setZoom] = useState(1);
  const rows = 20;
  const cols = 20;
  const gridWidth = 500;
  const containerWidth = 600;
  const containerHeight = 600;

  return (
    <div className="App">
      <div className='grid-container' style={{ width: containerWidth, height: containerHeight }}>
        <UpbeatGrid Rows={rows} Cols={cols} GridWidth={gridWidth * zoom} containerWidth={containerWidth} containerHeight={containerHeight} />
      </div>
      <button disabled>Zoom: {zoom}x</button>
      <button onClick={() => setZoom((prev) => {
        if (prev >= 2)
          return prev
        else
          return prev + 0.25
      })}>Zoom In</button>
      <button onClick={() => setZoom((prev) => {
        if (prev <= 1)
          return prev
        else
          return prev - 0.25
      })}>Zoom Out</button>
    </div>
  )
}

export default App
