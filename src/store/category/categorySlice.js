import { createSlice } from "@reduxjs/toolkit";
import { completeTask, markAllASCompleted } from "../../utils/utils";
import { format } from "date-fns"

const initialState = {
    categoriesList: ['General'],
    'General': {
        description: 'These are just general tasks',
        priority: 3,
        pendingTasks: [],
        tasks: {},
    },
};

export const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        addNewCategory: (state, action) => {
            const { categoryName, categoryDetails } = action.payload;
            state[categoryName] = {
                ...categoryDetails,
                tasks: {},
                pendingTasks: [],

            };
            state.categoriesList = [
                ...state.categoriesList,
                categoryName
            ].sort((a, b) => state[b].priority - state[a].priority);
        },

        editCategory: (state, action) => {
            const { categoryName, categoryDetails } = action.payload;
            const { name, description, priority } = categoryDetails;
            if (state.categoriesList.includes(categoryName)) {
                if (categoryName != name) {
                    const index = state.categoriesList.indexOf(categoryName);
                    state.categoriesList[index] = name;
                    const categoryData = state[categoryName];
                    delete state[categoryName];
                    state[name] = {
                        ...categoryData,
                        ...categoryDetails,
                    }
                } else {
                    state[name] = {
                        ...state[name],
                        ...categoryDetails,
                    }
                }
                state.categoriesList.sort((a, b) => state[b].priority - state[a].priority);
            }
        },
        deleteCategory: (state, action) => {
            const { categoryName } = action.payload;
            if (state.categoriesList.includes(categoryName)) {
                state.categoriesList.splice(categoryName, 1);
                delete state[categoryName];
            }
        },

        addNewTask: (state, action) => {
            const { categoryName, taskDate, taskDetails } = action.payload;
            state[categoryName].pendingTasks.push(taskDetails);
            if (!state[categoryName].tasks[taskDate]) {
                state[categoryName].tasks[taskDate] = [];
            }
            state[categoryName].tasks[taskDate].push(taskDetails);
            state[categoryName].tasks[taskDate].sort((a, b) => new Date(a["startDate"]) - new Date(b["startDate"]));
        },

        editTask: (state, action) => {
            const { categoryName, taskDate, taskDetails } = action.payload;
        },
        deleteTask: (state, action) => { },
        onChangeTaskStatus: (state, action) => {
            const { category, startDate } = action.payload;
            completeTask(state, category, startDate);
        },

    }
});

export const { addNewCategory, editCategory, deleteCategory, addNewTask, onChangeTaskStatus } = categorySlice.actions;

export default categorySlice.reducer;
