import React, { useRef, useState, useEffect } from 'react';
import Canvas from './Canvas';
import PersistentDrawerLeft from './PersistentDrawerLeft';
import ControlledOpenSpeedDial from './ControlledOpenSpeedDial';

function MainPage() {
  const canvasRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const MyAction = (action) => {
    switch (action) {
      case 'Pencil':
        canvasRef.current?.setTool('Pencil');
        break;
      case 'Eraser':
        canvasRef.current?.setTool('Eraser');
        break;
      case 'Undo':
        canvasRef.current?.handleUndo();
        break;
      case 'Clear':
        canvasRef.current?.handleClear();
        break;
      case 'Screenshot':  // New case for Screenshot
        canvasRef.current?.handleScreenshot();
        break;
      default:
        break;
    }
  };
  
  

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="MainPage" style={{ height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <Canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <PersistentDrawerLeft />
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <ControlledOpenSpeedDial OnAction={MyAction} />
      </div>
    </div>
  );
}

export default MainPage;