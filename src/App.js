import { useState } from "react";
import "./App.css";
import EditModal from "./components/edit-modal";

function App() {
  const [list, setList] = useState([
    { id: 1, title: "看电影" },
    { id: 2, title: "学习React的todo list" },
  ]);
  const [value, setValue] = useState(""); // 添加的输入框的值
  const [openModal, setOpenModal] = useState({ open: false });

  // 新增数据
  const handleAdd = () => {
    if (!value) {
      // 输入框没有值时，不进行任何操作
      return;
    }
    /**
     * 将输入的数据添加到列表中
     * 1. id要保持唯一，这里使用时间戳来作为唯一值；
     * 2. 这里使用 concat 方法，将新数据添加到数组的开头，这样新数据会排在最前面
     **/
    const newList = [{ id: Date.now(), title: value }].concat(list);
    setList(newList);
    // 添加到列表后，清除输入框中的数据
    setValue("");
  };

  /**
   * 删除该id的数据
   * @param {number} id
   */
  const handleDel = (id) => {
    // 实际上可以直接删除的，我们做个延时操作，是为了在页面上能看到选中的操作
    setTimeout(() => {
      setList(list.filter((item) => item.id !== id));
    }, 300);
  };

  /**
   * 修改数据
   * @param {{ id: number; title: string }} data
   */
  const handleEdit = (data) => {
    // 循环数组中的数据，若找到id相同的数据，则修改数据，否则不修改
    setList(list.map((item) => (item.id === data.id ? data : item)));
  };

  return (
    <div className="App">
      <div className="editor">
        <input type="text" value={value} onInput={(e) => setValue(e.target.value)} />
        <button onClick={handleAdd}>添加</button>
      </div>
      <div className="list">
        {list.map((item) => (
          <div key={item.id} className="item">
            <input className="check" type="checkbox" onChange={() => handleDel(item.id)} />
            <span>{item.title}</span>
            <button className="edit-btn" onClick={() => setOpenModal({ open: true, data: item })}>
              修改
            </button>
          </div>
        ))}
      </div>
      <EditModal
        {...openModal}
        onCancel={() => setOpenModal({ open: false })}
        onOk={(data) => {
          handleEdit(data);
          setOpenModal({ open: false });
        }}
      />
    </div>
  );
}

export default App;
