import './App.css';
import Todolist from './Components/Todolist';

// https://fonts.google.com/icons?selected=Material+Icons

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <header className="App-bar">
        <i className="material-icons">menu</i>
      </header>
      <h3 style={{ marginLeft:'27.2%'}}>Today <span style={{ fontSize:'0.7em',fontWeight:'normal', marginLeft:'10px' }}>{ new Date().toLocaleDateString() }</span></h3>
      </div>
      <div className="App-body">
            <div style={{ fontSize:'0.8em', fontWeight:'bold' }}>Overdue</div>
            <div style={{ height:'8px', borderBottom:'1px solid gainsboro' }} />
            <Todolist/>
            <br/><br/><br/><br/>
      </div>
    </div>
  );
}

export default App;
