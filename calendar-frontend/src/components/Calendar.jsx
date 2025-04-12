import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../redux/eventsSlice';
import EventModal from './EventModal';
import '../custom-calendar.css';   // <-- ADD THIS
function Calendar() {
    const dispatch = useDispatch();
    const { events } = useSelector((state) => state.events);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleEventClick = (info) => {
        if (window.confirm(`Delete event '${info.event.title}'?`)) {
            const eventId = info.event.extendedProps._id || info.event.id;  // <--- Correct!
            dispatch(deleteEvent(eventId));
            info.event.remove();
        }
    };


    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setModalOpen(true);
    };

    const handleEventDrop = (info) => {
        const updatedEvent = {
            _id: info.event.id,   // <--- IMPORTANT
            start: info.event.start,
            end: info.event.end,
        };
        dispatch(updateEvent(updatedEvent));
    };

    const handleEventResize = (info) => {
        const updatedEvent = {
            _id: info.event.id,   // <--- IMPORTANT
            start: info.event.start,
            end: info.event.end,
        };
        dispatch(updateEvent(updatedEvent));
    };

    const handleExternalDrop = (info) => {
        const newEvent = {
            title: info.draggedEl.innerText,  // or use info.draggedEl.dataset.title
            start: info.date,
            end: info.date,
            color: info.draggedEl.getAttribute('data-color') || '#60A5FA',
            category: 'work'  // default
        };
        dispatch(addEvent(newEvent));
    };




    return (
        <div className="flex-1 p-6 bg-gray-50">
            <FullCalendar
                themeSystem="standard"
                height="auto"
                contentHeight="auto"
                headerToolbar={{
                    start: 'title',
                    center: '',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay today prev,next'
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                editable={true}
                selectable={true}
                events={events}

                dateClick={handleDateClick}
                eventDrop={handleEventDrop}
                droppable={true}
                drop={handleExternalDrop}
                eventClick={handleEventClick}
                eventResizableFromStart={true}
                eventDurationEditable={true}
                eventResize={handleEventResize}
            />
            {modalOpen && <EventModal closeModal={() => setModalOpen(false)} selectedDate={selectedDate} />}
        </div>
    );
}

export default Calendar;
