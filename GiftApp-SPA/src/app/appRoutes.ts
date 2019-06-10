import { HostingEventListComponent } from './_event/hosting-event-list/hosting-event-list.component';
import { EventEditShowComponent } from './_event/event-edit-show/event-edit-show.component';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AttendingEventListComponent } from './_event/attending-event-list/attending-event-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { AddGiftComponent } from './add-gift/add-gift.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { Routes } from '@angular/router';
import { GiftForComponent } from './gift-for/gift-for.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PassswordChangeComponent } from './passsword-change/passsword-change.component';
import { PassChangeGuard } from './_guards/pass-change.guard';
import { EventDetailsComponent } from './_event/event-details/event-details/event-details.component';



export const  AppRoutes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'gift', component: AddGiftComponent, canActivate: [AuthGuard]},
    {path: 'gift-for', component: GiftForComponent, canActivate: [AuthGuard]},
    {path: 'register-new-user', component: RegisterFormComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'HostingEvents', component: HostingEventListComponent, canActivate: [AuthGuard]},
    {path: 'AddParticipants/:eventId', component: AddParticipantsComponent, canActivate: [AuthGuard]},
    {path: 'AttendingEvents', component: AttendingEventListComponent, canActivate: [AuthGuard]},
    {path: 'AddGift/:eventName/:eventId', component: AddGiftComponent, canActivate: [AuthGuard]},
    {path: 'MyWishList', component: WishListComponent, canActivate: [AuthGuard]},
    {path: 'EventShowEdit/:eventId', component: EventEditShowComponent, canActivate: [AuthGuard]},
    {path: 'PasswordChange/:jwtToken',  component: PassswordChangeComponent},
    {path: 'EventDetails/:eventId', component: EventDetailsComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
