import React, { useRef, useEffect, useState } from 'react';

const SandSimulator = () => {
  const canvasRef = useRef(null);
  const canvasWidth = 400; 
  const canvasHeight = 400; 
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    

    const rows = canvasHeight/10;
    const columns = canvasWidth/10;

    let grid = [];

    const make2darray = (rows,columns)=>{
        let array =[];
        for (let i = 0; i < columns; i++) {
            array[i] = [];
            for (let j = 0; j < rows; j++) {
              array[i][j] = 0;
            }
        }
        return array;

    };

    const init = () => {
        let count=0;
        context.strokeStyle = 'white';
        context.lineWidth = 2; 
        for (let i = 0; i < columns; i++) {
            grid[i] = [];
            context.beginPath();
            context.moveTo(i * 10, 0);
            context.lineTo(i * 10, canvasHeight);
            context.stroke();
            for (let j = 0; j < rows; j++) {
                grid[i][j] = 0;
                if(count==0)
                    {context.beginPath();
                    context.moveTo(0, j * 10);
                    context.lineTo(canvasWidth, j * 10);
                    context.stroke();}
        }
        count+=1;
      }
    };


    const draw = () => {
        
        context.fillStyle = 'white';
        for (let i = 0; i < columns; i++) {
          for (let j = 0; j < rows; j++) {
            if (grid[i][j] === 1) {
              context.fillRect(i*10, j*10, 10, 10); // Draw sand particle
            }
          }
        }
      };
  

    const updategrid = ( ) => {
        let nextgrid=make2darray(rows,columns);
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                if(grid[i][j]===1){
                    if(grid[i][j+1]===0 && j <rows ){
                    nextgrid[i][j+1]=1;
                    context.clearRect(i*10 +1  ,j*10 +1, 8, 8);
                    }
                    else{
                     nextgrid[i][j]=1;
                    }
                }
            }
        }    
        grid=nextgrid;
    }; 

    const animate = () =>{
        updategrid();
        draw();
        requestAnimationFrame(animate);  
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };
  
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
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

    init();
    animate();
   

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousemove', handleMouseMove);
      };


}, [isDragging]);

return <canvas ref={canvasRef}></canvas>;
};
export default SandSimulator;