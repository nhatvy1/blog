import { fetchUsers } from '@/apiRequest/user'
import { IResLogin } from '@/types/auth.type'
import { IUser } from '@/types/user.type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserSliceState {
  loading: boolean
  listUsers: IUser[]
  selectedUser: IUser | null | undefined
  totalPage: number
}

const initialState: UserSliceState = {
  loading: false,
  listUsers: [],
  selectedUser: null,
  totalPage: 1
}

export const getListUsers = createAsyncThunk(
  'user/getListUser',
  async (
    filter: string,
    { rejectWithValue }
  ) => {
    try {
      
      const response = await fetchUsers(filter)
      return response
    } catch (e) {
      console.log(e)
      return rejectWithValue(e)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleSelectUser: (
      state,
      action: PayloadAction<IUser | null | undefined>
    ) => {
      state.selectedUser = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getListUsers.pending, (state, action) => {
        state.loading = true
        state.listUsers = []
      })
      .addCase(getListUsers.fulfilled, (state, action) => {
        state.loading = false
        state.listUsers = action.payload.result.data
        state.totalPage = action.payload.result.totalPage
      })
      .addCase(getListUsers.rejected, (state) => {
        state.loading = false
      })
  }
})

export const { handleSelectUser } = userSlice.actions
export const userReducer = userSlice.reducer
