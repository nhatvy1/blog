import { fetchRoles } from '@/apiRequest/role'
import { IRole } from '@/types/role.type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface TeamSliceState {
  loading: boolean
  listRoles: IRole[]
}

const initialState: TeamSliceState = {
  loading: false,
  listRoles: []
}

export const getListRoles = createAsyncThunk(
  'role/getListRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchRoles()
      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(getListRoles.fulfilled, (state, action) => {
        state.loading = false
        state.listRoles = action.payload.result
      })
      .addCase(getListRoles.rejected, (state) => {
        state.loading = false
      })
  }
})

export const roleReducer = roleSlice.reducer
