import React, { useRef } from "react";
import { Box, Grid, listClasses, Typography, useTheme } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventSourceInput } from "@fullcalendar/core";
import moment from "moment";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import { DialogWrapperWithCrossButton } from "../../components/DialogWrapperWithCrossButton";
import { SportGroupView } from "../../api/sportGroups/viewModels/SportGroupView";
import { sportGroupService } from "../../api/sportGroups/sportGroupService";
import { sportActivitiesService } from "../../api/activities/activitiyService";
import { SportActivityView } from "../../api/activities/viewModels/SportActivityView";
import {
  LessonForm,
  LessonFormValues,
} from "../../components/schedule/lessonForm/LessonForm";
import { useToastNotify } from "../../contexts/NotificationToastContext";

const minTimeForCalendarTimeGrid = "08:00:00";

export const SchedulePage: React.FC = (props) => {
  const calendarRef = useRef<FullCalendar>(null);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] =
    React.useState<boolean>(false);
  const [events, setEvents] = React.useState<EventSourceInput>();
  const [sportGroups, setSportGroups] = React.useState<SportGroupView[]>([]);
  const [sportActivities, setSportActivities] = React.useState<
    SportActivityView[]
  >([]);

  const theme = useTheme();
  const { notify } = useToastNotify();

  const loadSportGroups = () => {
    sportGroupService.getSportGroups().then((response) => {
      setSportGroups(response.data);
    });
  };

  const loadSportActivities = () => {
    sportActivitiesService.getActivities().then((response) => {
      setSportActivities(response.data);
    });
  };
  React.useEffect(() => {
    loadSportGroups();
    loadSportActivities();
    // setEvents([
    //   {
    //     id: "1",
    //     title: "Event 1",
    //     start: moment().format(),
    //     end: moment().add(2, "hours").format(),
    //   },
    // ]);
  }, []);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log(selectInfo);
    const calendarApi = selectInfo.view.calendar;

    if (selectInfo.view.type === "dayGridMonth") {
      calendarApi.unselect();
      return;
    }
    calendarApi.addEvent({
      id: generateUniqueID(),
      title: "Volleyball",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  };

  const onLessonFormSubmit = (values: LessonFormValues) => {
    const { fromDate, toDate, fromTime, toTime } = values;
    const startDateTime = new Date(
      moment(fromDate).get("year"),
      moment(fromDate).get("month"),
      moment(fromDate).get("date"),
      moment(fromTime).get("hours"),
      moment(fromTime).get("minutes")
    );
    const endDateTime = new Date(
      moment(toDate).get("year"),
      moment(toDate).get("month"),
      moment(toDate).get("date"),
      moment(toTime).get("hours"),
      moment(toTime).get("minutes")
    );
    const activityName = sportActivities.find(
      (act) => act.id === values.activityId
    )?.name;
    const sportGroupName = sportGroups.find(
      (g) => g.id === values.sportGroupId
    )?.name;
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent({
        id: generateUniqueID(),
        title: `${activityName} ${sportGroupName}`,
        start: startDateTime,
        end: endDateTime,
      });
    }

    const lesson = {
      sportActivityId: values.activityId,
      sportGroupId: values.sportGroupId,
      instructorId: values.instructorId,
    };
  };

  const renderAddLessonDialog = () => (
    <DialogWrapperWithCrossButton
      isOpen={isAddLessonDialogOpen}
      onCloseModalClick={() => setIsAddLessonDialogOpen(false)}
    >
      <LessonForm
        activities={sportActivities.map((activity) => ({
          id: activity.id,
          name: activity.name,
        }))}
        sportGroups={sportGroups.map((group) => ({
          id: group.id,
          name: group.name,
        }))}
        sportInstructors={[]}
        onSubmit={onLessonFormSubmit}
      />
    </DialogWrapperWithCrossButton>
  );

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", paddingTop: "2%" }}>
        Schedule
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={1} md={1} lg={1} />
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today addLessonButton",
                center: "title",
                right: "dayGridMonth,timeGridWeek,listWeek",
              }}
              initialView="dayGridMonth"
              events={events}
              height={570}
              selectable
              editable={false}
              select={handleDateSelect}
              slotMinTime={minTimeForCalendarTimeGrid}
              // slotLabelInterval={{ hour: 2 }}
              // slotDuration="01:00:00"
              allDaySlot={false}
              customButtons={{
                addLessonButton: {
                  text: "Add lesson",
                  click: () => setIsAddLessonDialogOpen(true),
                },
              }}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
                listWeek: "List view",
              }}
              eventColor={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} />
        </Grid>
        {renderAddLessonDialog()}
      </Box>
    </>
  );
};
