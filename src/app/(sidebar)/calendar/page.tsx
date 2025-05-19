"use client"

import React, { useMemo, useState } from "react"
import moment from "moment"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { GroupCheckboxes } from "@/components/ui/GroupCheckboxes"
import { useCheckbox } from "@/context/ContextFiles/CheckboxesContext"
import { CalculateDateTime } from "@/components/functions/CalculateDateTime"
import { useMockup } from "@/context/ContextFiles/MockupContext"
import { Appointment, Group } from "@/data/interfaces"

const CalendarPage = () => {
  const { groups } = useCheckbox()
  const [currentDate, setCurrentDate] = useState(new Date())
  const mockData = useMockup()

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

  const eventStyleGetter = (event: any) => {
    const getGroupColor = (groupName: string, isSubgroup: boolean = false): string => {
      switch (groupName) {
        case "Park Club":
          return "bg-group-park-club-500 border-group-park-club-500 text-white";
        case "Marin Quarter":
          return "bg-group-marin-quarter-500 border-group-marin-quarter-500 text-white";
        case "Rochefort":
          return "bg-group-rochefort-500 border-group-rochefort-500 text-white";
        default:
          return "bg-gray-300 border-gray-300";
      }
    };


    return getGroupColor(event.groupName, event.isSubgroup);
  }

  const Calendar = () => {
    const daysInMonth = moment(currentDate).daysInMonth();
    const firstDayOfMonth = moment(currentDate).startOf('month');
    const days = Array.from({ length: daysInMonth }, (_, i) => moment(firstDayOfMonth).add(i, 'days'));

    return (
      <div className="bg-brand-0 rounded-lg shadow overflow-hidden flex flex-col h-full">
        <div className="flex justify-between items-center p-4 bg-brand-550">
          <button
            onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate())}
            className="text-brand-950 text-2xl font-bold px-4 py-2 hover:bg-brand-550 rounded-full transition-colors"
          >
            &lt;
          </button>
          <h2 className="text-xl font-semibold">{moment(currentDate).format('MMMM YYYY')}</h2>
          <button
            onClick={() => setCurrentDate(moment(currentDate).add(1, 'month').toDate())}
            className="text-brand-950 text-2xl font-bold px-4 py-2 hover:bg-brand-550 rounded-full transition-colors"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 p-2 flex-grow overflow-y-auto">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-brand-950">{day}</div>
          ))}
          {days.map(day => {
            const dayEvents = events.filter(event => moment(event.start).isSame(day, 'day'));
            return (
              <div key={day.format('YYYY-MM-DD')} className="aspect-square p-1 border border-gray-200">
                <div className="text-sm font-medium">{day.format('D')}</div>
                <div className="mt-1">
                  <div className="hidden lg:flex lg:flex-col lg:gap-1">
                    {dayEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="relative group">
                        <div className={`text-xs truncate ${eventStyleGetter(event)} p-1 rounded-sm`}>
                          {event.title}
                        </div>
                        <div className="absolute z-10 hidden group-hover:block bg-brand-0 border border-brand-550 p-2 rounded shadow-lg whitespace-nowrap">
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 lg:hidden">
                    {dayEvents.slice(0, 3).map((event, index) => (
                      <div key={index} className="relative group">
                        <div className={`w-2 h-2 rounded-full ${eventStyleGetter(event).split(' ')[0]}`}></div>
                        <div className="absolute z-10 hidden group-hover:block bg-brand-0 border border-brand-550 p-2 rounded shadow-lg whitespace-nowrap">
                          {event.title}
                        </div>
                      </div>
                    ))}
                  </div>
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-brand-950 mt-1">+{dayEvents.length - 3} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col items-center">
        <div className="max-w-[1000px]">
          <GroupCheckboxes />
          <Calendar />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default CalendarPage