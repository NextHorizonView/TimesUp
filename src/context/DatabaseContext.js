import React, { createContext, useContext, useMemo } from 'react'
import database from '../watermellon.config'
import { Q } from '@nozbe/watermelondb'

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
        addEvent: async () => {}

    }))

    return (
        <DatabaseContext.Provider value={databaseOperations}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabase = () => useContext(DatabaseContext);
