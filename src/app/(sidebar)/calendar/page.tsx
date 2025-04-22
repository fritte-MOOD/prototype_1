'use client'

import React, { useState, useMemo } from 'react'
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { GroupCheckboxes } from '@/components/GroupCheckboxes'
import { useCheckbox } from '@/context/ContextFiles/CheckboxesContext'
import { CalculateDateTime } from '@/components/CalculateDateTime'
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { Appointment, Group } from "@/data/interfaces"

const localizer = momentLocalizer(moment)

const CalendarPage = () => {
  const { groups } = useCheckbox()
  const [currentDate, setCurrentDate] = useState(new Date())
  const mockData = useMockup()

  const events = useMemo(() => {
    return mockData.flatMap((group: Group) => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked;
      const groupEvents = isGroupChecked ? group.appointments : [];
      const subgroupEvents = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.appointments);

      return [...groupEvents, ...subgroupEvents].map((appointment: Appointment) => {
        const startDateTime = CalculateDateTime(appointment.at.time, appointment.at.distance)
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // Add 1 hour
        return {
          title: `${appointment.at.time} ${appointment.description}`,
          start: startDateTime,
          end: endDateTime,
          allDay: false,
        }
      });
    });
  }, [groups, mockData])

  const onNavigate = (newDate: Date, view: View, action: 'PREV' | 'NEXT' | 'TODAY' | 'DATE') => {
    if (action === 'TODAY') {
      setCurrentDate(new Date())
    } else if (action === 'PREV') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (action === 'NEXT') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (action === 'DATE') {
      setCurrentDate(newDate)
    }
  }

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => toolbar.onNavigate('PREV')
    const goToNext = () => toolbar.onNavigate('NEXT')
    const goToCurrent = () => toolbar.onNavigate('TODAY')

    const label = moment(currentDate).format('MMMM YYYY')

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={goToBack}>Back</button>
          <button type="button" onClick={goToCurrent}>Today</button>
          <button type="button" onClick={goToNext}>Next</button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
      </div>
    )
  }

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: '#fba762',
        borderRadius: '5px',
        color: 'black',
        border: 'none',
        display: 'block'
      }
    }
  }

  return (
    <MaxWidthWrapper>
      <div className="flex">
        <div className="w-1/4 pr-4">
          <GroupCheckboxes />
        </div>
        <div className="w-3/4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            date={currentDate}
            onNavigate={onNavigate}
            view={Views.MONTH}
            views={[Views.MONTH]}
            toolbar={true}
            components={{
              toolbar: CustomToolbar,
            }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default CalendarPage