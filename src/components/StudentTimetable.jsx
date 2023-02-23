// Author: Vrajesh Iyengar (58th Batch)
import React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DayView,
  WeekView,
  MonthView,
  AllDayPanel,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#FFC107",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);
const StudentTimetable = ({ data }) => {
  const formattedDate = (date = new Date()) =>
    Intl.DateTimeFormat("en-IN").format(date).split("/").reverse().join("-");

  return (
    <Scheduler data={data} height={660}>
      <ViewState currentDate={formattedDate()} defaultCurrentViewName="Week" />

      <DayView startDayHour={7} endDayHour={20} />
      <WeekView startDayHour={7} endDayHour={20} />
      <MonthView startDayHour={7} endDayHour={20} />
      <AllDayPanel />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <ViewSwitcher />
      <Appointments appointmentComponent={Appointment} />
      <AppointmentTooltip showOpenButton showDeleteButton />
      <AppointmentForm />
    </Scheduler>
  );
};

export default StudentTimetable;
