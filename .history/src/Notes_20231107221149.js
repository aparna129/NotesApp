import React, { useState, useEffect } from "react";

function formatDateTime(dateTime) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(dateTime).toLocaleString(undefined, options);
}

function Notes() {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    // Load groups from local storage when the component mounts
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  useEffect(() => {
    // Save groups to local storage whenever groups change
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupColorChange = (e) => {
    setGroupColor(e.target.value);
  };

  const createGroup = () => {
    if (groupName && groupColor) {
      const newGroup = {
        name: groupName,
        color: groupColor,
        notes: [],
      };
      setGroups([...groups, newGroup]);
      setGroupName("");
      setGroupColor("");
    }
  };

  const handleNoteTextChange = (e) => {
    setNoteText(e.target.value);
  };

  const addNote = (groupIndex) => {
    if (noteText) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].notes.push({
        text: noteText,
        date: formatDateTime(new Date()),
      });
      setGroups(updatedGroups);
      setNoteText("");
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Note App</h1>
        <div>
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <input
            type="color"
            value={groupColor}
            onChange={handleGroupColorChange}
          />
          <button onClick={createGroup}>Create Group</button>
        </div>
        {groups.map((group, index) => (
          <div key={index} style={{ border: `2px solid ${group.color}` }}>
            <h2>{group.name}</h2>
            <input
              type="text"
              placeholder="Add a Note"
              value={noteText}
              onChange={handleNoteTextChange}
            />
            <button onClick={() => addNote(index)}>Add Note</button>
            <ul>
              {group.notes.map((note, noteIndex) => (
                <li key={noteIndex}>
                  {note.text} - {note.date}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
