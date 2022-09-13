import './App.scss';
import ListSvg from './assets/img/list.svg';

import List from './components/List/List';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: ListSvg,
            name: "Всі завдання",
            active: true
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
        ]} />
      </div>
      <div className="todo__tasks">завдання</div>
    </div>
  );
}

export default App;
