import React, { useState, useEffect } from "react";
import "./Notes.css";
import centerimage from "./images/centerimage.png";
import Vector from "./images/Vector.png";
import enterbtn from "./images/enterbtn.png";

function Notes() {
  const [createnotes, setCreatenotes] = useState(false);
  const handleCreateNotes = (e) => {
    e.preventDefault();
    setCreatenotes(!createnotes);
  };

  const [boxcreate, setboxcreate] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [notecolour, setNotecolour] = useState("ffffff");
  const [eachnotetext, setEachnotetext] = useState([]);
  const [notesClick, setNotesClick] = useState(false);
  const [notesaved, setNotesaved] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setNotesClick(true);
  };

  useEffect(
    () => {
      window.localStorage.setItem("notes", JSON.stringify(notes));
      window.localStorage.setItem("newnote", newNote);
      window.localStorage.setItem("notecolour", notecolour);
    },
    [notes],
    [newNote],
    [notecolour]
  );

  const handlecolorclick = (color) => {
    setNotecolour(color);
  };

  const addnotes = () => {
    setCreatenotes(!createnotes);

    if (newNote.trim() !== "") {
      const newNoteItem = {
        text: newNote,
        color: notecolour,
        textarea: eachnotetext,
      };

      setNotes((prevNotes) => [...prevNotes, newNoteItem]);
      setNewNote("");
      setNotecolour("");
      setEachnotetext([]);
      localStorage.setItem("notes", JSON.stringify([...notes, newNoteItem]));
    }
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
            {boxcreate && (
              <div className="notes-style">
                {notes.map((note) => (
                  <p
                    onClick={handleClick}
                    style={{
                      backgroundColor: notesClick ? "#F7ECDC" : "white",
                    }}
                    className="notes-name-with-icon"
                  >
                    <p
                      style={{
                        height: "48px",
                        width: "48px",
                        borderRadius: "100px",
                        backgroundColor: note.color,
                        color: "white",
                        fontSize: "25px",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        marginTop: "1px",
                        marginLeft: "50px",
                      }}
                      className="icon"
                    >
                      <p className="icon-txt">{note.text.slice(0, 2)}</p>
                    </p>
                    <p className="note-names">{note.text}</p>
                  </p>
                ))}
              </div>
            )}
          </div>

          {!notesClick && (
            <div className="rightside">
              <img src={centerimage} className="centerimg"></img>
              <p className="pocket-notes"> Pocket Notes</p>
              <p className="text1">
                Send and receive messages without keeping your phone online.
              </p>
              <p className="text2">
                {" "}
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone
              </p>
              <p className="text3">
                {" "}
                <img src={Vector} height="13px" width="13px"></img> end-to-end
                encrypted
              </p>
            </div>
          )}
        </div>

        {createnotes && (
          <div className="box">
            <p className="boxtext1">Create New Notes group</p>

            <p className="boxtext2">
              Group Name
              <input
                className="input"
                type="text"
                placeholder="Enter your group name...."
                value={newNote}
                onChange={(e) => {
                  setNewNote(e.target.value);
                }}
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
              <button onClick={addnotes} className="boxcreatebutton">
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
