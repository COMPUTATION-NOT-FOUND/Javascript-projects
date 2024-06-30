//App.jsx
import React , {useState }from 'react';
import SandSimulator from './SandSimulator';


function App() {
const [gridlines ,SetGridlines] = useState(true);
const [colour,SetColour] = useState(false);
return(
<div>
<h1 className="title"> <a href="https://github.com/COMPUTATION-NOT-FOUND/Javascript-projects" className="link">Falling Sand Simulator</a> </h1>
<button
className='grid button'
onClick={()=> SetGridlines (prev  => !prev)}>
{gridlines ? "on" :"off" }
</button>

<button
className='colour button'
onClick={()=> SetColour (prev  => !prev)}>
{colour ? "on" :"off" }
</button>

<SandSimulator gridlines={gridlines} colour={colour}/>
</div>
);
}
export default App;
