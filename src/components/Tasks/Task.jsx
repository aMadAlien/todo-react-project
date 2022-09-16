import CheckItem from '../../assets/img/check.svg';
import EditTask from '../../assets/img/edit.svg';
import RemoveTask from '../../assets/img/remove.svg';

const Task = ({ id, text, list, onRemove, onEdit }) => {
    return (
        // block of tasks
        <div key={id} className="tasks__item">

            {/* checkbox */}
            <div className="checkbox">
                {/* {`task--${item.id}`} => make chackbox work correctly */}
                <input type="checkbox" id={`task--${id}`} />
                <label htmlFor={`task--${id}`}><i><img src={CheckItem} alt="check" /></i></label>
            </div>

            {/* task text */}
            <p>{text}</p>

            {/* btn to edit/remove task */}
            <i onClick={() => onEdit(list.id, { id, text })}><img src={EditTask} alt="edit" /></i>
            <i onClick={() => onRemove(list.id, id)}><img src={RemoveTask} alt="edit" /></i>
        </div>
    )
}

export default Task;