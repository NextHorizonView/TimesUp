import database from '../watermellon.config';
import { Q } from '@nozbe/watermelondb'

export const getCategoryDetails = async (categoryName) => {
    if (categoryName) {
        console.log(categoryName);
        const categoryData = await database.get('categories').query(
            Q.where("name", categoryName)
        )
        return categoryData[0]
    }
};