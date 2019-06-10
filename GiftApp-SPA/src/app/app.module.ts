import { AttendingEventListComponent } from './_event/attending-event-list/attending-event-list.component';
import { CommentService } from './_services/comment.service';
import { LoginRegisterModalService } from './_services/login-register-modal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { AuthService } from './_services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatDialogModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddGiftComponent } from './add-gift/add-gift.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppRoutes } from './appRoutes';
import { JwtModule } from '@auth0/angular-jwt';
import { GiftForComponent } from './gift-for/gift-for.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';
import { EventService } from './_services/event.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { SliderModule } from 'primeng/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AddParticipantsComponent } from './add-participants/add-participants.component';
import { ViewParticipantsComponent } from './view-participants/view-participants.component';
import { DateService } from './_services/date.service';
import { MatTableModule } from '@angular/material/table';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { GiftDetailsComponent } from './gift-details/gift-details.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { EmailRepeatDirective } from './_validators/emailRepeat';
import { GetSeededDataService } from './_services/get-seeded-data.service';
import { LoginRegisterModalComponent } from './login-register-modal/login-register-modal.component';
import { EventEditShowComponent } from './_event/event-edit-show/event-edit-show.component';
import { PasswordService } from './_services/password.service';
import { PassswordChangeComponent } from './passsword-change/passsword-change.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CreateEventComponent } from './_event/create-event/create-event.component';
import { EventDetailsComponent } from './_event/event-details/event-details/event-details.component';
import { TextCut } from './_pipes/TextCut';
import { HostingEventListComponent } from './_event/hosting-event-list/hosting-event-list.component';
import { MapsService } from './_services/maps.service';
import { MyGiftsListEventComponent } from './_event/event-details/my-gifts-list-event/my-gifts-list-event.component';
import { EventPartcipantsComponent } from './_event/event-details/event-partcipants/event-partcipants.component';
import { EventChatComponent } from './_event/event-details/event-chat/event-chat.component';
import { ShowGiftsComponent } from './_gift/show-gifts/show-gifts.component';
import { CreateGiftComponent } from './_gift/create-gift/create-gift.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddGiftFromWishlistComponent } from './_gift/add-gift-from-wishlist/add-gift-from-wishlist.component';
import { AfterCreateQuestionComponent } from './_event/create-event/after-create-question/after-create-question.component';
import { ShuffledGiftsComponent } from './_event/event-details/shuffled-gifts/shuffled-gifts.component';
import { MatToolbarModule, MatSidenavModule} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';






export function tokenGetter() {
  return localStorage.getItem('token') || localStorage.getItem('passChangeToken');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddGiftComponent,
    LoginFormComponent,
    CreateEventComponent,
    AttendingEventListComponent,
    GiftForComponent,
    RegisterNewUserComponent,
    RegisterFormComponent,
    HomepageComponent,
    EmailRepeatDirective,
    TextCut,
    AddParticipantsComponent,
    ViewParticipantsComponent,
    CommentSectionComponent,
    WishListComponent,
    GiftDetailsComponent,
    LoginRegisterModalComponent,
    EventEditShowComponent,
    PassswordChangeComponent,
    EventDetailsComponent,
    HostingEventListComponent,
    MyGiftsListEventComponent,
    EventPartcipantsComponent,
    EventChatComponent,
    ShowGiftsComponent,
    CreateGiftComponent,
    AddGiftFromWishlistComponent,
    AfterCreateQuestionComponent,
    ShuffledGiftsComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollDispatchModule,
    MatExpansionModule,
    MatTooltipModule,
    MatExpansionModule,
    MatIconModule,
    TooltipModule,
    MatRadioModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatGridListModule,
    MatStepperModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    InputTextModule,
    MatButtonModule,
    MatFormFieldModule,
    SliderModule,
    RadioButtonModule,
    AccordionModule,
    CalendarModule,
    MatDialogModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/Auth']
      }
    }),
    LayoutModule
  ],
  entryComponents: [AddParticipantsComponent, GiftDetailsComponent, LoginRegisterModalComponent, AfterCreateQuestionComponent],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    AlertifyService,
    EventService,
    PasswordService,
    GetSeededDataService,
    LoginRegisterModalService,
    DateService,
    MapsService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
