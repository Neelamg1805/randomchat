export interface TaskRequest {
  uuid: string;
  BDMId: number;
  task_type: string;
  action_type: string;
  specific_action: string;
  remarks: string;
  task_name: string;
  action_date: string; // ISO date string
  LeadId: number | null;
  new_follow_up_date: string; // ISO date string
  travel_details: TravelDetails;
  form_data: any;
}

interface TravelDetails {
  attendanceId: number;
  action: string;
  checkin_time: string; // ISO date string
  checkout_time: string; // ISO date string
  checkin_location: Location;
  checkout_location: Location;
}

interface Location {
  latitude: number;
  longitude: number;
}
