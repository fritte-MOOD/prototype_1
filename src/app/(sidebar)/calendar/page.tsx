'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { useGroup } from "@/context/GroupContext"
import { mockData } from '@/data/mockup'
import { GroupCheckboxes } from '@/components/GroupCheckboxes'

const localizer = momentLocalizer(moment)

const CalendarPage = () => {
  const { groupName } = useGroup()
  const [checkedGroups, setCheckedGroups] = useState<{ [key: string]: boolean }>({})

  const allGroups = useMemo(() => {
    return mockData
      .filter(group => group.IAmMember)
      .map(group => ({
        name: group.name,
        subgroups: group.subgroups.filter(subgroup => subgroup.IAmMember).map(subgroup => subgroup.name)
      }))
  }, [])

  useEffect(() => {
    const initialState = Object.fromEntries(
      allGroups.flatMap(group => [
        [group.name, false],
        ...group.subgroups.map(subgroup => [subgroup, false])
      ])
    )
    const matchingGroup = allGroups.find(group => group.name === groupName)
    if (matchingGroup) {
      initialState[matchingGroup.name] = true
    }
    setCheckedGroups(initialState)
  }, [groupName, allGroups])

  const events = useMemo(() => {
    return mockData.flatMap(group => {
      const groupEvents = checkedGroups[group.name] ? group.appointments : [];
      const subgroupEvents = group.subgroups
        .filter(subgroup => checkedGroups[subgroup.name])
        .flatMap(subgroup => subgroup.appointments);

      return [...groupEvents, ...subgroupEvents].map(appointment => ({
        title: appointment.description,
        start: moment().add(appointment.distance, 'days').set({
          hour: parseInt(appointment.time.split(':')[0]),
          minute: parseInt(appointment.time.split(':')[1])
        }).toDate(),
        end: moment().add(appointment.distance, 'days').set({
          hour: parseInt(appointment.time.split(':')[0]) + 1,
          minute: parseInt(appointment.time.split(':')[1])
        }).toDate(),
        allDay: false,
      }));
    });
  }, [checkedGroups])

  return (
    <MaxWidthWrapper>
      <div className="flex">
        <GroupCheckboxes 
          allGroups={allGroups}
          checkedGroups={checkedGroups}
          setCheckedGroups={setCheckedGroups}
        />
        <div className="w-3/4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default CalendarPage