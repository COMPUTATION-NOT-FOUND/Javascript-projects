import React, { useRef, useEffect, useState } from 'react';

const SandSimulator = ({gridlines,colour}) => {
  const canvasRef = useRef(null);
  const gridRef = useRef([]);
  const canvasWidth = 500; 
  const canvasHeight = 500; 
  const [isDragging, setIsDragging] = useState(false);
  const colorRef = useRef({h:0.1,s:255 ,l:255});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    
    const rows = canvasHeight/10;
    const columns = canvasWidth/10;

  
    const updatecolour = () =>{
    if(!colour) return 'white';
    colorRef.current.h+=1;

    if(colorRef.current.h>360){
      colorRef.current.h-=360;
    }
    return `hsl(${colorRef.current.h},100%,50%)`;
     }

    const Make2dArray = (rows,columns)=>{
        let array =[];
        for (let i = 0; i < columns; i++) {
            array[i] = [];
            for (let j = 0; j < rows; j++) {
              array[i][j] = 0;
            }
        }
        return array;

    };
 
    const MakeGridPattern = () => {
      context.strokeStyle = 'white';
      context.lineWidth = 2;
      for (let i = 0; i < rows; i++){
        context.beginPath();
        context.moveTo(i * 10, 0);
        context.lineTo(i * 10, canvasHeight);
        context.stroke();
      }
      for (let j = 0; j < columns; j++){
        context.beginPath();
        context.moveTo(0, j * 10);
        context.lineTo(canvasWidth, j * 10);
        context.stroke();
      }

    };
    
    const Init = () => {
      if (gridRef.current.length) return;
      gridRef.current = Array.from({ length: columns }, () => Array.from({ length: rows }, () => 0));
      MakeGridPattern();
    };


    const Draw = () => {
      context.fillStyle = 'black';
      context.clearRect(0,0,canvasWidth, canvasHeight) ;
      if(gridlines)
      MakeGridPattern();
      context.fillStyle = updatecolour();
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (gridRef.current[i][j] === 1) {
            context.fillRect(i*10, j*10, 10, 10); 
          }
        }
      }
    };
  

    const UpdateGrid = ( ) => { 
      const grid = gridRef.current;
      let nextgrid = Make2dArray(rows,columns);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns ; j++) {
          if(grid[i][j]!==1){
            continue;
          }
          

          if(  j<rows-1 && grid[i][j+1]===0  ){
          nextgrid[i][j+1]=1;
          }
          
          else if(  j<rows-1 && i <columns-1 && grid[i+1][j+1]===0 ){
            nextgrid[i+1][j+1]=1;
          }
          else if( j <rows-1 && i>0 && grid[i-1][j+1]===0  ){
            nextgrid[i-1][j+1]=1;
          }

          else{
          nextgrid[i][j]=1;
          }
        }
      }
       gridRef.current=nextgrid;
    }; 

    const animate = () =>{
        Draw();
        UpdateGrid();
        requestAnimationFrame(animate);  
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };
  
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      const grid=gridRef.current;
        if (isDragging)
        {const rect =canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX -rect.left)/10);
        const y = Math.floor((e.clientY -rect.top)/10);
        if(x>=0 && x< columns && y>=0 && y<rows){
            grid[x][y]=1;
        }}
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    Init();
    animate();
   

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousemove', handleMouseMove);
      };


}, [isDragging, gridlines]);

return <canvas ref={canvasRef}></canvas>;
};
export default SandSimulator;