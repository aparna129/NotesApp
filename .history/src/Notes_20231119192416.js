import React, { useState, useEffect } from "react";
import "./Notes.css";
import centerimage from "./images/centerimage.png";
import Vector from "./images/Vector.png";
import enterbtn from "./images/enterbtn.png";

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
  const [createnotes, setCreatenotes] = useState(false);
  const handleCreateNotes = (e) => {
    e.preventDefault();
    setCreatenotes(!createnotes);
  };

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups"));
    if (storedGroups) {
      setGroups(storedGroups);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const createGroup = () => {
    setCreatenotes(!createnotes);
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

  const handlecolorclick = (color) => {
    setGroupColor(color);
  };

  const [inputVisibility, setInputVisibility] = useState(
    groups.map(() => false)
  );

  const toggleInputVisibility = (index) => {
    const newVisibility = [...inputVisibility];
    newVisibility[index] = !newVisibility[index];
    setInputVisibility(newVisibility);
  };

  return (
    <div>
      <div>
        <div
          className="body"
          style={{
            filter: createnotes ? "blur(30px)" : "none",
            minHeight: "80vh",
          }}
        >
          <div className="leftside">
            <p className="left-heading">Pocket Notes</p>
            <button className="btn" onClick={handleCreateNotes}>
              + Create Notes group
            </button>
            {groups.map((group, index) => (
              <div>
                <p
                  onClick={() => toggleInputVisibility(index)}
                  className="notes-name-with-icon"
                >
                  <p
                    style={{
                      height: "48px",
                      width: "48px",
                      borderRadius: "100px",
                      backgroundColor: group.color,
                      color: "white",
                      fontSize: "25px",
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      marginTop: "1px",
                      marginLeft: "50px",
                    }}
                  >
                    <p className="icon-txt">{group.name.slice(0, 2)}</p>
                  </p>
                  <p className="note-names">{group.name}</p>
                </p>
              </div>
            ))}
          </div>

          {groups.map((group, index) => (
            <div className="box-for-each-note">
              {inputVisibility[index] ? (
                <div>
                  <div className="titleofnote">
                    <p
                      style={{
                        height: "48px",
                        width: "48px",
                        borderRadius: "100px",
                        backgroundColor: group.color,
                        color: "white",
                        fontSize: "25px",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        marginTop: "10px",
                        marginLeft: "50px",
                      }}
                      className="icon"
                    >
                      <p className="icon-txt">{group.name.slice(0, 2)}</p>
                      <p className="note-name-in-title"> {group.name}</p>
                    </p>
                  </div>

                  <p className="notes-storing-area"></p>

                  <p className="lastbox">
                    <input
                      className="notes-input"
                      type="text"
                      placeholder="Enter your text here..........."
                      value={noteText}
                      onChange={handleNoteTextChange}
                    />

                    <img
                      style={{ marginLeft: "-35px", marginTop: "50px" }}
                      src={enterbtn}
                      onClick={() => addNote(index)}
                      height="20px"
                      width="20px"
                    />
                  </p>
                </div>
              ) : null}

              <ul>
                {group.notes.map((note, noteIndex) => (
                  <li key={noteIndex}>
                    {note.text} - {note.date}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          

        {createnotes && (
          <div className="box">
            <p className="boxtext1">Create New Notes group</p>

            <p className="boxtext2">
              Group Name
              <input
                className="input"
                type="text"
                placeholder="Enter your group name...."
                value={groupName}
                onChange={handleGroupNameChange}
              ></input>
            </p>

            <p className="boxtext3">
              Choose Colour
              <div className="circles">
                <p
                  onClick={() => handlecolorclick("#b38bfa")}
                  className="circle1"
                ></p>
                <p
                  onClick={() => handlecolorclick("#ff79f2")}
                  className="circle2"
                ></p>{" "}
                <p
                  onClick={() => handlecolorclick("#43e6fc")}
                  className="circle3"
                ></p>
                <p
                  onClick={() => handlecolorclick("#f19576")}
                  className="circle4"
                ></p>{" "}
                <p
                  onClick={() => handlecolorclick("#0047ff")}
                  className="circle5"
                ></p>
                <p
                  onClick={() => handlecolorclick("#6691ff")}
                  className="circle6"
                ></p>
              </div>
            </p>

            <p className="btn2">
              <button onClick={createGroup} className="boxcreatebutton">
                Create
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
