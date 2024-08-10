import { Model } from "@nozbe/watermelondb";
import { field, text, date } from '@nozbe/watermelondb/decorators'

export default class Profile extends Model {
    static table = 'profile';
    @text('name') name;
    @field('img_uri') imageUri;
    @field('profession') profession;
    @field('phone_number') phoneNumber;
    @field('country_code') countryCode;
    @date('dob') dob;
}