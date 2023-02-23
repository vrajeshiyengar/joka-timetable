// Author: Vrajesh Iyengar (58th Batch)
import React, { useState } from "react";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  DayView,
  WeekView,
  MonthView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
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
const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCourseCodeChange = (nextValue) => {
    onFieldChange({ courseCode: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.TextEditor
        value={appointmentData.courseCode}
        onValueChange={onCourseCodeChange}
        placeholder="Course Code"
      />
    </AppointmentForm.BasicLayout>
  );
};
const AdminTimetable = ({ data, setData }) => {
  const formattedDate = (date = new Date()) =>
    Intl.DateTimeFormat("en-IN").format(date).split("/").reverse().join("-");
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const changeAddedAppointment = (addedAppointment) =>
    setAddedAppointment(addedAppointment);
  const changeAppointmentChanges = (appointmentChanges) =>
    setAppointmentChanges(appointmentChanges);
  const changeEditingAppointment = (editingAppointment) =>
    setEditingAppointment(editingAppointment);
  const commitChanges = (changes) => {
    setData((state) => {
      let newData = state;
      if (changes.added) {
        const startingAddedId =
          state.length > 0 ? state[state.length - 1].id + 1 : 0;
        newData = [...state, { id: startingAddedId, ...changes.added }];
      }
      if (changes.changed) {
        newData = newData.map((appointment) =>
          changes.changed[appointment.id]
            ? { ...appointment, ...changes.changed[appointment.id] }
            : appointment
        );
      }
      if (changes.deleted !== undefined) {
        newData = newData.filter(
          (appointment) => appointment.id !== changes.deleted
        );
      }
      return newData;
    });
  };
  return (
    <Scheduler data={data} height={660}>
      <ViewState
        defaultCurrentDate={formattedDate()}
        defaultCurrentViewName="Week"
      />
      <EditingState
        onCommitChanges={commitChanges}
        addedAppointment={addedAppointment}
        onAddedAppointmentChange={changeAddedAppointment}
        appointmentChanges={appointmentChanges}
        onAppointmentChangesChange={changeAppointmentChanges}
        editingAppointment={editingAppointment}
        onEditingAppointmentChange={changeEditingAppointment}
      />
      <DayView startDayHour={7} endDayHour={20} />
      <WeekView startDayHour={7} endDayHour={20} />
      <MonthView startDayHour={7} endDayHour={20} />
      <AllDayPanel />

      <EditRecurrenceMenu />
      <ConfirmationDialog />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <ViewSwitcher />
      <Appointments appointmentComponent={Appointment} />
      <AppointmentTooltip showOpenButton showDeleteButton />
      <AppointmentForm
        basicLayoutComponent={BasicLayout}
        textEditorComponent={TextEditor}
      />
      <DragDropProvider />
    </Scheduler>
  );
};

export default AdminTimetable;
