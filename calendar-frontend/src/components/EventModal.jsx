import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/eventsSlice';
import { createPortal } from 'react-dom';

function EventModal({ closeModal, selectedDate }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('exercise');

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      title,
      category,
      start: selectedDate,
      end: selectedDate,
      color: categoryColor(category),
    };
    dispatch(addEvent(event));
    closeModal();
  };

  const categoryColor = (category) => {
    const colors = {
      exercise: '#34D399',
      eating: '#FBBF24',
      work: '#60A5FA',
      relax: '#A78BFA',
      family: '#F472B6',
      social: '#F87171',
    };
    return colors[category] || '#60A5FA';
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 animate-fadeIn">
        <h2 className="text-2xl mb-4 font-bold text-center">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="exercise">Exercise</option>
            <option value="eating">Eating</option>
            <option value="work">Work</option>
            <option value="relax">Relax</option>
            <option value="family">Family</option>
            <option value="social">Social</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition"
            >
              Save
            </button>

          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

export default EventModal;
