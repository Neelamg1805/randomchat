// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { asyncSetUser } from '../../storage/asyncStorage'

// interface Campaign {
//   CampaignId: number
//   CampaignName: string
// }
// interface Region {
//   RegionName: String
// }

// interface Attendance {
//   attendanceId: number | null
//   inTime: string | null
//   outTime: string | null
// }

// interface UserState {
//   Regions: Region[]
//   EmployeeId: number | null
//   EmployeeName: string
//   EmployeePhone: string
//   EmployeeMailId: string
//   EmployeeRegion: string
//   EmployeeRole: number | null
//   EmployeeRoleName: String
//   Campaigns: Campaign[]
//   todayAttendance: Attendance
//   attendanceOutId: any
// }

// const initialState: UserState = {
//   EmployeeId: null,
//   EmployeeName: '',
//   EmployeePhone: '',
//   EmployeeMailId: '',
//   EmployeeRegion: '',
//   EmployeeRole: null,
//   EmployeeRoleName: '',
//   Campaigns: [],
//   todayAttendance: {
//     attendanceId: null,
//     inTime: null,
//     outTime: null
//   },
//   Regions: [],
//   attendanceOutId: null
// }

// const userSlice = createSlice({
//   name: 'userDetails',
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<UserState>) => {
//       return { ...state, ...action.payload }
//     },
//     deleteUser: () => initialState,
//     setInTime: (state, action) => {
      
//       if (!state.todayAttendance) {
//         state.todayAttendance = {
//           attendanceId: null,
//           inTime: null,
//           outTime: null,
//         };
//       }
      
//       state.todayAttendance.inTime = action.payload.intime;
//       state.todayAttendance.attendanceId = action.payload.attendanceId;
//       asyncSetUser(state)
//     },
//     setOutTime: (state, action) => {
//       state.todayAttendance.outTime = action.payload.outtime;
//       state.todayAttendance.attendanceId = action.payload.id;
//       asyncSetUser(state);
//     },


//   }
// })

// export const { addUser, deleteUser, setInTime, setOutTime } = userSlice.actions
// export default userSlice.reducer
