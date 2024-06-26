import { Model } from "@nozbe/watermelondb";
import { field, text, date, relation } from '@nozbe/watermelondb/decorators'

export default class Task extends Model {
    static table = 'tasks'
    static associations = {
        categories: { type: 'belongs_to', key: 'category_id' },
    }

    @text('body') body;
    @date('start_date') startDate;
    @date('due_date') dueDate;
    @field('is_completed') isCompleted;
    @relation('categories', 'category_id') category;
}
