"use client"

import React, { useMemo, useState, useEffect } from "react"
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { Appointment, Group } from "@/data/interfaces"

const localizer = momentLocalizer(moment)

function useWindowHeight() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    
    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
}

const CalendarPage = () => {
  const { groups } = useCheckbox()
  const [currentDate, setCurrentDate] = useState(new Date())
  const mockData = useMockup()
  const windowHeight = useWindowHeight()

  const events = useMemo(() => {
    return mockData.flatMap((group: Group) => {
      const isGroupChecked = groups.find(g => g.name === group.name)?.checked
      const groupEvents = isGroupChecked ? group.appointments.map(app => ({...app, groupName: group.name, isSubgroup: false})) : []
      const subgroupEvents = group.subgroups
        .filter(subgroup => groups.find(g => g.name === subgroup.name)?.checked)
        .flatMap(subgroup => subgroup.appointments.map(app => ({...app, groupName: group.name, subgroupName: subgroup.name, isSubgroup: true})))

      return [...groupEvents, ...subgroupEvents].map((appointment: Appointment & {groupName: string, subgroupName?: string, isSubgroup: boolean}) => {
        const startDateTime = CalculateDateTime(appointment.at.time, appointment.at.distance)
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000) // Add 1 hour
        return {
          title: `${appointment.at.time} ${appointment.description}`,
          start: startDateTime,
          end: endDateTime,
          allDay: false,
          groupName: appointment.groupName,
          subgroupName: appointment.subgroupName,
          isSubgroup: appointment.isSubgroup
        }
      })
    })
  }, [groups, mockData])

  const onNavigate = (newDate: Date, view: View, action: "PREV" | "NEXT" | "TODAY" | "DATE") => {
    if (action === "TODAY") {
      setCurrentDate(new Date())
    } else if (action === "PREV") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (action === "NEXT") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (action === "DATE") {
      setCurrentDate(newDate)
    }
  }

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => toolbar.onNavigate("PREV")
    const goToNext = () => toolbar.onNavigate("NEXT")
    const goToCurrent = () => toolbar.onNavigate("TODAY")

    const label = moment(currentDate).format("MMMM YYYY")

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

  const eventStyleGetter = (event: any) => {
    const getGroupColor = (groupName: string, isSubgroup: boolean) => {
      switch (groupName) {
        case "Park Club":
          return isSubgroup ? "bg-group-park-club-100 text-group-park-club-900" : "bg-group-park-club-500 text-white";
        case "Marin Quarter":
          return isSubgroup ? "bg-group-marin-quarter-100 text-group-marin-quarter-900" : "bg-group-marin-quarter-500 text-white";
        case "Rochefort":
          return isSubgroup ? "bg-group-rochefort-100 text-group-rochefort-900" : "bg-group-rochefort-500 text-white";
        default:
          return "bg-gray-300 text-gray-800";
      }
    }

    const colorClasses = getGroupColor(event.groupName, event.isSubgroup);

    return {
      className: `${colorClasses} rounded-md border-none`,
      style: {
        display: "block",
      },
    }
  }

  const calendarHeight = windowHeight - 200; // Adjust this value as needed

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col xl:flex-row">
        <div className="w-full xl:w-1/4 xl:pr-4 mb-4 xl:mb-0">
          <GroupCheckboxes />
        </div>
        <div className="w-full xl:w-3/4 max-w-[900px] mx-auto">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="rbc-calendar-small-screen rbc-calendar-custom"
            style={{ 
              height: calendarHeight,
              fontSize: '0.8rem', // Adjust font size for small screens
            }}
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
      <style jsx global>{`
        @media (max-width: 1279px) {
          .rbc-calendar-small-screen {
            font-size: 0.8rem;
          }

          .rbc-calendar-small-screen .rbc-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .rbc-calendar-small-screen .rbc-toolbar-label {
            margin: 10px 0;
          }

          .rbc-calendar-small-screen .rbc-btn-group {
            width: 100%;
            justify-content: space-between;
          }

          .rbc-calendar-small-screen .rbc-event {
            padding: 2px;
          }

          .rbc-calendar-small-screen .rbc-event-content {
            font-size: 0.7rem;
          }

          .rbc-calendar-small-screen .rbc-month-view {
            flex-basis: auto;
          }

          .rbc-calendar-small-screen .rbc-month-row {
            min-height: auto;
            height: auto !important;
          }
        }

        .rbc-calendar-custom .rbc-row-content {
          max-height: none !important;
        }

        .rbc-calendar-custom .rbc-row-segment {
          display: block !important;
        }

        .rbc-calendar-custom .rbc-event {
          margin-top: 2px;
        }

        .rbc-calendar-custom .rbc-show-more {
          display: none !important;
        }

        .rbc-calendar-custom .rbc-row-content .rbc-row {
          flex-wrap: wrap;
        }
      `}</style>
    </MaxWidthWrapper>
  )
}

export default CalendarPage