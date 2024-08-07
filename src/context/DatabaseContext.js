import React, { createContext, useContext, useMemo } from 'react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import { sendTaskReminder, cancelNotification, sendCongratulatoryMessage } from '../utils/notification';

const DatabaseContext = createContext(database);

export const DatabaseProvider = ({ children }) => {
    const databaseOperations = useMemo(() => ({
        database: database,

        deleteTask: async (taskId) => {
            const task = await database.get('tasks').query(Q.where('id', taskId)).fetch();
            return await database.write(async () => {
                await task[0].destroyPermanently()
            })
        },

        addNewTask: async (taskBody, startDate, dueDate, categoryName) => {
            const existingCategory = await database.get('categories').query(Q.where('name', categoryName)).fetch();
            if (startDate > dueDate) {
                throw new Error('Start date cannot be after end date');
            }
            if (existingCategory.length == 0) {
                throw new Error('This category does not exists');
            }
            const category = existingCategory[0];

            await database.write(async () => {
                await database.get('tasks').create(task => {
                    task.body = taskBody;
                    task.startDate = startDate;
                    task.dueDate = dueDate;
                    task.category.set(category);
                    task.isCompleted = false;
                });
            });
            sendTaskReminder(startDate, taskBody);
        },

        getUserData: async () => {
            const user = await database.get('profiles').query().fetch();
            if (user.length != 0) {
                const userData = {
                    username: user[user.length - 1].username,
                    profession: user[user.length - 1].profession,
                    imageUri: user[user.length - 1].imageUri,
                }
                return userData;
            } return {};
        },

        toggleTaskCompletion: async (task) => {
            if (task.isCompleted && task.startDate > new Date(new Date() - 5 * 60000)) {
                sendTaskReminder(task.startDate, task.taskBody);
            } else {
                cancelNotification(task.startDate.getTime());
            }
            await database.write(async () => {
                await task.update(t => {
                    t.isCompleted = !task.isCompleted;
                });
            });

        },

        addEvent: async () => {}

    }))

    return (
        <DatabaseContext.Provider value={databaseOperations}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabase = () => useContext(DatabaseContext);
