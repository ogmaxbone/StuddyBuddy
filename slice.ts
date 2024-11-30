import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Group {
    id: string;
    groupName: string;
    studyTime: string;
    groupSize: string;
    studyDuration: string;
    demographic: string;
    image: string;
    createdAt: any;
    members: string[];
  }

  

interface User {
  name: string;
  avatar: string;
  username: string;
  uid: string;
  graduationYear: string;
  email: string;
  major: string;
  university: string;
  groups: Group[];
  messages: any[];
  users: any[];
}

const initialState: User = {
  name: '',
  avatar: '',
  username: '',
  uid: '',
  email: "",
  university: '',
  major: '',
  graduationYear: '',
  groups: [],
  messages: [],
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<User>>) => {
      return { ...state, ...action.payload };
    },
    setGroups: (state, action: PayloadAction<any[]>) => {
      state.groups = action.payload;
    },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
    setUsers: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, setGroups, setMessages, setUsers, clearUserData } = userSlice.actions;
export default userSlice.reducer;