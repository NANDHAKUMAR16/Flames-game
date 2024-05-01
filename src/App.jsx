import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [relationship, setRelationship] = useState(null);
  const focus = useRef(null);
  const calculateFlames = () => {
    const name1 = fname.toLowerCase().trim();
    const name2 = sname.toLowerCase().trim();
    if (name1 && name2) {
      let name1Array = name1.split('');
      let name2Array = name2.split('');
      for (let char of name1) {
        if (name2Array.includes(char)) {
          name1Array.splice(name1Array.indexOf(char), 1);
          name2Array.splice(name2Array.indexOf(char), 1);
        }
      }
      let count = name1Array.length + name2Array.length;
      let categories = ["Friendship", "Love", "Affection", "Marriage", "Enemies", "Siblings"];
      while (categories.length > 1) {
        let index = (count % categories.length) - 1;
        if (index >= 0) {
          let right = categories.slice(index + 1);
          let left = categories.slice(0, index);
          categories = right.concat(left);
        } else {
          categories = categories.slice(0, -1);
        }
      }
      setRelationship(categories[0]);
    }
    else {
      alert("Check the input name")
    }
  }
  const check = (e) => {
    if ((fname.trim() && sname.trim())) {
      if (e == "Enter") {
        calculateFlames();
      }
    }
  }
  const focusCheck = (key, event) => {
    if (key == "Enter" && !(sname)) {
      focus.current.focus();
    }
    else if (fname && sname && key == "Enter") check("Enter");
  }
  return (
    <>
      <div className="container" >
        <div className="box">
          <div className="header">
            <header>FLAMES</header>
          </div>
          <div className="input-data">
            <input value={fname} onKeyUp={(e) => focusCheck(e.key, e)} onChange={(e) => { setRelationship(null), setFname(e.target.value.toUpperCase()) }} placeholder='Enter your name ' type="text" />
            <input ref={focus} value={sname} onKeyUp={(e) => check(e.key)} onChange={(e) => { setRelationship(null), setSname(e.target.value.toUpperCase()) }} placeholder='Enter your partner name ' type="text" />
          </div>
          <div className="btn">
            <button onClick={calculateFlames}>Calculate</button>
          </div>
        </div>
        {(relationship) && (
          <div className="calculateBox">
            <p>The relationship between {fname} and {sname}</p>
            <div className="character">
              <h2>{relationship}{" !"}</h2>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App;
