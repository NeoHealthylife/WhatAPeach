import React, { useState, useEffect } from "react";

function MyFilter() {
  // Creamos un estado para cada checkbox
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  // Creamos una función para manejar el cambio de estado de cada checkbox
  const handleCheckboxChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    // Actualizamos el estado del checkbox según su nombre
    if (name === "checkbox1") {
      setCheckbox1(value);
    } else if (name === "checkbox2") {
      setCheckbox2(value);
    } else if (name === "checkbox3") {
      setCheckbox3(value);
    }
  };

  // Utilizamos el hook useEffect para realizar una acción cuando el estado de algún checkbox cambie
  useEffect(() => {
    // Aquí podrías hacer una llamada a una API o cualquier otra acción que necesites realizar cuando el estado de algún checkbox cambie
  }, [checkbox1, checkbox2, checkbox3]);

  return (
    <form>
      <label>
        Checkbox 1:
        <input
          name="checkbox1"
          type="checkbox"
          checked={checkbox1}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Checkbox 2:
        <input
          name="checkbox2"
          type="checkbox"
          checked={checkbox2}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Checkbox 3:
        <input
          name="checkbox3"
          type="checkbox"
          checked={checkbox3}
          onChange={handleCheckboxChange}
        />
      </label>
    </form>
  );
}
//////////////////otro ejemplo de filters
function FilterComponent() {
  const [filterState, setFilterState] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });
  const [filteredElements, setFilteredElements] = useState([]);
  const elements = [{ type: "A" }, { type: "B" }, { type: "C" }];

  function handleChange(event) {
    const { name, checked } = event.target;
    setFilterState({ ...filterState, [name]: checked });
  }

  useEffect(() => {
    let filtered = elements;
    if (filterState.checkbox1) {
      filtered = filtered.filter((element) => element.type === "A");
    }
    if (filterState.checkbox2) {
      filtered = filtered.filter((element) => element.type === "B");
    }
    if (filterState.checkbox3) {
      filtered = filtered.filter((element) => element.type === "C");
    }
    setFilteredElements(filtered);
  }, [filterState]);

  return (
    <div>
      <Checkbox
        name="checkbox1"
        checked={filterState.checkbox1}
        onChange={handleChange}
      />
      <Checkbox
        name="checkbox2"
        checked={filterState.checkbox2}
        onChange={handleChange}
      />
      <Checkbox
        name="checkbox3"
        checked={filterState.checkbox3}
        onChange={handleChange}
      />
      <ul>
        {filteredElements.map((element) => (
          <li key={element.type}>{element.type}</li>
        ))}
      </ul>
    </div>
  );
}
