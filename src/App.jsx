import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const handleColorChange = (e) => {
    // TODO: SET THE STATE OF THE COLOR TO THE VALUE OF PARAMETER 'e'
    ctxRef.current.strokeStyle = e.target.value;
  };

  const handleBrushSizeChange = (e) => {
    // TODO: SET THE STATE OF THE BRUSH SIZE TO THE VALUE OF PARAMETER 'e'
    ctxRef.current.lineWidth = e.target.value;
  };

  const setEraser = () => {
    // TODO: Implement setEraser()
  };

  const exportCanvas = () => {};

  return (
    <div className="App">
      <div className="controls">
        <label>
          <span>Color:</span>
          <input type="color" value={color} onChange={handleColorChange} />
        </label>
        <label>
          <span>Brush Size:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={handleBrushSizeChange}
          />
        </label>
        <button onClick={setEraser}>Erase</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onMouseLeave={finishDrawing}
        className="canvas"
      />

      {/* TODO: EXPORT BUTTON */}
      {/* Remember to use the onClick attribute for buttons to execute a function... */}
    </div>
  );
};

export default App;
