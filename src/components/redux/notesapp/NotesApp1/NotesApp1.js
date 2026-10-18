import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, setSearch } from "../../../../redux/notesSlice";
import './NotesApp1.css';

const COLORS = ['#f06292', '#ba68c8', '#ffd54f', '#4fc3f7', '#aed581'];

export default function NotesApp1() {
  const dispatch = useDispatch();
  const { items, search } = useSelector(state => state.notes);
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLORS[4]);
  const visibleNotes = items.filter(note => note.text.toLocaleLowerCase('tr-TR').includes(search.toLocaleLowerCase('tr-TR')));

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    dispatch(addNote(text.trim(), color));
    setText('');
  }

  return (
    <section className="notes-app" aria-label="Not uygulaması">
      <h2 className="notes-app__title">NotesApp</h2>
      <input className="notes-app__search" type="search" aria-label="Notlarda ara" placeholder="Search..." value={search} onChange={event => dispatch(setSearch(event.target.value))} />
      <form className="notes-app__editor" onSubmit={handleSubmit}>
        <textarea aria-label="Yeni not" placeholder="Enter your note here..." value={text} onChange={event => setText(event.target.value)} />
        <div className="notes-app__toolbar">
          <div className="notes-app__colors" aria-label="Not rengi seç">
            {COLORS.map(option => (
              <button key={option} type="button" className={`notes-app__color ${color === option ? 'notes-app__color--active' : ''}`} style={{ backgroundColor: option }} aria-label={`Renk ${option}`} aria-pressed={color === option} onClick={() => setColor(option)}>{color === option ? '✓' : ''}</button>
            ))}
          </div>
          <button className="notes-app__add" type="submit" disabled={!text.trim()}>ADD</button>
        </div>
      </form>
      <div className="notes-app__grid">
        {visibleNotes.length ? visibleNotes.map(note => (
          <article className="notes-app__note" key={note.id} style={{ backgroundColor: note.color }}>
            <span>{note.text}</span>
            <button type="button" className="notes-app__delete" aria-label="Notu sil" title="Notu sil" onClick={() => dispatch(deleteNote(note.id))}>×</button>
          </article>
        )) : <p className="notes-app__empty">{search ? 'Aramanızla eşleşen not bulunamadı.' : 'Henüz not yok. İlk notunu ekle!'}</p>}
      </div>
    </section>
  );
}
