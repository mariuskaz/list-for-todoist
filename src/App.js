import './App.css';
import Todolist from './Components/Todolist';

function App() {
  return (
    <>
      <div className="navbar">
        <i className="material-icons">menu</i>
      </div>
      <div className="container">
        <div className="side">
          <p>Today</p>
          <p>Next 7 days</p>
        </div>
        <div className="main">
          <div className="content">
            <div className="header">Today <span>{ new Date().toLocaleDateString() }</span></div>
            <div className="list">
                  <div className="section">Overdue</div>
                  <div className="line"/>
                  <Todolist/>
            </div>
          </div>      
        </div>
      </div>
    </>
  );
}

export default App;
