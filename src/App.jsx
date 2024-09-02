import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];



export default function App() {
  const[items,setItems]=useState([]);

  function handleAddItems(item){ 
    setItems((items)=>[...items,item])
  }
  return (
    <div>
      <Logo />
      <Form  onAddItems={handleAddItems}/>
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> Far Away! </h1>;
}

function Form({ onAddItems }) {
  const [description,setDescription]=useState("");
  const [quantity,setQuantity]=useState(1);

  function handleSubmit(e){
   e.preventDefault();
   
   if(!description)return;

  const newIteam={description,quantity,packed:false,id:Date.now()};
  console.log(newIteam);

  onAddItems(newIteam);

  setDescription("");
  setQuantity(1);
  }

  return (
    <form className="add-form"   onSubmit={handleSubmit}>
      <h3>What you need for your trip ?</h3>
      <select value={quantity} onChange={(e)=>setQuantity (e.target.value)}>
      {Array.from({length:20},(_, i)=>i+1).map
      ((num)=>(
        <option value={num} key={num}>{num}</option>))}
      </select>
      <input type="text" placeholder="Item..." value={description}
      onChange={(e)=>{
        setDescription(e.target.value);
      }}/>
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({items}) {
  return (
  <div className="list">
  <ul>{items.map((item)=>(
    <Item item={item} key={item.id}/>
  ))}</ul>  
  </div>
);
}


function Item({item}){
return (
<li>
  <span style={item.packed?{textDecoration:"line-through"}:{}}>
  {item.description}
  ({item.quantity})
  </span>

  <button>&items;</button>
  
  </li>
  );
}


function Stats() {
  return (
    <>
    <footer className="stats">
    
      {" "}
      <div className="stats">
        <em>You have X items on your list ,and you already packed X(X%)</em>
      </div>
      </footer>
     
    </>
  );
}
