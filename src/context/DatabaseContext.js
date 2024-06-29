import React, { createContext, useContext, useMemo } from 'react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'
import { createTriggerNotification, cancelNotification } from '../utils/notification';

const DatabaseContext = createContext(database);

export const DatabaseProvider = ({ children }) => {
    const databaseOperations = useMemo(() => ({
        database: database,
        addNewCategory: async (name, description, priority) => {
            const existingCategory = await database.get('categories').query(Q.where('name', name)).fetch();
            if (existingCategory.length > 0) {
                throw new Error('This category already exists');
            }
            return await database.write(async () => {
                await database.get('categories').create(category => {
                    category.name = name;
                    category.description = description;
                    category.priority = priority;
                });
            });
        },

        editCategory: async (name, description, priority, category) => {
            return await database.write(async () => {
                await category.update(c => {
                    c.description = description;
                    c.priority = priority;
                    c.name = name;
                });
            });
        },

        deleteCategory: async (category) => {
            return await database.write(async () => {
                const relatedTasks = await database.collections.get('tasks').query(
                    Q.where('category_id', category.id)
                ).fetch();
                for (const task of relatedTasks) {
                    await task.destroyPermanently();
                }
                await category.destroyPermanently();
            });
        },

        getAllCategories: async () => {
            const categories = await database.get('categories').query().fetch();
            return categories;
        },

        getCategoryByName: async (categoryName) => {
            if (categoryName) {
                const categoryData = await database.get('categories').query(
                    Q.where("name", categoryName)
                )
                return categoryData[0]
            }
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
            const notificationTime = new Date(new Date(startDate).getTime() - 5 * 60000)
            createTriggerNotification(startDate, taskBody);
        },

        getTaskByCategory: async (categoryName) => {
            const categories = await database.get('categories').query(Q.where('name', categoryName)).fetch();
            if (categories.length == 0) {
                throw new Error('This category does not exists');
            }
            const category = categories[0];
            const tasks = await category.tasks.fetch();

            // Map through the tasks to extract relevant data
            const taskDetails = tasks.map(task => ({
                id: task.id,
                body: task.body,
                startDate: task.startDate,
                dueDate: task.dueDate,
                isCompleted: task.isCompleted,
            }));

            return taskDetails;
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
                createTriggerNotification(task.startDate(), task.taskBody);
            } else {
                cancelNotification(task.startDate.getTime());
            }
            await database.write(async () => {
                await task.update(t => {
                    t.isCompleted = !task.isCompleted;
                });
            });
        }

    }))

    return (
        <DatabaseContext.Provider value={databaseOperations}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabase = () => useContext(DatabaseContext);
