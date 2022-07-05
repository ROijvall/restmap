import { createSlice } from '@reduxjs/toolkit'

export const topSlice = createSlice({
  name: 'top',
  initialState: {
    tops: []
  },
  reducers: {
    add: (state, action) => {
      console.log(action);
      //state.tops.push(action.payload);
    },
    /*changeValue: (state, action) => {
      var accessList = action.payload;
      state.tops = 1;
    },
    changeKey: (state, action) => {
      state.tops += action.payload;
    }*/
  }
})

export const selectTops = state => state.top.tops;
export const { add, changeValue, changeKey } = topSlice.actions

export default topSlice.reducer