import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const taskSlice = createSlice({
    name: 'Task',
    initialState: initialState,
    reducers: {
        addNewTask: (state, action) => {
            const { date, category, task } = action.payload;
            
            if (!state[date]) {
                state[date] = {};
            }

            if (!state[date][category]) {
                state[date][category] = [];
            }

            state[date][category].push(task);
        },

        setFinishTask: (state, action) => {
            const { date, category, index } = action.payload;

            if (state[date] && state[date][category] && state[date][category][index]) {
                state[date][category][index].isFinished = !state[date][category][index].isFinished;
            }
        }
    }
});

export const { addNewTask, setFinishTask } = taskSlice.actions;
export default taskSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {};

// export const taskSlice = createSlice({
//     name: 'Task',
//     initialState: initialState,
//     reducers: {
//         addNewTask: (state, action) => {
//             const { date, category, task } = action.payload;
//             if (!state[date]) {
//                 state[date] = {};
//                 state[date][category] = [task];
//             } else {
//                 if (state[date][category]) {
//                     state[date][category].push(task);
//                 } else {
//                     state[date][category] = [task];
//                 }
//             }
//         },

//         setFinishTask: (state, action) => {
//             const { date, category, task } = action.payload;
//             state[date][category][index] = !state[date][category][index]
//         }
//     }
// });

// export const { addNewTask, setFinishTask } = taskSlice.actions;
// export default taskSlice.reducer;

