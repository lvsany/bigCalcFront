import React, { useState, useEffect, useRef } from 'react';

const Canvas = React.forwardRef((props, ref) => {
  const { width, height } = props;
  const canvasRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [tool, setTool] = useState('Pencil');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.path[0].x, line.path[0].y);
      line.path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = line.tool === 'Pencil' ? 'black' : 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [lines]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    // if (tool !== 'Eraser') {
      const newLine = {
        tool,
        path: [{ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }],
      };
      setLines((prev) => [...prev, newLine]);
    // }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    if (tool === 'Eraser') {

      // Eraser tool
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(e.nativeEvent.offsetX - 10, e.nativeEvent.offsetY - 10, 20, 20);
    } else {
      const updatedLines = [...lines];
      const currentLine = updatedLines[updatedLines.length - 1];
      currentLine.path.push({
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      });
      setLines(updatedLines);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleUndo = () => {
    if (lines.length > 0) {
      setLines(lines.slice(0, -1));
    }
  };

  const handleClear = () => {
    setLines([]);
  };

  const handleScreenshot = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'canvas-screenshot.png';
    a.click();
  };

  useEffect(() => {
    if (ref) {
      ref.current = {
        setTool,
        handleUndo,
        handleClear,
        handleScreenshot,
      };
    }
  }, [lines]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
});

export default Canvas;