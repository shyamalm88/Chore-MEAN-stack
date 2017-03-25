import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SelectModule } from 'ng2-select';
import * as _ from 'underscore';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';

import { HttpService } from './common/services/http.service';
import { AuthService } from './common/services/auth.service';
import { SharedDataService } from './common/services/shared.data.services';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChoreDropdownBoard } from './header/board/board.dropdown.component';
import { ChoreAddBoardTeam } from './header/add/add.component';
import { ChoreNotification } from './header/notification/notification.component';
import { ChoreProfile } from './header/profile/profile.component';
import { MainComponent } from './main/main.component';
import { ProjectComponent } from './main/project/project.component';
import { ProjectNameComponent } from './header/projectname/projectname.component';
import { Team } from './main/project/team/team.component';
import { BoardCanvasComponent } from './main/project/boardcanvas/boardcanvas.component';
import { PortletComponent } from './main/project/boardcanvas/portlet/portlet.component';
import { PortletActionsComponent } from './main/project/boardcanvas/portlet/portletactions/portletactions.component';
import { PortletAssignedComponent } from './main/project/boardcanvas/portlet/portletassigned/portletassigned.component';
import { PortletCardLabelComponent } from './main/project/boardcanvas/portlet/portletcardlebel/portletcardlabel.component';
import { PortletCardLabelEditComponent } from './main/project/boardcanvas/portlet/portletcardlebel/portletcardlabeledit.component';
import { PortletModalComponent } from './main/project/boardcanvas/portlet/portletmodal/portletmodal.component';
import { CreateEditBoardComponent } from './main/project/createboard/create_edit_board.component';
import { CreateBoardComponent } from './main/project/createboard/create/create.component';
import { ListBoardComponent } from './main/project/createboard/listboard/listboard.component';
import { CharCount } from './common/directive/charcount.directive';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileDetailsComponent } from './header/profile/profile.details.component';
import { TeamListComponent } from './main/project/createteam/teamlist.component';
import { CreateTeamComponent } from './main/project/createteam/createteam.component';
import { SingleSelectComponent } from './common/component/single_select/singleSelect.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/board', pathMatch: 'full' },
  { path: 'chore/c/:boardid/:boardname', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'board', component: CreateEditBoardComponent },
  { path: 'profile', component: ProfileDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CharCount,
    // FileSelectDirective,
    // FileDropDirective,
    UPLOAD_DIRECTIVES,
    HeaderComponent,
    ChoreDropdownBoard,
    ChoreAddBoardTeam,
    ChoreNotification,
    ChoreProfile,
    MainComponent,
    ProjectComponent,
    ProjectNameComponent,
    Team,
    BoardCanvasComponent,
    PortletComponent,
    PortletActionsComponent,
    PortletAssignedComponent,
    PortletCardLabelComponent,
    PortletCardLabelEditComponent,
    PortletModalComponent,
    CreateEditBoardComponent,
    CreateBoardComponent,
    ListBoardComponent,
    SignupComponent,
    LoginComponent,
    ProfileDetailsComponent,
    CreateTeamComponent,
    TeamListComponent,
    SingleSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    DragulaModule,
    SelectModule,
  ],
  providers: [HttpService, SharedDataService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
