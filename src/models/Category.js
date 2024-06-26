import { Model } from "@nozbe/watermelondb";
import { field, text, children } from '@nozbe/watermelondb/decorators'

export default class Category extends Model {
    static table = 'categories'
    static associations = {
        tasks: { type: 'has_many', foreignKey: 'category_id' },
    }

    @text('name') name;
    @text('description') description;
    @field('priority') priority;
    @children('tasks') tasks;

    async getCategory() {
        return this.category.fetch();
    }
}
