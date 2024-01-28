import type { ScheduleJSON } from ".";
import schedulesJson from "../data/schedule.json";

export class Schedule {
  static all(): ScheduleJSON[]{
    let schedules: ScheduleJSON[] = schedulesJson;
    return schedules;
  }

  static groups(): string[]{
    const uniqueGroup =  [... new Set(Schedule.all().map(item => item.group_id))];
    return uniqueGroup;
  }
}
 