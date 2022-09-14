import ListSvg from './assets/img/list.svg';
import AddListButton from './components/AddListButton/AddListBtn';

import BD from './assets/bd.json';
import List from './components/List/List';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        {/* displays sidebar of lists of todos */}
        {/* active == true when the list is selected */}
        <List items={[
          {
            icon: ListSvg,
            name: "Всі завдання",
            active: true,
          },
          {
            color: "green",
            name: "Фронтенд"
          },
          {
            color: "blue",
            name: "Покупки"
          },
          {
            color: "pink",
            name: "Фільми та серіали"
          }
        ]} 
        isRemovable
        />
        {/* btn to add new list of todos */}
        {/* receives array of colors to display them as badge into popup */}
        <AddListButton colors={BD.colors} />
      </div>
      {/* <div className="todo__tasks">завдання</div> */}
    </div>
  );
}

export default App;
