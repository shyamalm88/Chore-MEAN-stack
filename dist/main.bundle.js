webpackJsonp([1,4],{

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Todo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TodoStore; });
var Todo = (function () {
    function Todo(title) {
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
    }
    Object.defineProperty(Todo.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value.trim();
        },
        enumerable: true,
        configurable: true
    });
    return Todo;
}());

var TodoStore = (function () {
    function TodoStore() {
        var persistedTodos = JSON.parse(localStorage.getItem('chore-card-todos') || '[]');
        // Normalize back into classes
        this.todos = persistedTodos.map(function (todo) {
            var ret = new Todo(todo._title);
            ret.completed = todo.completed;
            return ret;
        });
    }
    TodoStore.prototype.updateStore = function () {
        localStorage.setItem('chore-card-todos', JSON.stringify(this.todos));
    };
    TodoStore.prototype.getWithCompleted = function (completed) {
        return this.todos.filter(function (todo) { return todo.completed === completed; });
    };
    TodoStore.prototype.allCompleted = function () {
        return this.todos.length === this.getCompleted().length;
    };
    TodoStore.prototype.setAllTo = function (completed) {
        this.todos.forEach(function (t) { return t.completed = completed; });
        this.updateStore();
    };
    TodoStore.prototype.removeCompleted = function () {
        this.todos = this.getWithCompleted(false);
        this.updateStore();
    };
    TodoStore.prototype.getRemaining = function () {
        return this.getWithCompleted(false);
    };
    TodoStore.prototype.getCompleted = function () {
        return this.getWithCompleted(true);
    };
    TodoStore.prototype.toggleCompletion = function (todo) {
        todo.completed = !todo.completed;
        this.updateStore();
    };
    TodoStore.prototype.remove = function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
        this.updateStore();
    };
    TodoStore.prototype.add = function (title) {
        this.todos.push(new Todo(title));
        this.updateStore();
    };
    return TodoStore;
}());

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/store.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__ = __webpack_require__(255);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HttpService = (function () {
    function HttpService(http, router, slimLoadingBarService) {
        this.http = http;
        this.router = router;
        this.slimLoadingBarService = slimLoadingBarService;
    }
    //get all data
    HttpService.prototype.getData = function (url) {
        var _this = this;
        this.slimLoadingBarService.start();
        return this.http
            .get(url)
            .map(this.extractData, this.slimLoadingBarService.complete())
            .catch(function (err) {
            _this.slimLoadingBarService.complete();
            return _this.handleError(err);
        });
    };
    // public socialLogin(url: string): Observable<Response> {
    //   return this.http.get(url).map(this.extractData).catch(this.handleError);
    // }
    //posting data
    HttpService.prototype.postData = function (url, data) {
        var _this = this;
        this.slimLoadingBarService.start();
        return this.http
            .post(url, data)
            .map(this.extractData, this.slimLoadingBarService.complete())
            .catch(function (err) {
            _this.slimLoadingBarService.complete();
            return _this.handleError(err);
        });
    };
    //editing data
    HttpService.prototype.editData = function (url, data) {
        var _this = this;
        this.slimLoadingBarService.start();
        return this.http
            .put(url, data)
            .map(this.extractData, this.slimLoadingBarService.complete())
            .catch(function (err) {
            _this.slimLoadingBarService.complete();
            return _this.handleError(err);
        });
    };
    // delete data
    HttpService.prototype.deleteImage = function (url, data) {
        var _this = this;
        this.slimLoadingBarService.start();
        return this.http
            .put(url, data)
            .map(this.extractData, this.slimLoadingBarService.complete())
            .catch(function (err) {
            _this.slimLoadingBarService.complete();
            return _this.handleError(err);
        });
    };
    HttpService.prototype.deleteData = function (url) {
        var _this = this;
        return this.http
            .delete(url)
            .catch(function (err) {
            return _this.handleError(err);
        });
    };
    HttpService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    HttpService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            if (error.status === 401) {
                //console.log('not loggedin');
                //this.router.navigate(['/login']);
            }
            else {
                var body = error.json() || {};
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(errMsg);
    };
    return HttpService;
}());
HttpService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__["b" /* SlimLoadingBarService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_slim_loading_bar__["b" /* SlimLoadingBarService */]) === "function" && _c || Object])
], HttpService);

var _a, _b, _c;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/http.service.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constant; });
var Constant = (function () {
    function Constant() {
    }
    return Constant;
}());

Constant.API_ENDPOINT = 'http://localhost:8080/api/';
Constant.ROUTE_ENDPOINT = 'http://localhost:8080/';
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/constant.js.map

/***/ }),

/***/ 309:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 309;


/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(325);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/main.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(544),
        styles: [__webpack_require__(543)],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], AppComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/app.component.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_slim_loading_bar__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_ckeditor__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_ckeditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_ckeditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_focus__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_focus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_focus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_dragula_ng2_dragula__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_dragula_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_select__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_file_uploader_ng2_file_uploader__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__common_services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__common_services_shared_data_services__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__header_header_component__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__header_board_board_dropdown_component__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__header_add_add_component__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__header_notification_notification_component__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__header_profile_profile_component__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__main_main_component__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__main_project_project_component__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__header_projectname_projectname_component__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__main_project_team_team_component__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__main_project_boardcanvas_boardcanvas_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__main_project_boardcanvas_portlet_portlet_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__main_project_boardcanvas_portlet_portletactions_portletactions_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__main_project_boardcanvas_portlet_portletassigned_portletassigned_component__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__main_project_boardcanvas_portlet_portletcardlebel_portletcardlabel_component__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__main_project_boardcanvas_portlet_portletmodal_portletmodal_component__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__main_project_createboard_create_edit_board_component__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__main_project_createboard_create_create_component__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__main_project_createboard_listboard_listboard_component__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__common_directive_charcount_directive__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__signup_signup_component__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__login_login_component__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__header_profile_profile_details_component__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__main_project_createteam_teamlist_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__main_project_createteam_createteam_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__common_component_single_select_singleSelect_component__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__common_pipe__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42_angular2_emoji__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__common_services_store__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__main_project_boardcanvas_portlet_portletmodal_portlettodo_component__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__common_directive_autofocus_directive__ = __webpack_require__(327);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// import * as io from 'socket.io-client';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';



































var appRoutes = [
    { path: '', redirectTo: '/board', pathMatch: 'full' },
    { path: 'chore/c/:boardid/:boardname', component: __WEBPACK_IMPORTED_MODULE_21__main_main_component__["a" /* MainComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_36__login_login_component__["a" /* LoginComponent */] },
    { path: 'signup', component: __WEBPACK_IMPORTED_MODULE_35__signup_signup_component__["a" /* SignupComponent */] },
    { path: 'board', component: __WEBPACK_IMPORTED_MODULE_31__main_project_createboard_create_edit_board_component__["a" /* CreateEditBoardComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_37__header_profile_profile_details_component__["a" /* ProfileDetailsComponent */] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_41__common_pipe__["a" /* SafeHtmlPipe */],
            __WEBPACK_IMPORTED_MODULE_41__common_pipe__["b" /* OrderByPipe */],
            __WEBPACK_IMPORTED_MODULE_34__common_directive_charcount_directive__["a" /* CharCount */],
            __WEBPACK_IMPORTED_MODULE_45__common_directive_autofocus_directive__["a" /* AutofocusDirective */],
            __WEBPACK_IMPORTED_MODULE_11_ng2_file_uploader_ng2_file_uploader__["a" /* UPLOAD_DIRECTIVES */],
            __WEBPACK_IMPORTED_MODULE_16__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_17__header_board_board_dropdown_component__["a" /* ChoreDropdownBoard */],
            __WEBPACK_IMPORTED_MODULE_18__header_add_add_component__["a" /* ChoreAddBoardTeam */],
            __WEBPACK_IMPORTED_MODULE_19__header_notification_notification_component__["a" /* ChoreNotification */],
            __WEBPACK_IMPORTED_MODULE_20__header_profile_profile_component__["a" /* ChoreProfile */],
            __WEBPACK_IMPORTED_MODULE_21__main_main_component__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_22__main_project_project_component__["a" /* ProjectComponent */],
            __WEBPACK_IMPORTED_MODULE_23__header_projectname_projectname_component__["a" /* ProjectNameComponent */],
            __WEBPACK_IMPORTED_MODULE_24__main_project_team_team_component__["a" /* Team */],
            __WEBPACK_IMPORTED_MODULE_25__main_project_boardcanvas_boardcanvas_component__["a" /* BoardCanvasComponent */],
            __WEBPACK_IMPORTED_MODULE_26__main_project_boardcanvas_portlet_portlet_component__["a" /* PortletComponent */],
            __WEBPACK_IMPORTED_MODULE_27__main_project_boardcanvas_portlet_portletactions_portletactions_component__["a" /* PortletActionsComponent */],
            __WEBPACK_IMPORTED_MODULE_28__main_project_boardcanvas_portlet_portletassigned_portletassigned_component__["a" /* PortletAssignedComponent */],
            __WEBPACK_IMPORTED_MODULE_29__main_project_boardcanvas_portlet_portletcardlebel_portletcardlabel_component__["a" /* PortletCardLabelComponent */],
            __WEBPACK_IMPORTED_MODULE_30__main_project_boardcanvas_portlet_portletmodal_portletmodal_component__["a" /* PortletModalComponent */],
            __WEBPACK_IMPORTED_MODULE_31__main_project_createboard_create_edit_board_component__["a" /* CreateEditBoardComponent */],
            __WEBPACK_IMPORTED_MODULE_32__main_project_createboard_create_create_component__["a" /* CreateBoardComponent */],
            __WEBPACK_IMPORTED_MODULE_33__main_project_createboard_listboard_listboard_component__["a" /* ListBoardComponent */],
            __WEBPACK_IMPORTED_MODULE_35__signup_signup_component__["a" /* SignupComponent */],
            __WEBPACK_IMPORTED_MODULE_36__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_37__header_profile_profile_details_component__["a" /* ProfileDetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_39__main_project_createteam_createteam_component__["a" /* CreateTeamComponent */],
            __WEBPACK_IMPORTED_MODULE_38__main_project_createteam_teamlist_component__["a" /* TeamListComponent */],
            __WEBPACK_IMPORTED_MODULE_40__common_component_single_select_singleSelect_component__["a" /* SingleSelectComponent */],
            __WEBPACK_IMPORTED_MODULE_44__main_project_boardcanvas_portlet_portletmodal_portlettodo_component__["a" /* default */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_9_ng2_dragula_ng2_dragula__["DragulaModule"],
            __WEBPACK_IMPORTED_MODULE_10_ng2_select__["SelectModule"],
            __WEBPACK_IMPORTED_MODULE_8_angular2_focus__["FocusModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_7_ng2_ckeditor__["CKEditorModule"],
            __WEBPACK_IMPORTED_MODULE_6_ng2_slim_loading_bar__["a" /* SlimLoadingBarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_42_angular2_emoji__["a" /* EmojiModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_12__common_services_http_service__["a" /* HttpService */], __WEBPACK_IMPORTED_MODULE_14__common_services_shared_data_services__["a" /* SharedDataService */], __WEBPACK_IMPORTED_MODULE_13__common_services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_43__common_services_store__["a" /* TodoStore */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/app.module.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SingleSelectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SingleSelectComponent = (function () {
    function SingleSelectComponent() {
        this.onSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.teamsName = [];
        this.value = {};
        this._disabledV = '0';
        this.disabled = false;
    }
    SingleSelectComponent.prototype.ngOnChanges = function () {
        for (var i = 0; i < this.teams.length; i++) {
            this.teamsName.push(this.teams[i].name);
        }
        this.items = this.teamsName;
    };
    Object.defineProperty(SingleSelectComponent.prototype, "disabledV", {
        get: function () {
            return this._disabledV;
        },
        set: function (value) {
            this._disabledV = value;
            this.disabled = this._disabledV === '1';
        },
        enumerable: true,
        configurable: true
    });
    SingleSelectComponent.prototype.selected = function (value) {
        //console.log('Selected value is: ', value);
        this.onSelected.emit(value.text);
    };
    SingleSelectComponent.prototype.removed = function (value) {
        //console.log('Removed value is: ', value);
    };
    SingleSelectComponent.prototype.typed = function (value) {
        //console.log('New search input: ', value);
    };
    SingleSelectComponent.prototype.refreshValue = function (value) {
        this.value = value;
    };
    return SingleSelectComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], SingleSelectComponent.prototype, "teams", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SingleSelectComponent.prototype, "onSelected", void 0);
SingleSelectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-single-select',
        template: __webpack_require__(545)
    })
], SingleSelectComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/singleSelect.component.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutofocusDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutofocusDirective = (function () {
    function AutofocusDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ;
    AutofocusDirective.prototype.ngOnInit = function () {
        this.elementRef.nativeElement.focus();
    };
    AutofocusDirective.prototype.ngOnChanges = function () {
        this.elementRef.nativeElement.focus();
    };
    return AutofocusDirective;
}());
AutofocusDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[myAutofocus]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], AutofocusDirective);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/autofocus.directive.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CharCount; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CharCount = (function () {
    function CharCount(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
        this._defaultLimit = 200;
    }
    CharCount.prototype._onKeyUp = function () {
        var count = this._elRef.nativeElement.value.length;
        this._renderer.setText(this._countDisplay, (this._limit - count) + ' remaining.');
        if (count > this._limit) {
            this._renderer.setElementStyle(this._countDisplay, 'color', 'red');
            this._elRef.nativeElement.nextElementSibling.innerText = (this._limit - this._elRef.nativeElement.value.length) + ' remaining.';
        }
        else {
            this._renderer.setElementStyle(this._countDisplay, 'color', 'inherit');
            this._elRef.nativeElement.nextElementSibling.innerText = (this._limit - this._elRef.nativeElement.value.length) + ' remaining.';
        }
    };
    CharCount.prototype.ngOnInit = function () {
        this._limit = this._limit || this._defaultLimit;
        this._countDisplay = this._renderer.createElement(this._elRef.nativeElement.parentElement, 'span');
        this._renderer.createText(this._countDisplay, (this._limit - this._elRef.nativeElement.value.length) + ' remaining.');
    };
    return CharCount;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('charCount'),
    __metadata("design:type", Number)
], CharCount.prototype, "_limit", void 0);
CharCount = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[charCount]',
        inputs: ['limit:charCount'],
        host: {
            '(keyup)': '_onKeyUp()',
        }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _b || Object])
], CharCount);

var _a, _b;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/charcount.directive.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeHtmlPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OrderByPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitized) {
        this.sanitized = sanitized;
    }
    SafeHtmlPipe.prototype.transform = function (value) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    };
    return SafeHtmlPipe;
}());
SafeHtmlPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({ name: 'safeHtml' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["DomSanitizer"]) === "function" && _a || Object])
], SafeHtmlPipe);

/*
 * Example use
 *		Basic Array of single type: *ngFor="#todo of todoService.todos | orderBy : '-'"
 *		Multidimensional Array Sort on single column: *ngFor="#todo of todoService.todos | orderBy : ['-status']"
 *		Multidimensional Array Sort on multiple columns: *ngFor="#todo of todoService.todos | orderBy : ['status', '-title']"
 */
var OrderByPipe = OrderByPipe_1 = (function () {
    function OrderByPipe() {
    }
    OrderByPipe._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    OrderByPipe.prototype.transform = function (input, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(input))
            return input;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc = propertyToCheck.substr(0, 1) == '-';
            //Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc ? input.sort() : input.sort().reverse();
            }
            else {
                var property = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return input.sort(function (a, b) {
                    return !desc
                        ? OrderByPipe_1._orderByComparator(a[property], b[property])
                        : -OrderByPipe_1._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            //Loop over property of the array in order and sort
            return input.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? OrderByPipe_1._orderByComparator(a[property], b[property])
                        : -OrderByPipe_1._orderByComparator(a[property], b[property]);
                    //Don't return 0 yet in case of needing to sort by next property
                    if (comparison != 0)
                        return comparison;
                }
                return 0; //equal each other
            });
        }
    };
    return OrderByPipe;
}());
OrderByPipe = OrderByPipe_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({ name: 'orderBy', pure: true })
], OrderByPipe);

var _a, OrderByPipe_1;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/pipe.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedDataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SharedDataService = (function () {
    function SharedDataService() {
        this.dataArray = [];
    }
    SharedDataService.prototype.insertData = function (data) {
        this.dataArray.unshift(data);
    };
    return SharedDataService;
}());
SharedDataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SharedDataService);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/shared.data.services.js.map

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoreAddBoardTeam; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ChoreAddBoardTeam = (function () {
    function ChoreAddBoardTeam() {
    }
    return ChoreAddBoardTeam;
}());
ChoreAddBoardTeam = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-add-board-team',
        template: __webpack_require__(546),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], ChoreAddBoardTeam);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/add.component.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoreDropdownBoard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChoreDropdownBoard = (function () {
    function ChoreDropdownBoard(config) {
        // customize default values of dropdowns used by this component tree
        config.up = false;
        config.autoClose = true;
    }
    return ChoreDropdownBoard;
}());
ChoreDropdownBoard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-board-dropdown',
        template: __webpack_require__(547),
        providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]] // add NgbDropdownConfig to the component providers
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]) === "function" && _a || Object])
], ChoreDropdownBoard);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/board.dropdown.component.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    function HeaderComponent(authService) {
        this.authService = authService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.userData.subscribe(function (userData) {
            _this.loggedInUserData = userData;
            ////console.log(this.loggedInUserData);
            if (_this.loggedInUserData) {
                _this.isLoggedIn = true;
            }
        });
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-header',
        template: __webpack_require__(548),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/header.component.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoreNotification; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ChoreNotification = (function () {
    function ChoreNotification() {
    }
    return ChoreNotification;
}());
ChoreNotification = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-notification',
        template: __webpack_require__(549),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
], ChoreNotification);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/notification.component.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__ = __webpack_require__(51);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoreProfile; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChoreProfile = (function () {
    function ChoreProfile(authService) {
        this.authService = authService;
        this.userImage = "";
        this.userName = "";
    }
    ChoreProfile.prototype.ngOnInit = function () {
        this.currentUserData = this.user;
        if (this.currentUserData.facebook) {
            this.userImage = this.currentUserData.facebook.image;
            this.userName = this.currentUserData.facebook.name;
        }
        else if (this.currentUserData.google) {
            this.userImage = this.currentUserData.google.image;
            this.userName = this.currentUserData.google.name;
        }
        else {
            this.userImage = this.currentUserData.local.image;
            this.userName = this.currentUserData.local.name;
        }
    };
    return ChoreProfile;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ChoreProfile.prototype, "user", void 0);
ChoreProfile = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-profile',
        template: __webpack_require__(550),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], ChoreProfile);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/profile.component.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileDetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileDetailsComponent = (function () {
    function ProfileDetailsComponent() {
    }
    ProfileDetailsComponent.prototype.ngOnInit = function () { };
    return ProfileDetailsComponent;
}());
ProfileDetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-profile-details',
        template: __webpack_require__(551)
    }),
    __metadata("design:paramtypes", [])
], ProfileDetailsComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/profile.details.component.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectNameComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectNameComponent = (function () {
    function ProjectNameComponent(config) {
        // customize default values of dropdowns used by this component tree
        config.autoClose = false;
    }
    return ProjectNameComponent;
}());
ProjectNameComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-project-name',
        template: __webpack_require__(552),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]) === "function" && _a || Object])
], ProjectNameComponent);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/projectname.component.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(router, route, httpService, fb) {
        this.router = router;
        this.route = route;
        this.httpService = httpService;
        this.fb = fb;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.logInForm = this.fb.group({
            email: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]],
            password: ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]]
        });
    };
    LoginComponent.prototype.login = function (value, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        //console.log(this.logInForm.value)
        this.httpService.postData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].ROUTE_ENDPOINT + 'login', this.logInForm.value)
            .subscribe(function (data) {
            _this.userLoggedIndata = data;
            //console.log(this.userLoggedIndata.message);
            if (_this.userLoggedIndata.message === 'successfully logged in') {
                _this.loginSuccessMessage = true;
                _this.loginUserErrorMessage = false;
                _this.loginPasswordErrorMessage = false;
                var self_1 = _this;
                setTimeout(function () {
                    self_1.router.navigate(['']);
                }, 1000);
            }
            else if (_this.userLoggedIndata.message === 'Not a register user') {
                _this.loginUserErrorMessage = true;
                _this.loginPasswordErrorMessage = false;
            }
            else {
                _this.loginUserErrorMessage = false;
                _this.loginPasswordErrorMessage = true;
            }
        }, function (err) {
            //console.log(err)
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-login',
        template: __webpack_require__(553)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/login.component.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MainComponent = (function () {
    function MainComponent(activatedRoute, httpService) {
        this.activatedRoute = activatedRoute;
        this.httpService = httpService;
    }
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.boardId = params['boardid'];
            _this.getThisBoardDeatils();
        });
    };
    MainComponent.prototype.getThisBoardDeatils = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'portlet/' + this.boardId)
            .subscribe(function (data) {
            _this.boardData = data;
            _this.boardCoverImage = _this.boardData.coverImageUrl;
        });
    };
    return MainComponent;
}());
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-main',
        template: __webpack_require__(554),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object])
], MainComponent);

var _a, _b;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/main.component.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardCanvasComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BoardCanvasComponent = (function () {
    function BoardCanvasComponent() {
    }
    return BoardCanvasComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], BoardCanvasComponent.prototype, "board", void 0);
BoardCanvasComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-board-canvas',
        template: __webpack_require__(555),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], BoardCanvasComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/boardcanvas.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortletComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PortletComponent = (function () {
    function PortletComponent(dragulaService, modalService, router, httpService, activatedRoute, fb, zone) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.modalService = modalService;
        this.router = router;
        this.httpService = httpService;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.zone = zone;
        this.socket = __WEBPACK_IMPORTED_MODULE_7_socket_io_client__('http://localhost:8080/');
        dragulaService.drag.subscribe(function (value) {
            // console.log(value);
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            var movedCardId = value[1].dataset.cardId;
            var movedFromPortletId = value[1].dataset.portletId;
            var movedIntoPortletId = value[1].parentElement.dataset.portletId;
            var url = __WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'move/' + movedCardId + '/' + movedFromPortletId + '/' + movedIntoPortletId;
            _this.httpService.editData(url, movedCardId)
                .subscribe(function (data) {
                _this.portletData = data;
                _this.portletDataArray = _this.portletData.board.portlet;
            });
            _this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(function (value) {
            _this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(function (value) {
            _this.onOut(value.slice(1));
        });
        /**
         * for the portlet update form
         */
        this.updatePortletForm = this.fb.group({
            portletname: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["Validators"].required]
        });
        /**
         * for the card create form
         */
        this.cardCreateForm = this.fb.group({
            cardlabel: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["Validators"].required]
        });
    }
    PortletComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            _this.boardIndex = params['boardid'];
        });
        this.getAllPortlets();
        var self = this;
        this.socket.on('connect', function () {
            //console.log('connect');
        });
        this.socket.on('getCardDetails', function (data) {
            self.getAllPortlets();
        });
        this.dueDateForm = this.fb.group({
            duedate: ['']
        });
        this.changeCardName = this.fb.group({
            cardName: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["Validators"].required]
        });
    };
    PortletComponent.prototype.onDateChange = function (portletCardDueDate) {
        console.log(portletCardDueDate);
        var year;
        var month;
        var day;
        if (portletCardDueDate) {
            if (typeof (portletCardDueDate) === 'object' && portletCardDueDate !== null) {
                year = parseInt(portletCardDueDate.year, 10);
                month = parseInt(portletCardDueDate.month, 10) - 1;
                day = parseInt(portletCardDueDate.day, 10);
                this.date = new Date(year, month, day);
                console.log(this.date);
            }
            else {
                var date = portletCardDueDate;
                this.date = date;
                console.log(this.date);
            }
            this.date = new Date(this.date);
            var timeDiff = this.date.getTime() - new Date().getTime();
            this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
    };
    PortletComponent.prototype.showNameForm = function (cardName) {
        this.viewName = true;
        this.cardNamePrevValue = cardName;
        console.log(this.cardNamePrevValue);
    };
    PortletComponent.prototype.hideNameForm = function (portletId) {
        var _this = this;
        console.log(portletId);
        if (this.changeCardName.valid) {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/portlet/' + portletId + '/edit', this.changeCardName.value)
                .subscribe(function (response) {
                _this.portletData = response;
                console.log(_this.portletData);
                _this.portletDataArray = _this.portletData.board.portlet;
                _this.socket.emit('updateCard', 'message');
            });
        }
        else {
            this.changeCardName.controls['cardName'].setValue(this.cardNamePrevValue);
        }
        this.viewName = false;
    };
    /**
     * this function is used for updating
     * view from child update
     * @param responseFromChild
     */
    PortletComponent.prototype.portletUpdate = function (responseFromChild) {
        this.portletDataArray = responseFromChild;
        this.socket.emit('updateCard', 'message');
    };
    PortletComponent.prototype.cardUpdate = function (responsefromCardChild) {
        this.portletDataArray = responsefromCardChild;
        this.socket.emit('updateCard', 'message');
    };
    /**
     * get all portlets from database
     */
    PortletComponent.prototype.getAllPortlets = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'portlet/' + this.boardIndex)
            .subscribe(function (data) {
            _this.portletData = data;
            _this.portletDataArray = _this.portletData.portlet;
        });
    };
    /**
     *
     * @param index add portlets into database
     */
    PortletComponent.prototype.addPortlet = function (index) {
        var _this = this;
        if (this.updatePortletForm.value.portletname) {
            var data = this.updatePortletForm.value;
            data.boardId = this.boardIndex;
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'portlet/' + this.boardIndex, data)
                .subscribe(function (response) {
                _this.portletData = response;
                _this.portletDataArray = _this.portletData.board.portlet;
                console.log(_this.portletDataArray);
                _this.updatePortletForm.reset();
                _this.dropdown.close();
                _this.socket.emit('updateCard', 'message');
            });
        }
    };
    /**
     * this function is for adding cards into database
     */
    PortletComponent.prototype.addCard = function (formValue, item) {
        var _this = this;
        if (formValue.value.cardlabel) {
            var data = formValue.value;
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'add/cards/' + item.portletId, data)
                .subscribe(function (response) {
                _this.portletData = response;
                _this.portletDataArray = _this.portletData.board.portlet;
                formValue.reset();
                _this.hideme(item);
                _this.socket.emit('updateCard', 'message');
            });
        }
    };
    PortletComponent.prototype.hideme = function (item) {
        item.hideme = !item.hideme;
    };
    //modal open
    PortletComponent.prototype.openModal = function (content) {
        this.modalService.open(content);
    };
    PortletComponent.prototype.hasClass = function (el, name) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    };
    PortletComponent.prototype.addClass = function (el, name) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    };
    PortletComponent.prototype.removeClass = function (el, name) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    };
    PortletComponent.prototype.onDrag = function (args) {
        var e = args[0], el = args[1];
        this.removeClass(e, 'ex-moved');
    };
    PortletComponent.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        this.addClass(e, 'ex-moved');
    };
    PortletComponent.prototype.onOver = function (args) {
        var e = args[0], el = args[1], container = args[2];
        this.addClass(el, 'ex-over');
    };
    PortletComponent.prototype.onOut = function (args) {
        var e = args[0], el = args[1], container = args[2];
        this.removeClass(el, 'ex-over');
    };
    return PortletComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletComponent.prototype, "board", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbDropdown */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbDropdown */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["d" /* NgbDropdown */]) === "function" && _a || Object)
], PortletComponent.prototype, "dropdown", void 0);
PortletComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-portlet',
        template: __webpack_require__(556),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__["DragulaService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_dragula_ng2_dragula__["DragulaService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_services_http_service__["a" /* HttpService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormBuilder"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _h || Object])
], PortletComponent);

var _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portlet.component.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortletActionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PortletActionsComponent = (function () {
    function PortletActionsComponent(config, httpService) {
        this.httpService = httpService;
        this.portletUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // customize default values of dropdowns used by this component tree
        config.up = false;
        config.autoClose = true;
    }
    PortletActionsComponent.prototype.ngOnInit = function () {
        this.portletId = this.portlet.portletId;
        //console.log(this.portlet);
    };
    PortletActionsComponent.prototype.deleteCard = function (event, portletID) {
        var _this = this;
        event.preventDefault();
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/portlet/' + portletID + '/delete', this.portletId)
            .subscribe(function (response) {
            _this.portletData = response;
            _this.portletDataArray = _this.portletData.board.portlet;
            _this.portletUpdate.emit(_this.portletDataArray);
        });
    };
    return PortletActionsComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletActionsComponent.prototype, "portlet", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PortletActionsComponent.prototype, "portletUpdate", void 0);
PortletActionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-portlet-actions',
        template: __webpack_require__(557),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object])
], PortletActionsComponent);

var _a, _b;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portletactions.component.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortletAssignedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PortletAssignedComponent = (function () {
    function PortletAssignedComponent() {
    }
    return PortletAssignedComponent;
}());
PortletAssignedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-portlet-assined',
        template: __webpack_require__(558)
    }),
    __metadata("design:paramtypes", [])
], PortletAssignedComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portletassigned.component.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortletCardLabelComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PortletCardLabelComponent = (function () {
    function PortletCardLabelComponent() {
    }
    PortletCardLabelComponent.prototype.ngOnInit = function () {
        this.cardName = this.card.portletCardName;
    };
    return PortletCardLabelComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletCardLabelComponent.prototype, "card", void 0);
PortletCardLabelComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-portlet-card-label',
        template: __webpack_require__(559),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], PortletCardLabelComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portletcardlabel.component.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortletModalComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var URL = '/api/cardImageUpload';
var PortletModalComponent = (function () {
    function PortletModalComponent(modalService, fb, httpService, router, activatedRoute, authService, zone, dropDownConfig) {
        this.modalService = modalService;
        this.fb = fb;
        this.httpService = httpService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authService = authService;
        this.zone = zone;
        this.dropDownConfig = dropDownConfig;
        this.cardUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.socket = __WEBPACK_IMPORTED_MODULE_7_socket_io_client__('http://localhost:8080/');
        this.viewLabel = true;
        this.addDescription = false;
        this.Counter = 0;
        this.hideme = {};
        this.cardDetailsHide = true;
        this.attachmentUrl = 'Please Select a card attachment';
        this.showLoading = true;
        this.cardoptions = {
            url: '/api/cardImageUpload',
            fieldName: 'portletCardsAttachment',
            params: { 'post_id': this.postId } // postID
        };
        this.dropDownConfig.autoClose = false;
        /**
         * CKEditor Configuration
         */
        this.config = {
            toolbar: [
                {
                    name: 'basicstyles',
                    groups: ['basicstyles', 'cleanup'],
                    items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
                },
                {
                    name: 'paragraph',
                    items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
                },
                {
                    name: 'links',
                    items: ['Link', 'Unlink']
                },
                {
                    name: 'editing',
                    groups: ['spellchecker'],
                    items: ['Scayt']
                },
                { name: 'styles', items: ['Styles', 'Format'] },
                { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar', '-', 'Source', 'Preview', '-', 'Templates'] },
                {
                    name: 'tools',
                    items: ['Maximize']
                },
            ]
        };
    }
    PortletModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.userData.subscribe(function (userData) {
            _this.loggedInUserData = userData;
            if (_this.loggedInUserData.facebook) {
                _this.userImage = _this.loggedInUserData.facebook.image;
                _this.userName = _this.loggedInUserData.facebook.email;
                _this.name = _this.loggedInUserData.facebook.name;
            }
            else if (_this.loggedInUserData.google) {
                _this.userImage = _this.loggedInUserData.google.image;
                _this.userName = _this.loggedInUserData.google.email;
                _this.name = _this.loggedInUserData.google.name;
            }
            else {
                _this.userImage = _this.loggedInUserData.local.image;
                _this.userName = _this.loggedInUserData.local.email;
                _this.name = _this.loggedInUserData.local.name;
            }
        });
        if (this.card.portletCardTagLine) {
            this.portletCardTagLineVisible = true;
        }
        this.addDueDateForm = this.fb.group({
            portletCardDueDate: [this.card.portletCardDueDate, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.addCommentForm = this.fb.group({
            portletCardsComments: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            portletCardsCommentsCreator: [this.userName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            portletCardsCommentsCreatorName: [this.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            portletCardsCommentsCreatorImage: [this.userImage, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            portletCardsCommentsCreatedAt: [new Date(), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.editCommentForm = this.fb.group({
            portletCardsComments: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
        var self = this;
        this.socket.on('updateCardModal', function (response) {
            self.cardResponseBoard = response;
            self.cardResponseBoard = self.cardResponseBoard.board.portlet;
            // self.zone.run(() => { // <== added
            //   self.card = self.cardResponseBoard[self.portletIndex].portletCards[self.cardIndex];
            // });
        });
    };
    /**
     * this function will be called when add attachment button will be clicked
     */
    PortletModalComponent.prototype.showFileUpload = function (event) {
        this.attachmentUrl = 'Please Select a card attachment';
    };
    /**
     * increment for adding date into data base not in loading time but after choosing it
     */
    PortletModalComponent.prototype.increment = function () {
        this.Counter = 1;
    };
    /**
     *
     *  * this function is for adding cover image
     * as well as removing cover image by passing '' in cardAttachmentVersion and cardAttachmentId
     * @param portletCardId
     * @param portletCardImageId
     * @param cardAttachmentVersion
     * @param cardAttachmentId
     */
    PortletModalComponent.prototype.addCardCover = function (portletCardId, portletCardImageId, cardAttachmentUrl) {
        var _this = this;
        var data;
        if (cardAttachmentUrl) {
            data = {
                cardAttachmentUrl: cardAttachmentUrl
            };
        }
        else {
            data = {
                cardAttachmentUrl: ''
            };
        }
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cardcover/' + portletCardId + '/' + portletCardImageId, data)
            .subscribe(function (response) {
            console.log(response);
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.zone.run(function () {
                _this.card.portletCardCover = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardCover;
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
            });
            //this.addCardImageForm.reset();
            _this.socket.emit('updateCardModal', response);
        });
    };
    /**
      * this function is for deleting attachment image
     * as well as if attachment image is set as cover image it will make blank;
     * @param portletCardId
     * @param portletCardImageId
     * @param cardAttachmentId
     * @param cardAttachmentFormat
     * @param cardCoverUrl
     */
    PortletModalComponent.prototype.deleteAttachment = function (portletCardId, portletCardImageId, cardAttachmentId, cardCoverUrl, cardAttachmentMimetype) {
        var _this = this;
        var data = {
            cardAttachmentId: cardAttachmentId,
            cardCoverUrl: cardCoverUrl,
            cardAttachmentMimetype: cardAttachmentMimetype
        };
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'delete/attachments/' + portletCardId + '/' + portletCardImageId, data)
            .subscribe(function (response) {
            console.log(response);
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.zone.run(function () {
                _this.card.portletCardsAttachments = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardsAttachments;
                _this.card.portletCardCover = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardCover;
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                _this.showFileUploader = false;
            });
            //this.addCardImageForm.reset();
            _this.socket.emit('updateCardModal', response);
        });
    };
    /**
     * this function will be called when attachments will be uploaded via file input
     * @param data
     * @param portletCardId
     */
    PortletModalComponent.prototype.handleAttachmentUpload = function (data, portletCardId) {
        var id = portletCardId;
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadAttachment = data;
            this.attachmentUrl = this.uploadAttachment.secure_url;
            this.attachmentID = this.uploadAttachment.public_id;
            var imageData = {
                cardAttachmentUrl: this.uploadAttachment.secure_url,
                cardAttachmentId: this.uploadAttachment.public_id,
                cardAttachmentCreated_at: this.uploadAttachment.created_at,
                cardAttachmentOriginalName: '',
                cardAttachmentMimetype: '',
                cardAttachmentSize: this.uploadAttachment.bytes,
                cardAttachmentThumbnail: ''
            };
            var self = this;
            setTimeout(function () {
                self.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardsAttachments', imageData)
                    .subscribe(function (response) {
                    self.cardResponseBoard = response;
                    self.cardResponseBoard = self.cardResponseBoard.board.portlet;
                    self.cardUpdate.emit(self.cardResponseBoard);
                    self.zone.run(function () {
                        self.card.portletCardsAttachments = self.cardResponseBoard[self.portletIndex].portletCards[self.cardIndex].portletCardsAttachments;
                        self.card.portletCardActivity = self.cardResponseBoard[self.portletIndex].portletCards[self.cardIndex].portletCardActivity;
                        self.showFileUploader = false;
                    });
                    //self.addCardImageForm.reset();
                    self.socket.emit('updateCardModal', response);
                });
            }, 100);
            //console.log(this.uploadAttachment);
        }
    };
    /**
     * Modal label Edit function
     */
    PortletModalComponent.prototype.editLabel = function (portletCardName) {
        var _this = this;
        this.viewLabel = false;
        this.portletCardPrevName = portletCardName;
        this.editLabelForm = this.fb.group({
            portletCardName: [this.card.portletCardName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.zone.run(function () {
            _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
        });
    };
    /**
     * Modal label save function
     */
    PortletModalComponent.prototype.hideLabel = function (portletCardId) {
        var _this = this;
        this.viewLabel = true;
        if (this.editLabelForm.valid) {
            this.viewLabel = true;
            var data = this.editLabelForm.value;
            var id = portletCardId;
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardName', data)
                .subscribe(function (response) {
                _this.cardResponseBoard = response;
                _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                _this.cardUpdate.emit(_this.cardResponseBoard);
                _this.zone.run(function () {
                    _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                });
                _this.socket.emit('updateCardModal', response);
            });
        }
        else {
            this.editLabelForm.controls['portletCardName'].setValue(this.portletCardPrevName);
        }
    };
    PortletModalComponent.prototype.addComment = function (portletCardId) {
        var _this = this;
        var data = this.addCommentForm.value;
        var id = portletCardId;
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardsComments', data)
            .subscribe(function (response) {
            console.log(response);
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.zone.run(function () {
                _this.card.portletCardsComments = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardsComments;
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
            });
            _this.addCommentForm.controls['portletCardsComments'].reset();
            _this.socket.emit('updateCardModal', response);
        });
    };
    PortletModalComponent.prototype.openCommentEditForm = function (item, index) {
        //item.hideme = !item.hideme;
        this.card.portletCardsComments.forEach(function (element) {
            element.hideme = false;
        });
        item.hideme = true;
        if (item.hideme) {
            var self_1 = this;
            setTimeout(function () {
                self_1.commentAreaFocus.nativeElement.focus();
            }, 0);
            this.editCommentForm = this.fb.group({
                portletCardsComments: [item.portletCardsComments, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            });
        }
    };
    PortletModalComponent.prototype.editComment = function (commentId, portletCardId) {
        var _this = this;
        var data = this.editCommentForm.value;
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/comments/' + commentId + '/'
            + portletCardId + '/portletCardsComments' + '/edit', data)
            .subscribe(function (response) {
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.zone.run(function () {
                _this.card.portletCardsComments = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardsComments;
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
            });
            _this.socket.emit('updateCardModal', response);
        });
    };
    PortletModalComponent.prototype.deleteComment = function (commentId, portletCardId) {
        var _this = this;
        var data = this.editCommentForm.value;
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/comments/' + commentId + '/'
            + portletCardId + '/portletCardsComments' + '/delete', data)
            .subscribe(function (response) {
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.zone.run(function () {
                _this.card.portletCardsComments = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardsComments;
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
            });
            _this.socket.emit('updateCardModal', response);
        });
    };
    PortletModalComponent.prototype.addTagline = function () {
        this.editAddTagLineVisible = !this.editAddTagLineVisible;
        this.addTagLineForm = this.fb.group({
            portletCardTagLine: [this.card.portletCardTagLine, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    PortletModalComponent.prototype.editDoneTagLine = function (portletCardId) {
        var _this = this;
        var data = this.addTagLineForm.value;
        var id = portletCardId;
        this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardTagLine', data)
            .subscribe(function (response) {
            _this.cardResponseBoard = response;
            _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
            _this.cardUpdate.emit(_this.cardResponseBoard);
            _this.editAddTagLineVisible = false;
            _this.zone.run(function () {
                _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
            });
            _this.socket.emit('updateCardModal', response);
        });
    };
    PortletModalComponent.prototype.onChange = function (portletCardId) {
        var _this = this;
        var id = portletCardId;
        var year;
        var month;
        var day;
        if (this.card.portletCardDueDate) {
            if (typeof (this.card.portletCardDueDate) === 'object' && this.card.portletCardDueDate !== null) {
                year = parseInt(this.card.portletCardDueDate.year, 10);
                month = parseInt(this.card.portletCardDueDate.month, 10) - 1;
                day = parseInt(this.card.portletCardDueDate.day, 10);
                this.date = new Date(year, month, day);
            }
            else {
                var date = this.card.portletCardDueDate;
                this.date = date;
            }
            var data = { 'portletCardDueDate': this.date };
            this.date = new Date(this.date);
            var timeDiff = this.date.getTime() - new Date().getTime();
            this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (this.Counter > 0) {
                this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardDueDate', data)
                    .subscribe(function (response) {
                    console.log(response);
                    _this.cardResponseBoard = response;
                    _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                    _this.cardUpdate.emit(_this.cardResponseBoard);
                    _this.zone.run(function () {
                        _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                    });
                    _this.socket.emit('updateCardModal', response);
                });
            }
            this.Counter++;
        }
    };
    /**
     * CKEditor value get
     */
    PortletModalComponent.prototype.addEditDescriptionValue = function (portletCardId) {
        var _this = this;
        console.log(this.addDescriptionForm.value);
        var data = this.addDescriptionForm.value;
        var id = portletCardId;
        if (this.addDescriptionForm.value.portletCardsDescription) {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/cards/' + id + '/portletCardsDescription', data)
                .subscribe(function (response) {
                _this.cardResponseBoard = response;
                _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                _this.cardUpdate.emit(_this.cardResponseBoard);
                _this.addDescription = false;
                _this.zone.run(function () {
                    _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                });
                _this.socket.emit('updateCardModal', response);
            });
        }
        else {
            this.addDescription = false;
        }
    };
    PortletModalComponent.prototype.addTags = function (portletCardId, item) {
        var _this = this;
        var data = {
            portletCardId: portletCardId,
            itemId: item.id
        };
        var id = portletCardId;
        if (item.selected) {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/tags/' + id + '/portletCardsTags/add', data)
                .subscribe(function (response) {
                _this.cardResponseBoard = response;
                _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                _this.cardUpdate.emit(_this.cardResponseBoard);
                _this.addDescription = false;
                _this.zone.run(function () {
                    _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                });
                _this.socket.emit('updateCardModal', response);
            });
        }
        else {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/tags/' + id + '/portletCardsTags/remove', data)
                .subscribe(function (response) {
                _this.cardResponseBoard = response;
                _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                _this.cardUpdate.emit(_this.cardResponseBoard);
                _this.addDescription = false;
                _this.zone.run(function () {
                    _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                });
                _this.socket.emit('updateCardModal', response);
            });
        }
    };
    PortletModalComponent.prototype.showEditTagForm = function (item) {
        this.board.boardTagLabels.forEach(function (element) {
            element.showEditTagInForm = false;
        });
        item.showEditTagInForm = true;
        this.showEditLabelForm = this.fb.group({
            name: [item.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            id: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    };
    PortletModalComponent.prototype.updateLabelDisplayName = function (item, portletCardId) {
        var _this = this;
        console.log(this.showEditLabelForm.value);
        var data = this.showEditLabelForm.value;
        var id = portletCardId;
        if (this.showEditLabelForm.value !== '' || this.showEditLabelForm.value !== ' ') {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'edit/tags/' + id + '/portletCardsTags/edit', data)
                .subscribe(function (response) {
                _this.cardResponseBoard = response;
                _this.cardResponseBoard = _this.cardResponseBoard.board.portlet;
                _this.cardUpdate.emit(_this.cardResponseBoard);
                _this.addDescription = false;
                _this.zone.run(function () {
                    _this.card.portletCardActivity = _this.cardResponseBoard[_this.portletIndex].portletCards[_this.cardIndex].portletCardActivity;
                });
                _this.socket.emit('updateCardModal', response);
            });
        }
        item.showEditTagInForm = false;
    };
    /**
     * show Hide CKEditor
     */
    PortletModalComponent.prototype.showCKEditor = function () {
        this.addDescription = !this.addDescription;
        this.addDescriptionForm = this.fb.group({
            portletCardsDescription: [this.card.portletCardsDescription]
        });
    };
    return PortletModalComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletModalComponent.prototype, "card", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletModalComponent.prototype, "board", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletModalComponent.prototype, "cardIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PortletModalComponent.prototype, "portletIndex", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], PortletModalComponent.prototype, "cardUpdate", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('commentAreaFocus'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], PortletModalComponent.prototype, "commentAreaFocus", void 0);
PortletModalComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-portlet-modal',
        template: __webpack_require__(560)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["c" /* ActivatedRoute */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__common_services_auth_service__["a" /* AuthService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]) === "function" && _j || Object])
], PortletModalComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portletmodal.component.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_services_store__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TodoApp = (function () {
    function TodoApp(todoStore) {
        this.newTodoText = '';
        this.todoStore = todoStore;
    }
    TodoApp.prototype.stopEditing = function (todo, editedTitle) {
        todo.title = editedTitle;
        todo.editing = false;
    };
    TodoApp.prototype.cancelEditingTodo = function (todo) {
        todo.editing = false;
    };
    TodoApp.prototype.updateEditingTodo = function (todo, editedTitle) {
        editedTitle = editedTitle.trim();
        todo.editing = false;
        if (editedTitle.length === 0) {
            return this.todoStore.remove(todo);
        }
        todo.title = editedTitle;
    };
    TodoApp.prototype.editTodo = function (todo) {
        todo.editing = true;
    };
    TodoApp.prototype.removeCompleted = function () {
        this.todoStore.removeCompleted();
    };
    TodoApp.prototype.toggleCompletion = function (todo) {
        this.todoStore.toggleCompletion(todo);
    };
    TodoApp.prototype.remove = function (todo) {
        this.todoStore.remove(todo);
    };
    TodoApp.prototype.addTodo = function () {
        if (this.newTodoText.trim().length) {
            this.todoStore.add(this.newTodoText);
            this.newTodoText = '';
        }
    };
    return TodoApp;
}());
TodoApp = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-todo-app',
        template: __webpack_require__(561)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_services_store__["a" /* TodoStore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_services_store__["a" /* TodoStore */]) === "function" && _a || Object])
], TodoApp);
/* harmony default export */ __webpack_exports__["a"] = TodoApp;
var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/portlettodo.component.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_underscore__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateBoardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var URL = 'api/imageUpload';
/**
 * @export
 * @class CreateBoardComponent
 * @implements {OnInit}
 */
var CreateBoardComponent = (function () {
    /**
     * Creates an instance of CreateBoardComponent.
     * @param {NgbModal} modalService
     * @param {HttpService} httpService
     * @param {FormBuilder} fb
     * @param {AuthService} authService
     *
     * @memberOf CreateBoardComponent
     */
    function CreateBoardComponent(modalService, httpService, fb, authService, router) {
        this.modalService = modalService;
        this.httpService = httpService;
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.socket = __WEBPACK_IMPORTED_MODULE_7_socket_io_client__('http://localhost:8080/');
        this.fileName = 'Please Select a cover image';
        this.grouped = [];
        this.options = {
            url: '/api/imageUpload',
            fieldName: 'cover',
            params: { 'post_id': this.postId } // postID
        };
    }
    CreateBoardComponent.prototype.ngOnInit = function () {
        this.getAllTeams();
        this.dataSet = this.boardData;
        this.socket.on('connect', function () {
        });
        var self = this;
        this.socket.on('getCardDetails', function (data) {
            self.getAllData();
        });
    };
    CreateBoardComponent.prototype.onSelected = function (value) {
        this.selectedValue = value; // value
    };
    // if image uploaded then response the value
    CreateBoardComponent.prototype.handleUpload = function (data) {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.fileName = this.uploadFile.originalname;
        }
    };
    CreateBoardComponent.prototype.createBoard = function (event, modal) {
        var _this = this;
        var data = this.createBoardForm.value; // accessing form data.
        console.log(data);
        if (this.createBoardForm.value.name) {
            this.httpService.postData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'board', data)
                .subscribe(function (response) {
                _this.boardData = response;
                _this.getAllData(); // for getting all board data;
                _this.dismissModal(modal); // dismissing modal
                _this.showSuccessMessage(); // creating success message
                _this.socket.emit('updateBoard', 'board');
            }, function (err) {
                _this.showErrorMessage(); //show error message
            });
        }
        else {
            return false;
        }
        this.createBoardForm.reset();
    };
    CreateBoardComponent.prototype.manageAllData = function () {
        this.grouped = __WEBPACK_IMPORTED_MODULE_8_underscore__["chain"](this.boardData).groupBy("teamname").map(function (boards, teamName) {
            // Optionally remove product_id from each record
            var cleanBoards = __WEBPACK_IMPORTED_MODULE_8_underscore__["map"](boards, function (it) {
                return __WEBPACK_IMPORTED_MODULE_8_underscore__["omit"](it, "");
            });
            return {
                teamName: teamName,
                boards: cleanBoards
            };
        }).value();
    };
    CreateBoardComponent.prototype.boardUpdate = function (responseFromChild) {
        if (responseFromChild === 'loadAllData') {
            this.getAllData();
            this.socket.emit('updateCard', 'message');
        }
    };
    // for getting all board data
    CreateBoardComponent.prototype.getAllData = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'board')
            .subscribe(function (data) {
            _this.dataSet = data;
            _this.manageAllData();
        });
    };
    // for getting all teams.
    CreateBoardComponent.prototype.getAllTeams = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'team')
            .subscribe(function (data) {
            _this.teamSet = data;
        });
    };
    // show success message
    CreateBoardComponent.prototype.showSuccessMessage = function () {
        this.success = this.boardData.message;
    };
    // show error message;
    CreateBoardComponent.prototype.showErrorMessage = function () {
        this.error = 'Something went wrong, Please try later';
    };
    // dismiss the modal
    CreateBoardComponent.prototype.dismissModal = function (modal) {
        this.router.navigate(['/chore/c/' + this.boardData.board.boardId + '/' + this.boardData.board.name.replace(/ /g, "_")]);
        setTimeout(function () {
            modal('Cross click');
        }, 1500);
    };
    // functions after modal open
    CreateBoardComponent.prototype.open = function (content) {
        var _this = this;
        this.success = undefined; // success set to initial state
        this.error = undefined; // error set to initial state
        this.getAllTeams(); // get all teams
        this.authService.userData.subscribe(function (userData) {
            _this.loggedInUserData = userData;
            if (_this.loggedInUserData) {
                _this.isLoggedIn = true;
                if (_this.loggedInUserData.facebook) {
                    _this.loggedInUserEmail = _this.loggedInUserData.facebook.email;
                    _this.loggedInUserName = _this.loggedInUserData.facebook.name;
                }
                else if (_this.loggedInUserData.google) {
                    _this.loggedInUserEmail = _this.loggedInUserData.google.email;
                    _this.loggedInUserName = _this.loggedInUserData.google.name;
                }
                else {
                    _this.loggedInUserEmail = _this.loggedInUserData.local.email;
                    _this.loggedInUserName = _this.loggedInUserData.local.name;
                }
                // create the form group new instance
                _this.createBoardForm = _this.fb.group({
                    name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    createdby: [_this.loggedInUserEmail, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    createdByName: [_this.loggedInUserName, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    isclosed: [''],
                    isarchived: [''],
                    teamname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    boardimage: ['']
                });
            }
        });
        // open modal service
        this.modalService.open(content);
    };
    return CreateBoardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CreateBoardComponent.prototype, "boardData", void 0);
CreateBoardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-create-board',
        template: __webpack_require__(562),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__["a" /* AuthService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* Router */]) === "function" && _e || Object])
], CreateBoardComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/create.component.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEditBoardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CreateEditBoardComponent = (function () {
    function CreateEditBoardComponent(httpService, router, authService) {
        this.httpService = httpService;
        this.router = router;
        this.authService = authService;
        this.socket = __WEBPACK_IMPORTED_MODULE_6_socket_io_client__('http://localhost:8080/');
        this.grouped = [];
    }
    CreateEditBoardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.userData.subscribe(function (userData) {
            _this.currentUserData = userData;
        });
        this.getAllData();
        var self = this;
        this.socket.on('getBoard', function (data) {
            self.getAllData();
        });
    };
    CreateEditBoardComponent.prototype.getAllData = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'board')
            .subscribe(function (data) {
            _this.boardData = data;
            _this.manageAllData();
        });
    };
    CreateEditBoardComponent.prototype.manageAllData = function () {
        this.grouped = __WEBPACK_IMPORTED_MODULE_2_underscore__["chain"](this.boardData).groupBy("teamname").map(function (boards, teamName) {
            // Optionally remove product_id from each record
            var cleanBoards = __WEBPACK_IMPORTED_MODULE_2_underscore__["map"](boards, function (it) {
                return __WEBPACK_IMPORTED_MODULE_2_underscore__["omit"](it, "");
            });
            return {
                teamName: teamName,
                boards: cleanBoards
            };
        }).value();
        //console.log(this.grouped);
    };
    return CreateEditBoardComponent;
}());
CreateEditBoardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'create-edit-board',
        template: __webpack_require__(563),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_services_auth_service__["a" /* AuthService */]) === "function" && _c || Object])
], CreateEditBoardComponent);

var _a, _b, _c;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/create_edit_board.component.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListBoardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ListBoardComponent = (function () {
    /**
     * =============================================
     * Form builder
     * =============================================
     */
    function ListBoardComponent(modalService, httpService, fb, router) {
        this.modalService = modalService;
        this.httpService = httpService;
        this.fb = fb;
        this.router = router;
        this.socket = __WEBPACK_IMPORTED_MODULE_6_socket_io_client__('http://localhost:8080/');
        this.imageUploadDisplay = false;
        this.imageDisplay = true;
        this.options = {
            url: '/api/imageUpload',
            fieldName: 'cover',
            params: { 'post_id': this.postId } // postID
        };
        this.boardUpdate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     * =============================================
     *On ngOnInit method the api/board is called with get method
     *and the data passed to the SharedDataService.
     * =============================================
     */
    ListBoardComponent.prototype.ngOnInit = function () {
        this.getAllTeams();
        this.imageDisplay = true;
        this.imageUploadDisplay = false;
        this.deleteBoard = this.fb.group({
            deleteBoardName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
    };
    ListBoardComponent.prototype.onSelected = function (value) {
        //console.log(value);
        this.selectedValue = value;
    };
    // if image uploaded then response the value
    ListBoardComponent.prototype.handleUpload = function (data) {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.fileName = this.uploadFile.originalname;
            //console.log(this.uploadFile);
        }
    };
    /**
     * =============================================
     *On updateBoard method will update the board from the modal form
     * which will update the single data whose id matched with the board
     * =============================================
     */
    ListBoardComponent.prototype.updateBoard = function (event, modal) {
        var _this = this;
        var data = this.updateBoardForm.value; // accessing form data.
        if (data.name) {
            this.httpService.editData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'board/' + data.id, data)
                .subscribe(function (data) {
                _this.boardDisplayData = data;
                _this.dismissModal(modal); // dismissing modal
                _this.showSuccessMessage(); // creating success message
                ////console.log(this.boardDisplayData);
            }, function (err) {
                _this.showErrorMessage(); //show error message
                //console.log(err)
            });
        }
        else {
            return false;
        }
    };
    ListBoardComponent.prototype.deleteImage = function (event, boardID, coverImageID, boardData) {
        var _this = this;
        event.preventDefault();
        boardData.coverImageUrl = '';
        boardData.coverImageID = '';
        this.BoardUID = boardID;
        this.httpService.deleteImage(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'deleteImage/' + boardID + '/' + coverImageID, boardData)
            .subscribe(function (response) {
            _this.boardDisplayData = response;
            if (_this.boardDisplayData.message === 'Successfully updated the board') {
                _this.imageDisplay = false; // for removing the image section
                _this.imageUploadDisplay = true; // for displaying the image upload panel;
            }
        });
    };
    ListBoardComponent.prototype.getAllTeams = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'team')
            .subscribe(function (data) {
            _this.teamSet = data;
            //console.log(this.teamSet);
        });
    };
    /**
     * show success message on board creation success
     */
    ListBoardComponent.prototype.showSuccessMessage = function () {
        this.success = this.boardDisplayData.message;
        //console.log(this.success);
    };
    /**
     * show error message on board creation error
     */
    ListBoardComponent.prototype.showErrorMessage = function () {
        this.error = 'Something went wrong, Please try later';
    };
    /**
     * dismiss or close the modal which consist of the update board form
     */
    ListBoardComponent.prototype.dismissModal = function (modal) {
        this.router.navigate(['/chore/c/' + this.boardDisplayData.board.boardId + '/' + this.boardDisplayData.board.name.replace(/ /g, "_")]);
        setTimeout(function () {
            modal('Cross click');
        }, 1500);
    };
    ListBoardComponent.prototype.getPrevValue = function (name) {
        this.name = name;
    };
    ListBoardComponent.prototype.nameUpdate = function (name) {
        if (name === '' || name === ' ') {
            this.updateBoardForm.controls['name'].setValue(this.name);
        }
    };
    ListBoardComponent.prototype.confirmBoardName = function (boardName) {
        this.deleteName = boardName.toLowerCase();
    };
    ListBoardComponent.prototype.delBoard = function (_id) {
        var _this = this;
        if ((this.deleteBoard.controls['deleteBoardName'].value).toLowerCase() === this.deleteName) {
            this.httpService.deleteData(__WEBPACK_IMPORTED_MODULE_4__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'board/' + _id)
                .subscribe(function (response) {
                //emit data
                _this.boardUpdate.emit('loadAllData');
            });
        }
    };
    ListBoardComponent.prototype.navigateToBoard = function (id, name) {
        //console.log(id, name);
        this.router.navigate(['/chore/c/' + id + '/' + name.replace(/ /g, "_")]);
    };
    /**
     * open modal method to open the board edit modal
     */
    ListBoardComponent.prototype.open = function (event, content) {
        event.stopPropagation();
        this.success = undefined;
        this.error = undefined;
        this.updateBoardForm = this.fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            id: [''],
            teamname: [],
            coverImageUrl: [''],
            boardId: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        this.modalService.open(content);
    };
    return ListBoardComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ListBoardComponent.prototype, "displayData", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ListBoardComponent.prototype, "boardUpdate", void 0);
ListBoardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-list-board',
        template: __webpack_require__(564),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    })
    /**
     * =============================================
     * List all created board data after creation and
     * which are already created in past.
     * Used a shared service "SharedDataService" to update the list
     * of boards
     * =============================================
     */
    ,
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === "function" && _d || Object])
], ListBoardComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/listboard.component.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_services_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTeamComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CreateTeamComponent = (function () {
    function CreateTeamComponent(modalService, httpService, fb, authService) {
        this.modalService = modalService;
        this.httpService = httpService;
        this.fb = fb;
        this.authService = authService;
    }
    CreateTeamComponent.prototype.ngOnInit = function () {
        this.getAllData();
    };
    CreateTeamComponent.prototype.createTeam = function (event, modal) {
        var _this = this;
        var data = this.createTeamForm.value; // accessing form data.
        if (this.createTeamForm.value.name) {
            this.httpService.postData(__WEBPACK_IMPORTED_MODULE_5__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'team', data)
                .subscribe(function (data) {
                _this.teamData = data;
                _this.dismissModal(modal); // dismissing modal
                _this.showSuccessMessage(); // creating success message
                _this.getAllData(); // to get all data;
            }, function (err) {
                _this.showErrorMessage(); //show error message
                //console.log(err);
            });
        }
        else {
            return false;
        }
        this.createTeamForm.reset();
    };
    CreateTeamComponent.prototype.getAllData = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_5__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'team')
            .subscribe(function (data) {
            _this.teamDataSet = data;
        });
    };
    CreateTeamComponent.prototype.showSuccessMessage = function () {
        this.success = this.teamData.message;
    };
    CreateTeamComponent.prototype.showErrorMessage = function () {
        this.error = 'Something went wrong, Please try later';
    };
    CreateTeamComponent.prototype.dismissModal = function (modal) {
        setTimeout(function () {
            modal('Cross click');
        }, 1500);
    };
    CreateTeamComponent.prototype.open = function (content) {
        var _this = this;
        this.success = undefined;
        this.error = undefined;
        this.authService.userData.subscribe(function (userData) {
            _this.loggedInUserData = userData;
            if (_this.loggedInUserData) {
                _this.isLoggedIn = true;
                if (_this.loggedInUserData.facebook) {
                    _this.loggedInUserEmail = _this.loggedInUserData.facebook.email;
                }
                else if (_this.loggedInUserData.google) {
                    _this.loggedInUserEmail = _this.loggedInUserData.google.email;
                }
                else {
                    _this.loggedInUserEmail = _this.loggedInUserData.local.email;
                }
                _this.createTeamForm = _this.fb.group({
                    name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    createdby: [_this.loggedInUserEmail, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                    members: ['']
                });
            }
        });
        this.modalService.open(content);
    };
    return CreateTeamComponent;
}());
CreateTeamComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-create-team',
        template: __webpack_require__(565),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["b" /* NgbModal */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__common_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_services_auth_service__["a" /* AuthService */]) === "function" && _d || Object])
], CreateTeamComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/createteam.component.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamListComponent = (function () {
    function TeamListComponent(httpService) {
        this.httpService = httpService;
    }
    TeamListComponent.prototype.ngOnInit = function () {
        this.getAllData();
    };
    TeamListComponent.prototype.getAllData = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_2__common_constant_constant__["a" /* Constant */].API_ENDPOINT + 'team')
            .subscribe(function (data) {
            _this.teamlist = data;
        });
    };
    return TeamListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TeamListComponent.prototype, "teamlist", void 0);
TeamListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-team-list',
        template: __webpack_require__(566),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__common_services_http_service__["a" /* HttpService */]) === "function" && _a || Object])
], TeamListComponent);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/teamlist.component.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectComponent = (function () {
    function ProjectComponent() {
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__('http://localhost:8080/');
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var self = this;
        this.socket.on('updateCardModal', function (response) {
            self.board = response.board;
        });
    };
    return ProjectComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ProjectComponent.prototype, "board", void 0);
ProjectComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-project',
        template: __webpack_require__(567),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __metadata("design:paramtypes", [])
], ProjectComponent);

//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/project.component.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Team; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Team = (function () {
    function Team(config) {
        // customize default values of dropdowns used by this component tree
        config.up = false;
        config.autoClose = true;
    }
    return Team;
}());
Team = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-team',
        template: __webpack_require__(568),
        providers: [__WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]] // add NgbDropdownConfig to the component providers
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_bootstrap_ng_bootstrap__["c" /* NgbDropdownConfig */]) === "function" && _a || Object])
], Team);

var _a;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/team.component.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_constant_constant__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(30);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupComponent = (function () {
    function SignupComponent(fb, httpService, router) {
        this.fb = fb;
        this.httpService = httpService;
        this.router = router;
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
        this.specialCharRegex = /^(?=[a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -]*$)(?!.*[<>'"/;`%])/;
        this.succesMessage = false;
        this.errorMessage = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signUpForm = this.fb.group({
            firstName: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(20),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(3),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(this.specialCharRegex)
                ]],
            lastName: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(20),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(3),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(this.specialCharRegex)
                ]],
            user: this.fb.group({
                email: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(3),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(this.emailRegex)]],
                password: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(8),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(20),
                        __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(this.passwordRegex)
                    ]]
            })
        });
    };
    SignupComponent.prototype.signup = function (value, isValid) {
        var _this = this;
        this.submitted = true; // set form submit to true
        this.httpService.postData(__WEBPACK_IMPORTED_MODULE_3__common_constant_constant__["a" /* Constant */].ROUTE_ENDPOINT + 'auth/user', this.signUpForm.value)
            .subscribe(function (data) {
            _this.userSignupdata = data;
            if (_this.userSignupdata.message === 'Successfully added user') {
                _this.succesMessage = true;
                _this.errorMessage = false;
                var self_1 = _this;
                setTimeout(function () {
                    self_1.router.navigate(['login']);
                }, 1000);
            }
            else {
                //console.log('problem in signup')
                _this.errorMessage = true;
            }
        }, function (err) {
            //console.log(err)
            _this.errorMessage = true;
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'chore-signup',
        template: __webpack_require__(569)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_services_http_service__["a" /* HttpService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _c || Object])
], SignupComponent);

var _a, _b, _c;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/signup.component.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/environment.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_http_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constant_constant__ = __webpack_require__(28);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Behavior Subject is a type of subject,
 * a subject is a special type of observable so
 * you can subscribe to messages like any other observable.
 * ==========================================================
 * public userData: Subject<string> = new BehaviorSubject<string>(null);
 * it is initially null.
 * ==========================================================
 * but in http subscribe this.userData.next(this.currentUserData);
 * assigning the updated value to its next function. so it will be
 * available which service will subscribe it.
 * ===========================================================
 * in this case isLoggedInServie
 */
var AuthService = (function () {
    function AuthService(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.userData = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["BehaviorSubject"](null);
        this.isAuthenticated();
    }
    AuthService.prototype.isAuthenticated = function () {
        var _this = this;
        this.httpService.getData(__WEBPACK_IMPORTED_MODULE_4__constant_constant__["a" /* Constant */].ROUTE_ENDPOINT + 'userData')
            .subscribe(function (data) {
            _this.currentUserData = data;
            if (_this.currentUserData) {
                _this.userData.next(_this.currentUserData);
            }
            else {
                _this.router.navigate(['login']);
            }
        }, function (err) {
            console.error(err);
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_http_service__["a" /* HttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_http_service__["a" /* HttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=/Volumes/Entertainment/work/Chore/Chore/src/auth.service.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 544:
/***/ (function(module, exports) {

module.exports = "<!--<chore-main></chore-main>-->\n<ng2-slim-loading-bar [color]=\"'#009688'\" [height]=\"'4px'\"></ng2-slim-loading-bar>\n<router-outlet></router-outlet>\n<ng-template ngbModalContainer></ng-template>"

/***/ }),

/***/ 545:
/***/ (function(module, exports) {

module.exports = "<ng-select [allowClear]=\"true\" [items]=\"items\" [disabled]=\"disabled\" (data)=\"refreshValue($event)\" (selected)=\"selected($event)\" (removed)=\"removed($event)\" (typed)=\"typed($event)\" placeholder=\"Please select a team\">\n</ng-select>"

/***/ }),

/***/ 546:
/***/ (function(module, exports) {

module.exports = "<div class=\"posRel inlineBlock v-m\">\n    <button type=\"button\" ngbDropdown class=\"btn btn-board margin-right-10 pull-right\" ngbDropdownToggle> <i class=\"ion-plus fa fa-lg\" aria-hidden=\"true\"></i></button>\n    <div class=\"pop-over dropdown-menu\" style=\"right:0px;left:auto; top: 40px;\">\n        <div data-reactroot=\"\">\n            <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Add Actions</span>\n            </div>\n            <div>\n                <div class=\"popover-content\">\n                    <div>\n                        <div>\n                            <ul class=\"pop-over-list\">\n                                <li><a class=\"\" href=\"#\"><i class=\"fa fa-server\" aria-hidden=\"true\"></i> Add Board</a></li>\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-person-add\" aria-hidden=\"true\"></i> Add Own Team</a></li>\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-person-stalker\" aria-hidden=\"true\"></i> Add Business Team</a></li>\n                            </ul>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

module.exports = "<div class=\"posRel inlineBlock v-m\">\n    <button type=\"button\" ngbDropdown class=\"btn btn-board\" ngbDropdownToggle #boardDrop=\"ngbDropdown\"><i class=\"fa fa-tasks fa-rotate-90\" aria-hidden=\"true\"></i> Boards</button>\n    <div class=\"pop-over dropdown-menu\" style=\"left:0; top: 40px;\">\n        <div data-reactroot=\"\">\n            <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Board Actions</span>\n                <a href=\"#\" class=\"pop-over-header-close-btn icon-sm ion-close\" (click)=\"$event.preventDefault(); boardDrop.close();\"></a>\n            </div>\n            <div>\n                <div class=\"popover-content\">\n                    <div>\n                        <div>\n                            <ul class=\"pop-over-list\">\n                                <li><a class=\"\" href=\"#\">Create Board</a></li>\n                                <li><a class=\"\" href=\"#\">View All Boards</a></li>\n                                <li><a class=\"\" href=\"#\">See Recent Boards</a></li>\n                                <li><a class=\"\" href=\"#\">See Close Boards</a></li>\n                            </ul>\n\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 548:
/***/ (function(module, exports) {

module.exports = "<header class=\"choreHeader\" *ngIf=\"isLoggedIn\">\n    <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\">\n        <chore-board-dropdown></chore-board-dropdown>\n        <form class=\"searchChore inlineBlock v-m\">\n            <input class=\"form-control input-sm\" placeholder=\"Search\"> <span class=\"fa fa-search fa-rotate-90\"></span>\n        </form>\n    </div>\n    <div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\">\n        <div class=\"text-center logo\">\n            <a routerLink=\"/\"> <i class=\"fa fa-modx fa-rotate-180\" aria-hidden=\"true\"></i> Chore</a>\n        </div>\n    </div>\n    <div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 text-right\">\n        <chore-project-name></chore-project-name>\n        <chore-add-board-team></chore-add-board-team>\n        <chore-notification></chore-notification>\n        <chore-profile [user]=\"loggedInUserData\"></chore-profile>\n\n    </div>\n    <div class=\"clearfix\"></div>\n</header>"

/***/ }),

/***/ 549:
/***/ (function(module, exports) {

module.exports = "<div class=\"posRel inlineBlock v-m\">\n    <button type=\"button\" ngbDropdown class=\"btn btn-board margin-right-10 pull-right\" ngbDropdownToggle> <i class=\"fa ion-android-notifications fa-lg\" aria-hidden=\"true\"></i></button>\n    <div class=\"pop-over dropdown-menu\" style=\"right:0px;left:auto; top: 40px;\">\n        <div data-reactroot=\"\">\n            <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Chore Notifications</span>\n            </div>\n            <div>\n                <div class=\"popover-content\">\n                    <div>\n                        <div>\n                            <div class=\"phenom-desc\"><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> <a href=\"#\" class=\"action-card\">bnhgg</a><span> on </span><a href=\"#\">Tutorial Board (Start Here!)</a><span> </span><span class=\"rel-date\">was due Feb 22 at 12:00 PM</span></div>\n                            <div class=\"phenom-desc\"><i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i> <a href=\"#\" class=\"action-card\">bnhgg</a><span> on </span><a href=\"#\">Tutorial Board (Start Here!)</a><span> </span><span class=\"rel-date\">was due Feb 22 at 12:00 PM</span></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 550:
/***/ (function(module, exports) {

module.exports = "<div class=\"posRel inlineBlock v-m\">\n    <button type=\"button\" ngbDropdown class=\"btn btn-board margin-right-10 pull-right\" ngbDropdownToggle *ngIf=\"user\"> <img src=\"{{userImage}}\" class=\"profileImage\">{{userName}}</button>\n    <div class=\"pop-over dropdown-menu\" style=\"right:0px;left:auto; top: 40px;\">\n        <div>\n            <div>\n                <div class=\"popover-content\">\n                    <div>\n                        <div>\n                            <ul class=\"pop-over-list\">\n                                <li><a class=\"\" routerLink=\"/profile\"><i class=\"fa ion-person\" aria-hidden=\"true\"></i> {{userName}}  's Profile</a></li>\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-ios-browsers\" aria-hidden=\"true\"></i> Cards</a></li>\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-ios-cog\" aria-hidden=\"true\"></i> Settings</a></li>\n                            </ul>\n                            <hr>\n                            <ul class=\"pop-over-list\">\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-ios-help\" aria-hidden=\"true\"></i> Help</a></li>\n                                <li><a class=\"\" href=\"#\"><i class=\"fa ion-android-exit\" aria-hidden=\"true\"></i> Logout</a></li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

module.exports = "<chore-header></chore-header>\n<div class=\"container-fluid profileContainer\">\n    <div class=\"row\">\n        <div class=\"col-sm-12\">\n            <div class=\"card-box\">\n                <div class=\"row\">\n                    <div class=\"col-lg-3 col-md-4\">\n                        <div class=\"text-center card-box\">\n                            <div class=\"member-card\">\n                                <div class=\"thumb-xl member-thumb m-b-10 center-block\">\n                                    <img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle img-thumbnail\" alt=\"profile-image\">\n                                    <i class=\"mdi mdi-star-circle member-star text-success\" title=\"verified user\"></i>\n                                </div>\n\n                                <div class=\"\">\n                                    <h4 class=\"m-b-5\">Mark A. McKnight</h4>\n                                    <p class=\"text-muted\">@webdesigner</p>\n                                </div>\n\n                                <button type=\"button\" class=\"btn btn-success btn-sm w-sm waves-effect m-t-10 waves-light\">Follow</button>\n                                <button type=\"button\" class=\"btn btn-danger btn-sm w-sm waves-effect m-t-10 waves-light\">Message</button>\n\n                                <p class=\"text-muted font-13 m-t-20\">\n                                    Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.\n                                </p>\n\n                                <hr>\n\n                                <div class=\"text-left\">\n                                    <p class=\"text-muted font-13\"><strong>Full Name :</strong> <span class=\"m-l-15\">Johnathan Deo</span></p>\n\n                                    <p class=\"text-muted font-13\"><strong>Mobile :</strong><span class=\"m-l-15\">(123) 123 1234</span></p>\n\n                                    <p class=\"text-muted font-13\"><strong>Email :</strong> <span class=\"m-l-15\">coderthemes@gmail.com</span></p>\n\n                                    <p class=\"text-muted font-13\"><strong>Location :</strong> <span class=\"m-l-15\">USA</span></p>\n                                </div>\n\n                                <ul class=\"social-links list-inline m-t-30\">\n                                    <li>\n                                        <a title=\"\" data-placement=\"top\" data-toggle=\"tooltip\" class=\"tooltips\" href=\"\" data-original-title=\"Facebook\"><i class=\"fa fa-facebook\"></i></a>\n                                    </li>\n                                    <li>\n                                        <a title=\"\" data-placement=\"top\" data-toggle=\"tooltip\" class=\"tooltips\" href=\"\" data-original-title=\"Twitter\"><i class=\"fa fa-twitter\"></i></a>\n                                    </li>\n                                    <li>\n                                        <a title=\"\" data-placement=\"top\" data-toggle=\"tooltip\" class=\"tooltips\" href=\"\" data-original-title=\"Skype\"><i class=\"fa fa-skype\"></i></a>\n                                    </li>\n                                </ul>\n\n                            </div>\n\n                        </div>\n                        <!-- end card-box -->\n\n                    </div>\n                    <!-- end col -->\n\n                    <div class=\"col-md-8 col-lg-9\">\n\n\n                        <!-- end row -->\n\n\n\n                        <div class=\"row\">\n                            <div class=\"col-md-8 col-sm-6\">\n                                <h4>Experience</h4>\n\n                                <div class=\" p-t-10\">\n                                    <h5 class=\"text-custom m-b-5\">Lead designer / Developer</h5>\n                                    <p class=\"m-b-0\">websitename.com</p>\n                                    <p><b>2010-2015</b></p>\n\n                                    <p class=\"text-muted font-13 m-b-0\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it\n                                        to make a type specimen book.\n                                    </p>\n                                </div>\n\n                                <hr>\n\n                                <div class=\"\">\n                                    <h5 class=\"text-custom m-b-5\">Senior Graphic Designer</h5>\n                                    <p class=\"m-b-0\">coderthemes.com</p>\n                                    <p><b>2007-2009</b></p>\n\n                                    <p class=\"text-muted font-13\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it\n                                        to make a type specimen book.\n                                    </p>\n                                </div>\n                            </div>\n                            <!-- end col -->\n\n                            <div class=\"col-md-4 col-sm-6\">\n                                <h4>Friends</h4>\n\n                                <div class=\"inbox-widget\">\n                                    <a href=\"#\">\n                                        <div class=\"inbox-item\">\n                                            <div class=\"inbox-item-img\"><img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle\" alt=\"\"></div>\n                                            <p class=\"inbox-item-author\">Tomaslau</p>\n                                            <p class=\"inbox-item-text\">I've finished it! See you so...</p>\n                                            <p class=\"inbox-item-date\">\n                                                <button type=\"button\" class=\"btn btn-xs btn-success\">Follow</button>\n                                            </p>\n                                        </div>\n                                    </a>\n                                    <a href=\"#\">\n                                        <div class=\"inbox-item\">\n                                            <div class=\"inbox-item-img\"><img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle\" alt=\"\"></div>\n                                            <p class=\"inbox-item-author\">Stillnotdavid</p>\n                                            <p class=\"inbox-item-text\">This theme is awesome!</p>\n                                            <p class=\"inbox-item-date\">\n                                                <button type=\"button\" class=\"btn btn-xs btn-danger\">Unfollow</button>\n                                            </p>\n                                        </div>\n                                    </a>\n                                    <a href=\"#\">\n                                        <div class=\"inbox-item\">\n                                            <div class=\"inbox-item-img\"><img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle\" alt=\"\"></div>\n                                            <p class=\"inbox-item-author\">Kurafire</p>\n                                            <p class=\"inbox-item-text\">Nice to meet you</p>\n                                            <p class=\"inbox-item-date\">\n                                                <button type=\"button\" class=\"btn btn-xs btn-success\">Follow</button>\n                                            </p>\n                                        </div>\n                                    </a>\n                                    <a href=\"#\">\n                                        <div class=\"inbox-item\">\n                                            <div class=\"inbox-item-img\"><img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle\" alt=\"\"></div>\n                                            <p class=\"inbox-item-author\">Shahedk</p>\n                                            <p class=\"inbox-item-text\">Hey! there I'm available...</p>\n                                            <p class=\"inbox-item-date\">\n                                                <button type=\"button\" class=\"btn btn-xs btn-success\">Follow</button>\n                                            </p>\n                                        </div>\n                                    </a>\n                                    <a href=\"#\">\n                                        <div class=\"inbox-item\">\n                                            <div class=\"inbox-item-img\"><img src=\"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16427572_1339439569452765_4003363028319416925_n.jpg?oh=279b7d9a9fc7c53c354fc801c4e697c3&oe=59671A09\" class=\"img-circle\" alt=\"\"></div>\n                                            <p class=\"inbox-item-author\">Adhamdannaway</p>\n                                            <p class=\"inbox-item-text\">This theme is awesome!</p>\n                                            <p class=\"inbox-item-date\">\n                                                <button type=\"button\" class=\"btn btn-xs btn-success\">Follow</button>\n                                            </p>\n                                        </div>\n                                    </a>\n                                </div>\n\n                            </div>\n                            <!-- end col -->\n                        </div>\n                        <!-- end row -->\n\n\n\n\n                    </div>\n                    <!-- end col -->\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

module.exports = "<div class=\"posRel inlineBlock v-m\">\n    <button type=\"button\" class=\"btn btn-board margin-right-0 pull-right\" ngbDropdownToggle ngbDropdown #projectRenameDrop=\"ngbDropdown\"><span class=\"ion-ios-color-filter\"></span> Project Name</button>\n    <div class=\"pop-over dropdown-menu\" style=\"right:0px;left:auto; top: 40px;\">\n        <div data-reactroot=\"\">\n            <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Project Rename</span>\n                <a href=\"#\" class=\"pop-over-header-close-btn icon-sm ion-close\" (click)=\"$event.preventDefault(); projectRenameDrop.close();\"></a>\n            </div>\n            <div>\n                <div class=\"popover-content\">\n                    <div>\n                        <div>\n                            <form>\n                                <div class=\"form-group\">\n                                    <label class=\"control-label\" for=\"Name\">Name of your project</label>\n                                    <input id=\"Name\" name=\"Name\" type=\"text\" placeholder=\"Name of your project\" class=\"form-control input-md textboxchange\">\n                                    <span class=\"help-block\">rename your project name</span>\n                                    <input class=\"btn btn-success\" type=\"submit\" value=\"Rename\">\n                                </div>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 553:
/***/ (function(module, exports) {

module.exports = "<div class=\"app app-fh app-loaded\">\n    <!-- START APP CONTAINER -->\n    <div class=\"app-container\" style=\"background: url(assets/images/bg-1.jpg) center center no-repeat fixed\">\n        <div class=\"app-login-box\">\n            <div class=\"app-login-box-user\"><img src=\"assets/images/no-image.png\"></div>\n            <div class=\"app-login-box-title\">\n                <div class=\"title\">Already a member?</div>\n                <div class=\"subtitle\">Sign in to your account</div>\n            </div>\n            <div class=\"app-login-box-container\">\n\n                <div class=\"alert alert-success\" *ngIf=\"loginSuccessMessage\">\n                    <i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i> You have successfully logged in.\n                </div>\n                <div class=\"alert alert-danger\" *ngIf=\"loginUserErrorMessage\">\n                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> You are not a registered user.\n                </div>\n                <div class=\"alert alert-danger\" *ngIf=\"loginPasswordErrorMessage\">\n                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Please provide valid password\n                </div>\n\n                <form [formGroup]=\"logInForm\" novalidate (ngSubmit)=\"login(logInForm.value, logInForm.valid)\">\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" name=\"login\" placeholder=\"Email Address\" formControlName=\"email\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 \">\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"logInForm.controls['email'].hasError('required') && logInForm.controls['email'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Email must be filled in\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <input type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\" formControlName=\"password\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 \">\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"logInForm.controls['password'].hasError('required') && logInForm.controls['password'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Password must be filled in\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6 col-xs-6\">\n                                <div class=\"app-checkbox\"><label><input type=\"checkbox\" name=\"app-checkbox-1\" value=\"0\"> Remember me<span></span></label></div>\n\n                            </div>\n                            <div class=\"col-md-6 col-xs-6\"><button class=\"btn btn-teal btn-block\" [disabled]=\"!logInForm.valid \">Sign In</button></div>\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12 margin-top-10\">\n                                <a routerLink=\"/signup\"> <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Not a user? Register with us.</a>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <!--<div class=\"app-login-box-or\">\n                <div class=\"or\">OR</div>\n            </div>-->\n            <div class=\"app-login-box-container\">\n                <a class=\"btn btn-block btn-social btn-facebook\" href=\"/auth/facebook\">\n                    <span class=\"fa fa-facebook\"></span> Sign in with Facebook\n                </a>\n                <a class=\"btn btn-block btn-social btn-google\" href=\"/auth/google\">\n                    <span class=\"fa fa-google\"></span> Sign in with Google\n                </a>\n            </div>\n            <div class=\"app-login-box-footer\">© Chore 2017. All rights reserved.</div>\n            <div class=\"clearfix\"></div>\n        </div>\n    </div>\n    <!-- END APP CONTAINER -->\n</div>"

/***/ }),

/***/ 554:
/***/ (function(module, exports) {

module.exports = "<chore-header></chore-header>\n<div class=\"clearfix\">\n</div>\n<div id=\"surface\">\n    <main class=\"mainBoard\">\n        <div class=\"board-wrapper\" [style.background]=\"'url('+boardCoverImage+')'\" [ngClass]=\"{'haveBg bgCover': boardCoverImage}\" data-adaptive-background=\"1\">\n            <div class=\"board-main-content\">\n                <chore-project [board]=\"boardData\"></chore-project>\n            </div>\n\n        </div>\n\n    </main>\n</div>"

/***/ }),

/***/ 555:
/***/ (function(module, exports) {

module.exports = "<div class=\"boardStage\">\n    <chore-portlet [board]=\"board\"></chore-portlet>\n    <div class=\"clearfix\"></div>\n</div>"

/***/ }),

/***/ 556:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-3\" *ngFor=\"let item of portletDataArray; let portletIndex = index\">\n\n    <div class=\"portlet\">\n        <div class=\"portlet-heading bg-teal\">\n            <h3 class=\"portlet-title\" (click)=\"showNameForm(item.portletName)\" *ngIf=\"!viewName\">\n                {{item.portletName}}\n            </h3>\n            <div class=\"pull-left nameForm\" *ngIf=\"viewName\">\n                <form [formGroup]=\"changeCardName\">\n                    <input type=\"text\" class=\"form-control input-sm\" formControlName=\"cardName\" [(ngModel)]=\"item.portletName\" focus=\"true\" autofocus (blur)=\"hideNameForm(item.portletId)\">\n                </form>\n            </div>\n            <div class=\"portlet-widgets\">\n                <chore-portlet-actions [portlet]=\"item\" (portletUpdate)=\"portletUpdate($event)\"></chore-portlet-actions>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"list-cards\" [dragula]='\"first-bag\"' [attr.data-portlet-id]=\"item.portletId\">\n            <div class=\"portletAddIns\" *ngIf=\"item.portletCards.length <= 0\">\n                Please Add a card\n            </div>\n            <div class=\"portlet-body\" (click)=\"openModal(content)\" *ngFor=\"let card of item.portletCards; let cardIndex = index\" [attr.data-card-id]=\"card.portletCardId\" [attr.data-portlet-id]=\"item.portletId\">\n                <chore-portlet-card-label [card]=\"card\"></chore-portlet-card-label>\n                <div class=\"js-badges\">\n                    <div class=\"faicons\" title=\"This card has a description.\" *ngIf=\"card.portletCardsDescription\"><span class=\"badge-icon fa fa-align-left\"></span></div>\n                    <div class=\"faicons\" title=\"Attachments\" *ngIf=\"card.portletCardsAttachments.length > 0\"><span class=\"badge-icon fa fa-paperclip\"></span><span class=\"badge-text\"> {{card.portletCardsAttachments.length}}</span></div>\n                    <div class=\"faicons\" title=\"comments\" *ngIf=\"card.portletCardsComments.length > 0\"><span class=\"badge-icon fa fa-comment\"></span><span class=\"badge-text\"> {{card.portletCardsComments.length}}</span></div>\n                    <div class=\"faicons\" *ngIf=\"card.portletCardsTodo.length > 0\" title=\"checklist\"><span class=\"badge-icon fa fa-check-square-o\"></span><span class=\"badge-text\"> {{card.portletCardsTodo.length}}</span></div>\n                    <div class=\"faicons\" *ngIf=\"card.portletCardDueDate\">\n                        <span class=\"btn btn-default btn-xs\" [ngClass]=\"{'btn-success': diffDays >= 0, 'btn-danger' : diffDays < 0}\"><span><i class=\"fa fa-clock-o\"></i> {{date | date}}</span>\n                        <form [formGroup]=\"dueDateForm\">\n                            <input class=\"form-control\" formControlName=\"duedate\" placeholder=\"yyyy-mm-dd\" type=\"hidden\" [(ngModel)]=\"card.portletCardDueDate\" (ngModelChange)=\"onDateChange(card.portletCardDueDate)\">\n                        </form>\n                        </span>\n                    </div>\n                    <div class=\"faicons\" title=\"checklist\"><span class=\"badge-text\">&nbsp;</span></div>\n                </div>\n                <div class=\"js-badges\">\n                    <ul class=\"display-edit-labels-pop-over small-tags\">\n                        <li *ngFor=\"let item of board.boardTagLabels\">\n                            <span class=\"card-label mod-selectable\" *ngIf=\"item.portletCardId.indexOf(card.portletCardId) !== -1\" [ngClass]=\"item.class\" [style.background-color]=\"item.bg\" title=\"{{item.name}}\">\n\n                            </span>\n                        </li>\n                    </ul>\n                </div>\n                <div class=\"colorLable\">\n                    <span class=\"bg-green-light\"></span>\n                </div>\n\n                <chore-portlet-assined></chore-portlet-assined>\n                <ng-template #content let-c=\"close\" let-d=\"dismiss\">\n                    <a class=\"fa fa-lg ion-close dialog-close-button\" href=\"javascript:void(0)\" (click)=\"d('Cross click')\"></a>\n                    <chore-portlet-modal [card]=\"card\" [board]=\"board\" [portletIndex]=\"portletIndex\" [cardIndex]=\"cardIndex\" (cardUpdate)=\"cardUpdate($event)\"></chore-portlet-modal>\n                </ng-template>\n            </div>\n            <form #form=\"ngForm\" (ngSubmit)=\"addCard(form, item)\">\n                <div class=\"portlet-body addCardBody\" [hidden]=\"!item.hideme\">\n                    <div class=\"form-group m-b-0\">\n                        <label class=\"control-label sr-only\" for=\"card\">Add a Card</label>\n                        <textarea id=\"card\" type=\"text\" placeholder=\"Add a Card\" class=\"form-control input-md textboxchange\" focus=\"true\" name=\"cardlabel\" ngModel></textarea>\n                        <button class=\"btn btn-teal m-t-10 v-m i-b\" type=\"submit\">Add</button>\n                        <a href=\"#\" class=\"icon-sm ion-close m-l-10 v-m i-b m-t-10\" (click)=\"$event.stopPropagation(); $event.preventDefault();item.hideme = !item.hideme\"></a>\n                    </div>\n                </div>\n            </form>\n\n\n        </div>\n        <a class=\"open-card-composer\" href=\"#\" (click)=\"$event.stopPropagation(); $event.preventDefault();item.hideme = !item.hideme\">Add a card…</a>\n        <div class=\"clearfix\"></div>\n    </div>\n\n    <div class=\"clearfix\"></div>\n</div>\n<div class=\"col-lg-3\">\n    <span class=\"newPortlet\" ngbDropdownToggle ngbDropdown #portletAddDrop=\"ngbDropdown\">Add a Portlet</span>\n    <div class=\"pop-over dropdown-menu\" style=\"left:15px; top: -1px;\" (click)=\"$event.stopPropagation(); portletAddDrop.open();\">\n        <div class=\"popover-content\">\n            <form [formGroup]=\"updatePortletForm\" (ngSubmit)=\"addPortlet(boardIndex)\">\n                <div class=\"form-group m-b-0\">\n                    <label class=\"control-label sr-only\" for=\"Name\">Add a Portlet</label>\n                    <input id=\"Name\" name=\"Name\" type=\"text\" placeholder=\"Add a Portlet\" class=\"form-control input-md textboxchange\" formControlName=\"portletname\" focus=\"true\" autocomplete=\"off\">\n                    <button class=\"btn btn-teal m-t-10 v-m i-b\" type=\"submit\">Add</button>\n                    <a href=\"#\" class=\"icon-sm ion-close m-l-10 v-m i-b m-t-10\" (click)=\"$event.stopPropagation(); $event.preventDefault(); portletAddDrop.close();\"></a>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 557:
/***/ (function(module, exports) {

module.exports = "<a href=\"javascript:;\" ngbDropdown ngbDropdownToggle #listActionDrop=\"ngbDropdown\"><i class=\"ion-android-more-horizontal fa fa-lg\"></i></a>\n<div class=\"pop-over dropdown-menu\" style=\"left: 0px; top: 30px;\">\n    <div data-reactroot=\"\">\n        <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">List Actions</span>\n            <a href=\"#\" class=\"pop-over-header-close-btn icon-sm ion-close\" (click)=\"$event.preventDefault(); listActionDrop.close();\"></a>\n        </div>\n        <div>\n            <div class=\"popover-content\">\n                <div>\n                    <div>\n                        <ul class=\"pop-over-list\">\n                            <li><a class=\"\" href=\"#\">Copy List…</a></li>\n                            <li><a class=\"\" href=\"#\">Move List…</a></li>\n                            <li><a class=\"\" href=\"#\">Subscribe </a></li>\n                            <li><a class=\"\" href=\"#\" (click)=\"deleteCard($event, portletId)\">Delete Card…</a></li>\n                        </ul>\n                        <hr>\n                        <ul class=\"pop-over-list\">\n                            <li><a class=\"\" href=\"#\">Move All Cards in This List…</a></li>\n                            <li><a class=\"\" href=\"#\">Archive All Cards in This List…</a></li>\n                        </ul>\n                        <hr>\n                        <ul class=\"pop-over-list\">\n                            <li><a class=\"\" href=\"#\">Archive This List</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

module.exports = "<div class=\"list-card-members js-list-card-members\">\n    <div class=\"member js-member-on-card-menu\" data-idmem=\"50095233f62adbe04d935195\"><img class=\"member-avatar\" height=\"30\" width=\"30\" src=\"../assets/images/30.png\" alt=\"Taco (taco)\" title=\"Taco (taco)\"><span class=\"member-gold-badge\" title=\"This member has Trello Gold.\"></span></div>\n    <div class=\"member js-member-on-card-menu\" data-idmem=\"589ef5f94c55710b85a389e0\"><img class=\"member-avatar\" height=\"30\" width=\"30\" src=\"../assets/images/dog.png\" alt=\"Arghya Majumder (arghyamajumder)\" title=\"Arghya Majumder (arghyamajumder)\"><span class=\"member-gold-badge\" title=\"This member has Trello Gold.\"></span></div>\n</div>"

/***/ }),

/***/ 559:
/***/ (function(module, exports) {

module.exports = "<div class=\"templateImage m-b-10 inlineCardCover\" *ngIf=\"card.portletCardCover\" [style.background]=\"'url('+card.portletCardCover+')'\"></div>\n{{cardName}}"

/***/ }),

/***/ 560:
/***/ (function(module, exports) {

module.exports = "<!--<template #content let-c=\"close\" let-d=\"dismiss\">-->\n<div class=\"window-wrapper js-tab-parent\">\n    <div class=\" card-detail-window u-clearfix \">\n        <div class=\"templateImage\" *ngIf=\"card.portletCardCover\" [style.background]=\"'url('+card.portletCardCover+')'\"></div>\n        <div class=\"window-header \">\n            <span class=\"window-header-icon fa fa-2x fa-file-text-o\"></span>\n            <div class=\"window-title\">\n                <h2 class=\"card-detail-title-assist\" dir=\"auto\" *ngIf=\"viewLabel\" (click)=\"editLabel(card.portletCardName)\">{{card.portletCardName}}</h2>\n                <form [formGroup]=\"editLabelForm\" *ngIf=\"!viewLabel\">\n                    <input type=\"text\" formControlName=\"portletCardName\" [(ngModel)]=\"card.portletCardName\" autofocus class=\"editModalTextBox v-m\" focus=\"true\" (blur)=\"hideLabel(card.portletCardId)\">\n\n                </form>\n            </div>\n            <div class=\"window-header-inline-content quiet js-current-list \">\n                <p class=\"u-inline-block u-bottom text-capitalize\" *ngIf=\"card.portletCardTagLine\">{{card.portletCardTagLine}}</p>\n                <button class=\"btn btn-default btn-teal btn-xs\" [ngClass]=\"{'m-l-15':card.portletCardTagLine}\" (click)=\"addTagline()\">Add / Edit</button>\n                <div>\n                    <form [formGroup]=\"addTagLineForm\" *ngIf=\"editAddTagLineVisible\">\n                        <input type=\"text\" formControlName=\"portletCardTagLine\" [(ngModel)]=\"card.portletCardTagLine\" autofocus class=\"editModalTextBox textSmall v-m m-t-5\" focus=\"true\">\n                        <button type=\"button\" class=\"btn btn-teal v-m m-t-5\" [disabled]=\"!addTagLineForm.valid\" (click)=\"editDoneTagLine(card.portletCardId)\">Save</button>\n                    </form>\n                </div>\n            </div>\n            <div class=\"window-header-inline-content js-subscribed-indicator-header \"><span class=\"icon-sm icon-subscribe \"></span></div>\n        </div>\n        <div class=\"window-main-col \">\n            <div class=\"card-detail-data u-gutter \">\n                <div class=\"card-detail-item u-clearfix js-card-detail-members \">\n                    <h3 class=\"card-detail-item-header \">Members</h3>\n                    <div class=\"js-card-detail-members-list \">\n                        <div class=\"member js-member-on-card-menu\"><img class=\"member-avatar \" height=\"30 \" width=\"30 \" src=\"\" alt=\"\" title=\"\"></div>\n                        <div class=\"member js-member-on-card-menu\"><img class=\"member-avatar \" height=\"30 \" width=\"30 \" src=\"\" alt=\"\" title=\"\"></div>\n                        <div class=\"member js-member-on-card-menu\"><img class=\"member-avatar \" height=\"30 \" width=\"30 \" src=\"\" alt=\"\" title=\"\"></div>\n                        <a class=\"card-detail-item-add-button dark-hover js-details-edit-members \"><span class=\"fa fa-lg ion-android-add \"></span></a> <span class=\"clearfix\"></span>\n                    </div>\n                </div>\n                <div class=\"card-detail-item-labels u-clearfix\">\n                    <h3 class=\"card-detail-item-header \"><i class=\"fa fa-bookmark\"></i> Labels</h3>\n                </div>\n                <div class=\"row\">\n                    <ul class=\"display-edit-labels-pop-over\">\n                        <li *ngFor=\"let item of board.boardTagLabels\">\n                            <span class=\"card-label mod-selectable\" *ngIf=\"item.portletCardId.indexOf(card.portletCardId) !== -1\" [ngClass]=\"item.class\" [style.background-color]=\"item.bg\" title=\"{{item.name}}\">\n                                {{item.name}}\n                            </span>\n                        </li>\n                        <li>\n                            <div class=\"customLabelMaker\">\n                                <a class=\"card-detail-item-add-button dark-hover js-details-edit-members \" #tagDrop=\"ngbDropdown\" ngbDropdown ngbDropdownToggle><span class=\"fa fa-lg ion-android-add \"></span></a>\n                                <div class=\"pop-over dropdown-menu\" style=\"left:0; top: 30px;\">\n                                    <div>\n                                        <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Add Labels</span>\n                                            <a class=\"pop-over-header-close-btn icon-sm ion-close\" href=\"javascript:void(0)\" (click)=\"$event.stopPropagation(); tagDrop.close();\"></a>\n                                        </div>\n                                        <div class=\"popover-content\">\n                                            <div>\n                                                <div>\n                                                    <ul class=\"pop-over-list edit-labels-pop-over\">\n                                                        <li *ngFor=\"let item of board.boardTagLabels\">\n                                                            <a class=\"card-label-edit-button\" href=\"javascript:void(0);\" (click)=\"showEditTagForm(item)\"><i class=\"fa fa-pencil\"></i></a>\n                                                            <div class=\"clearfix\"></div>\n                                                            <span class=\"card-label mod-selectable\" *ngIf=\"!item.showEditTagInForm\" [ngClass]=\"item.class\" [style.background-color]=\"item.bg\" [class.active]=\"item.portletCardId.indexOf(card.portletCardId) !== -1\" (click)=\"addTags(card.portletCardId, item)\">\n                                                    <span class=\"card-label-selectable-icon pull-right\">\n                                                        <i class=\"fa fa-check\"></i>\n                                                    </span> {{item.name}}\n                                                            </span>\n                                                            <span class=\"card-label mod-selectable\" *ngIf=\"item.showEditTagInForm\" [ngClass]=\"item.class\" [style.background-color]=\"item.bg\">\n                                                    <span class=\"card-label-selectable-icon pull-right\">\n                                                        <i class=\"fa fa-check\"></i>\n                                                    </span>\n                                                            <div class=\"row\">\n                                                                <div class=\"col-sm-10\">\n                                                                    <form [formGroup]=\"showEditLabelForm\">\n                                                                        <input type=\"text\" formControlName=\"name\" class=\"form-control input-sm\" autofocus focus=\"true\" (blur)=\"updateLabelDisplayName(item, card.portletCardId)\">\n                                                                        <input type=\"hidden\" formControlName=\"id\" [ngModel]=\"item.id\">\n                                                                    </form>\n                                                                </div>\n                                                            </div>\n                                                            </span>\n                                                        </li>\n                                                    </ul>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n\n\n                <!--<div [style.background]=\"arrayColors['color']\" (click)=\"selectedColor='color'\"></div>\n\n                <div [style.background]=\"arrayColors['color2']\" (click)=\"selectedColor='color2'\"></div>-->\n\n\n                <div class=\"card-detail-item card-due-date js-card-detail-due-date\" style=\"position:relative\">\n                    <h3 class=\"card-detail-item-header\"> <i class=\"fa fa-calendar-check-o\"></i> Due Date</h3>\n                    <span class=\"clearfix\"></span>\n                    <span class=\"btn btn-default\" [ngClass]=\"{'btn-success': diffDays >= 0, 'btn-danger' : diffDays < 0}\">\n               <span *ngIf=\"card.portletCardDueDate\" (click)=\"d.toggle()\"><i class=\"fa fa-calendar-check-o\"></i> {{date | date}}</span>\n                    <span *ngIf=\"!card.portletCardDueDate\" (click)=\"d.toggle(); increment()\"><i class=\"fa fa-calendar-plus-o\"></i> Choose a Date</span>\n                    <form [formGroup]=\"addDueDateForm\">\n                        <input class=\"form-control\" placeholder=\"yyyy-mm-dd\" formControlName=\"portletCardDueDate\" [(ngModel)]=\"card.portletCardDueDate\" ngbDatepicker #d=\"ngbDatepicker\" type=\"hidden\" (ngModelChange)=\"onChange(card.portletCardId)\">\n                    </form>\n                    </span>\n                </div>\n                <div class=\"card-detail-item\">\n                    <h3 class=\"card-detail-item-header \"> <i class=\"fa fa-thumbs-o-up\"></i> Votes</h3>\n                    <a class=\"card-detail-badge is-clickable js-card-detail-votes-badge\" href=\"# \"></a>\n                </div>\n                <div class=\"card-detail-item\">\n                    <h3 class=\"card-detail-item-header \"><i class=\"fa fa-clock-o\"></i> Last Updated</h3>\n                    <div class=\"card-detail-badge date mod-last-updated js-card-detail-age-badge \">\n                        <span class=\"time\">{{card.portletCardUpdatedOn | date: 'fullDate'}}</span>\n                        <span class=\"time\">{{card.portletCardUpdatedOn | date: 'shortTime'}}</span>\n                    </div>\n                </div>\n                <div class=\"js-plugin-badges \">\n                    <div></div>\n                </div>\n                <div class=\"card-detail-item card-detail-item-block u-clearfix editable \" attr=\"desc \">\n                    <h3 class=\"card-detail-item-header js-show-with-desc \"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> Description</h3>\n                    <a href=\"javascript:void\" class=\"btn btn-default btn-teal btn-xs\" (click)=\"showCKEditor()\">Add/Edit</a>\n                    <div class=\"description-content js-desc-content \">\n                        <div class=\"current markeddown hide-on-edit\" dir=\"auto\">\n                            <div class=\"description m-t-10 m-b-10\" [innerHTML]=\"card.portletCardsDescription | safeHtml\" *ngIf=\"card.portletCardsDescription && !addDescription\">\n                            </div>\n                            <div class=\"clearfix m-b-10\"></div>\n                            <form [formGroup]=\"addDescriptionForm\" *ngIf=\"addDescription\">\n                                <ckeditor *ngIf=\"addDescription\" formControlName=\"portletCardsDescription\" [(ngModel)]=\"card.portletCardsDescription\" [config]=\"config\" debounce=\"0\" focus=\"true\"></ckeditor>\n                                <button (click)=\"addEditDescriptionValue(card.portletCardId)\" *ngIf=\"addDescription\" class=\"btn btn-teal m-t-10\">Add</button>\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"window-module js-attachments-section u-clearfix \">\n                <div class=\"window-module-title window-module-title-no-divider \">\n                    <span class=\"window-module-title-icon fa fa-paperclip fa-2x \"></span>\n                    <h3 class=\"u-inline-block \">\n                        Attachments\n                        <a class=\"btn btn-default btn-teal btn-xs\" (click)=\"showFileUploader = !showFileUploader; showFileUpload($event)\" href=\"javascript:void(0);\"><span class=\"fa fa-lg ion-android-add \"></span></a>\n                    </h3>\n\n                </div>\n                <div class=\"u-gutter \">\n                    <div class=\"u-clearfix js-attachment-list \">\n                        <div class=\"form-group\" [hidden]=\"!showFileUploader\">\n                            <!--<div class=\"Lloader\" [hidden]=\"showLoading\">Loading...</div>-->\n                            <input type=\"file\" [ng-file-select]=\"cardoptions\" class=\"inputfile\" (onUpload)=\"handleAttachmentUpload($event, card.portletCardId)\" placeholder=\"upload cover image\" accept=\"application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,\tapplication/vnd.openxmlformats-officedocument.presentationml.presentation ,image/*, text/plain, application/zip, application/json, application/x-rar-compressed\">\n                            <label for=\"\">\n                                    <span>{{attachmentUrl}}</span> <strong><i class=\"fa fa-upload\"></i> Choose a file </strong>\n                                </label>\n                            <div class=\"clearfix\"></div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                        <div class=\"attachment-thumbnail\" *ngFor=\"let item of card.portletCardsAttachments | orderBy : '-'\">\n                            <a class=\"attachment-thumbnail-preview js-open-viewer attachment-thumbnail-preview-is-cover \" href=\"{{item.cardAttachmentUrl}}\" target=\"_blank\" [style.background]=\"'url('+item.cardAttachmentThumbnail+')'\"></a>\n                            <p class=\"attachment-thumbnail-details js-open-viewer \">\n                                {{item.cardAttachmentOriginalName}}\n                                <a class=\"attachment-thumbnail-details-title js-attachment-thumbnail-details \" href=\"{{item.cardAttachmentUrl}}\" target=\"_blank\">\n                                    <span class=\"u-block quiet \">Added On\n\n                                        <span class=\"date\">{{item.cardAttachmentCreated_at | date: 'medium'}}</span>\n                                    </span>\n                                </a>\n                                <span class=\"quiet attachment-thumbnail-details-options \">\n                                    <a class=\"attachment-thumbnail-details-options-item dark-hover js-download \" href=\"{{item.cardAttachmentUrl}}\" target=\"_blank \" download=\"download\">\n                                            <span class=\"fa fa-download \"></span>\n                                <span class=\"attachment-thumbnail-details-options-item-text \">Download</span>\n                                </a>\n                                <a class=\"attachment-thumbnail-details-options-item dark-hover\" href=\"javascript:void(0)\" [hidden]=\"card.portletCardCover === item.cardAttachmentUrl\" (click)=\"addCardCover(card.portletCardId, item.portletCardImageId, item.cardAttachmentUrl)\" *ngIf=\"item.cardAttachmentMimetype === 'image'\">\n                                    <span class=\"fa fa-picture-o\"></span>\n                                    <span class=\"attachment-thumbnail-details-options-item-text \">Make Cover</span>\n                                </a>\n                                <a class=\"attachment-thumbnail-details-options-item dark-hover\" href=\"javascript:void(0)\" [hidden]=\"card.portletCardCover !== item.cardAttachmentUrl\" (click)=\"addCardCover(card.portletCardId, item.portletCardImageId, '')\" *ngIf=\"item.cardAttachmentMimetype === 'image'\">\n                                    <span class=\"fa fa-picture-o \"></span>\n                                    <span class=\"attachment-thumbnail-details-options-item-text \">Remove Cover</span>\n                                </a>\n                                <a class=\"attachment-thumbnail-details-options-item attachment-thumbnail-details-options-item-delete dark-hover\" href=\"javascript:void(0);\" (click)=\"deleteAttachment(card.portletCardId, item.portletCardImageId, item.cardAttachmentId, item.cardAttachmentUrl, item.cardAttachmentMimetype)\">\n                                    <span class=\"fa fa-close \"></span>\n                                    <span class=\"attachment-thumbnail-details-options-item-text \">Delete</span>\n                                </a>\n                                </span>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable \">\n                <chore-todo-app></chore-todo-app>\n            </div>\n            <div class=\"window-module add-comment-section \">\n                <div class=\"window-module-title window-module-title-no-divider \">\n                    <span class=\"window-module-title-icon fa fa-2x fa-comments-o \"></span>\n                    <h3>Comments</h3>\n                    <span class=\"editing-members js-editing-members hide \"></span>\n                </div>\n                <div class=\"phenom mod-other-type\" *ngFor=\"let item of card.portletCardsComments; let cardI = index;\">\n                    <div class=\"phenom-desc \">\n                        <span class=\"pull-left m-r-10\">\n               <img alt=\"{{item.portletCardsCommentsCreator}}\" class=\"member-avatar\" height=\"30 \" src=\"{{item.portletCardsCommentsCreatorImage}}\" srcset=\"{{item.portletCardsCommentsCreatorImage}}\" title=\"\" width=\"30\">\n               </span>\n                        <div class=\"comments m-b-10\" style=\"overflow:hidden;\">\n                            <span class=\"u-font-weight-bold \">\n                  <b>{{item.portletCardsCommentsCreatorName}}</b>\n                  </span> commented \" {{item.portletCardsComments}} \"\n                            <span *ngIf=\"item.portletCardsCommentsCreator === this.userName\">\n                  <button class=\"btn btn-default btn-xs pull-right\" (click)=\"deleteComment(item.portletCardCommentId, card.portletCardId)\"><i class=\"fa fa-trash-o\"></i><span class=\"sr-only\">Delete</span></button>\n                            <button class=\"btn btn-xs btn-default pull-right\" [hidden]=\"item.hideme\" (click)=\"openCommentEditForm(item, cardI)\"><i class=\"fa fa-pencil-square-o\"></i><span class=\"sr-only\">Edit</span></button>\n                            <button class=\"btn btn-xs btn-default pull-right\" [hidden]=\"!item.hideme\" (click)=\"item.hideme = !item.hideme\"><i class=\"fa fa-pencil-square-o\"></i><span class=\"sr-only\">Edit</span></button>\n                            </span>\n                        </div>\n                        <div class=\"editComment\" [hidden]=\"!item.hideme\">\n                            <form [formGroup]=\"editCommentForm\" (ngSubmit)=\"editComment(item.portletCardCommentId, card.portletCardId)\">\n                                <div class=\"comment-frame\">\n                                    <div class=\"comment-box \">\n                                        <textarea class=\"comment-box-input\" #commentAreaFocus placeholder=\"Write a comment…\" formControlName=\"portletCardsComments\" style=\"overflow: hidden; word-wrap: break-word; height: 75px;\" [(ngModel)]=\"bindedVariable1\"></textarea>\n                                        <emoji-input [onEnter]=\"onEnterFunction\" [popupAnchor]=\"'bottom'\" [(model)]=\"bindedVariable1\">\n                                        </emoji-input>\n                                    </div>\n                                </div>\n                                <div class=\"comment-controls u-clearfix \"><button class=\"btn btn-teal btn-sm\" type=\"submit\" [disabled]=\"!editCommentForm.valid\">Save</button></div>\n                            </form>\n                        </div>\n                    </div>\n                    <p class=\"phenom-meta quiet \"><a class=\"date\" href=\"javascript:void(0)\" title=\"{{item.portletCardsCommentsCreatedAt}}\"><i class=\"fa fa-clock-o\"></i> {{item.portletCardsCommentsCreatedAt | date:'medium'}}</a>\n                    </p>\n                </div>\n                <div class=\"new-comment\">\n                    <div class=\"member member-no-menu\">\n                        <img class=\"member-avatar \" height=\"30\" width=\"30\" src=\"{{userImage}}\" srcset=\"{{userImage}}\" alt=\"{{userName}}\" title=\"{{userName}}\">\n                    </div>\n                    <form [formGroup]=\"addCommentForm\" (ngSubmit)=\"addComment(card.portletCardId)\">\n                        <div class=\"comment-frame \">\n                            <div class=\"comment-box \">\n                                <textarea class=\"comment-box-input js-new-comment-input\" placeholder=\"Write a comment…\" tabindex=\"1\" dir=\"auto\" formControlName=\"portletCardsComments\" style=\"overflow: hidden; word-wrap: break-word; height: 75px; \" [(ngModel)]=\"bindedVariable\"></textarea>\n                                <emoji-input [onEnter]=\"onEnterFunction\" [popupAnchor]=\"'bottom'\" [(model)]=\"bindedVariable\">\n                                </emoji-input>\n                            </div>\n                            <input type=\"hidden\" formControlName=\"portletCardsCommentsCreator\">\n                            <input type=\"hidden\" formControlName=\"portletCardsCommentsCreatorImage\">\n                            <input type=\"hidden\" formControlName=\"portletCardsCommentsCreatorName\">\n                            <input type=\"hidden\" formControlName=\"portletCardsCommentsCreatedAt\">\n                        </div>\n                        <div class=\"comment-controls u-clearfix \"><button class=\"btn btn-teal btn-sm\" type=\"submit\" [disabled]=\"!addCommentForm.valid\">Save</button></div>\n                    </form>\n                </div>\n            </div>\n            <div class=\"window-module\">\n                <div class=\"window-module-title window-module-title-no-divider \">\n                    <span class=\"window-module-title-icon fa fa-2x ion-podium \"></span>\n                    <h3>Activity</h3>\n                    <div class=\"window-module-title-options \">\n                        <a class=\"quiet\" href=\"javascript:void(0)\" *ngIf=\"cardDetailsHide\" (click)=\"cardDetailsHide = false\">Show Details</a><a class=\"quiet\" href=\"javascript:void(0)\" *ngIf=\"!cardDetailsHide\" (click)=\"cardDetailsHide = true\">Hide Details</a>\n                    </div>\n                </div>\n                <div *ngIf=\"!cardDetailsHide\">\n                    <div class=\"js-list-actions\" *ngFor=\"let item of card.portletCardActivity | orderBy : ['-portletCardOperationOn']\">\n                        <div class=\" phenom mod-other-type \">\n                            <div class=\"phenom-creator \">\n                                <!--<div class=\"member\">\n                                    <img class=\"member-avatar \" height=\"30 \" width=\"30 \" src=\" \" srcset=\" \" alt=\" \" title=\" \">\n                                </div>-->\n                            </div>\n                            <div class=\"phenom-desc \">\n                                <span class=\"inline-member \">\n                    <span class=\"u-font-weight-bold \">{{item.portletCardCreatedByName}}</span>\n                                </span>\n                                <span *ngFor=\"let activity of item.activity \">\n                                    <span [innerHTML]=\"activity | safeHtml\"></span>\n                                </span>\n                            </div>\n                            <p class=\"phenom-meta quiet \">\n                                <span class=\"date \">{{item.portletCardOperationOn  | date: 'medium'}}</span>\n                            </p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"window-sidebar \">\n            <div class=\"window-module u-clearfix \">\n                <h3>Add</h3>\n                <div class=\"u-clearfix \">\n                    <a class=\"button-link js-change-card-members \" href=\"# \"><span class=\"icon-sm icon-member \"></span>&nbsp;Members</a>\n                    <a class=\"button-link js-edit-labels \" href=\"# \"><span class=\"icon-sm icon-label \"></span>&nbsp;Labels</a>\n                    <a class=\"button-link js-add-checklist-menu \" href=\"# \"><span class=\"icon-sm icon-checklist \"></span>&nbsp;Checklist</a>\n                    <a class=\"button-link js-attach \" href=\"# \"><span class=\"icon-sm icon-attachment \"></span>&nbsp;Attachment</a>\n                </div>\n            </div>\n            <div class=\"window-module other-actions u-clearfix \">\n                <h3>Actions</h3>\n                <div class=\"u-clearfix \">\n                    <a class=\"button-link js-move-card \" href=\"# \"><span class=\"icon-sm icon-move \"></span>&nbsp;Move</a><a class=\"button-link js-copy-card \" href=\"# \"><span class=\"icon-sm icon-card \"></span>&nbsp;Copy</a>\n                    <div class=\"js-subscribe-sidebar-button \"><a class=\"button-link is-on js-unsubscribe \" title=\"Subscribe to the card to get notifications when something changes. \"><span class=\"icon-sm icon-subscribe\n                    \"></span>&nbsp;Subscribe<span class=\"on \"><span class=\"icon-sm icon-check light \"></span></span></a></div>\n                    <div class=\"js-vote-sidebar-button \"></div>\n                    <hr>\n                    <a class=\"button-link js-archive-card \" href=\"# \"><span class=\"icon-sm icon-archive \"></span>&nbsp;Archive</a><a class=\"button-link js-unarchive-card hide \" href=\"# \"><span class=\"icon-sm icon-refresh \"></span>&nbsp;Send to board</a>\n                    <a class=\"button-link negate hide js-delete-card \" href=\"# \"><span class=\"icon-sm icon-remove \"></span>&nbsp;Delete</a>\n                </div>\n            </div>\n            <div class=\"window-module u-clearfix \">\n                <p class=\"quiet u-bottom \"><a class=\"quiet-button js-more-menu \" href=\"# \">Share and more…</a></p>\n            </div>\n        </div>\n    </div>\n    <div class=\"clearfix \"></div>\n    <!--</template>-->"

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

module.exports = "<section class=\"todoapp\">\n    <div class=\"window-module-title window-module-title-no-divider \"><span class=\"window-module-title-icon fa fa-2x fa-list-ol \"></span>\n        <h3>Todos</h3>\n    </div>\n    <div class=\"todoWrapper u-gutter\">\n        <input class=\"new-todo\" placeholder=\"What needs to be done?\" [(ngModel)]=\"newTodoText\" (keyup.enter)=\"addTodo()\">\n        <section class=\"todoContent\" *ngIf=\"todoStore.todos.length > 0\">\n            <input class=\"toggle-all\" type=\"checkbox\" *ngIf=\"todoStore.todos.length\" #toggleall [checked]=\"todoStore.allCompleted()\" (click)=\"todoStore.setAllTo(toggleall.checked)\">\n            <ul class=\"todo-list\">\n                <li *ngFor=\"let todo of todoStore.todos; let i = index\" [class.completed]=\"todo.completed\" [class.editing]=\"todo.editing\">\n                    <div class=\"view\">\n                        <input class=\"toggle\" type=\"checkbox\" id=\"{{todo._title}}_{{i}}\" (click)=\"toggleCompletion(todo)\" [checked]=\"todo.completed\">\n                        <label for=\"{{todo._title}}_{{i}}\" (dblclick)=\"editTodo(todo)\">{{todo.title}}</label>\n                        <button class=\"destroy btn-xm btn-default btn\" (click)=\"remove(todo)\"><i class=\"fa ion-android-close fa-2x\"></i></button>\n                    </div>\n                    <input class=\"edit\" *ngIf=\"todo.editing\" [value]=\"todo.title\" let editedtodo (blur)=\"stopEditing(todo, editedtodo.value)\" (keyup.enter)=\"updateEditingTodo(todo, editedtodo.value)\" (keyup.escape)=\"cancelEditingTodo(todo)\">\n                </li>\n            </ul>\n        </section>\n        <footer class=\"todoFooter\" *ngIf=\"todoStore.todos.length > 0\">\n            <span class=\"todo-count\"><strong>{{todoStore.getRemaining().length}}</strong> {{todoStore.getRemaining().length == 1 ? 'item' : 'items'}} left</span>\n            <button class=\"clear-completed btn btn-xs btn-default\" *ngIf=\"todoStore.getCompleted().length > 0\" (click)=\"removeCompleted()\">Clear completed</button>\n        </footer>\n    </div>\n\n</section>"

/***/ }),

/***/ 562:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-3\" (click)=\"open(content)\">\n    <div class=\"portlet\">\n        <div class=\"panel-collapse\">\n            <div class=\"portlet-body createBoard\">\n                <div class=\"boardIcon\">\n                    <i aria-hidden=\"true\" class=\"fa fa-tasks fa-2x fa-rotate-90\"></i>\n                    <i class=\"fa fa-plus pos-abs\" aria-hidden=\"true\"></i>\n                    <span class=\"block m-t-10\">Add Board</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<chore-list-board [displayData]=\"dataSet\" (boardUpdate)=\"boardUpdate($event)\"></chore-list-board>\n\n\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n        <h4 class=\"modal-title\">Create board</h4>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"alert alert-success\" *ngIf=\"success\">\n            {{success}}\n        </div>\n        <div class=\"alert alert-danger\" *ngIf=\"error\">\n\n            {{error}}\n        </div>\n        <form [formGroup]=\"createBoardForm\" (ngSubmit)=\"createBoard($event, d)\">\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label requiredField\" for=\"name\">Board Name <span class=\"asteriskField\">*</span>\n            </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <input class=\"form-control input-sm\" id=\"name\" formControlName=\"name\" placeholder=\"Board Name\" type=\"text\" [charCount]=\"50\" />\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label requiredField\" for=\"name\">Assigned Team\n            </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <select class=\"form-control\" formControlName=\"teamname\" [(ngModel)]=\"teamSet[0].name\">\n                <option *ngFor=\"let item of teamSet; let i = index\" [attr.value]=\"item.name\" [attr.selected]=\"i == 0 ? true : null\">{{item.name}}</option>\n            </select>\n                    <!--<chore-single-select [teams]=\"teamSet\" (onSelected)=\"onSelected($event)\"></chore-single-select>\n            <input type=\"hidden\" formControlName=\"teamname\" [(ngModel)]=\"selectedValue\">-->\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label \" for=\"file\">\n            Upload Board Cover Image\n            </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <input type=\"file\" [ng-file-select]=\"options\" class=\"inputfile\" (onUpload)=\"handleUpload($event)\" placeholder=\"upload cover image\" accept=\"image/*\">\n                    <label for=\"\">\n                <span>{{fileName}}</span> <strong><i class=\"fa fa-upload\"></i> Choose a file </strong>\n            </label>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label \" for=\"description\">\n       Description\n      </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <textarea class=\"form-control\" cols=\"10\" id=\"description\" formControlName=\"description\" placeholder=\"Board Description\" rows=\"2\" [charCount]=\"200\"></textarea>\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label\" for=\"description\">\n       Created by\n      </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <input class=\"form-control input-sm\" id=\"name\" formControlName=\"createdby\" type=\"text\" readonly/>\n                    <input class=\"form-control input-sm\" id=\"name\" formControlName=\"createdByName\" type=\"hidden\" readonly/>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8 col-md-push-4\">\n                    <button class=\"btn btn-teal\" name=\"submit\" type=\"submit\" [disabled]=\"!createBoardForm.valid\">\n        Save\n       </button>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n        </form>\n    </div>\n</ng-template>"

/***/ }),

/***/ 563:
/***/ (function(module, exports) {

module.exports = "<chore-header>\n</chore-header>\n<div id=\"surface\">\n    <main class=\"mainBoard viewEditBoard\">\n        <div *ngIf=\"grouped.length > 0\">\n            <div *ngFor=\"let item of grouped\">\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                    <h2 class=\"boardHeading\"> <i class=\"ion-person\"></i> {{item.teamName}}</h2>\n                </div>\n\n                <chore-create-board [boardData]=\"item.boards\"></chore-create-board>\n\n                <!--<chore-list-board *ngFor=\"let individual of item.boards\"></chore-list-board>-->\n            </div>\n        </div>\n        <div *ngIf=\"!grouped.length > 0\">\n            <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n                <h2 class=\"boardHeading\"> <i class=\"ion-person\"></i> Personal Board</h2>\n            </div>\n            <chore-create-board></chore-create-board>\n        </div>\n        <div class=\"clearfix\"></div>\n        <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\">\n            <h2 class=\"boardHeading\"> <i class=\" fa fa-lg ion-ios-people\"></i> Teams</h2>\n        </div>\n        <chore-create-team></chore-create-team>\n    </main>\n</div>"

/***/ }),

/***/ 564:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-3\" *ngFor=\"let board of displayData\">\n    <div class=\"portlet\" [ngClass]=\"{'haveCover bgContain': board.coverImageUrl}\" [style.background]=\"'url('+board.coverImageUrl+')'\">\n        <div class=\"portlet-heading bg-teal\">\n            <h3 class=\"portlet-title\">\n                {{board.name}}\n            </h3>\n            <div class=\"portlet-widgets\">\n                <a href=\"javascript:void(0)\" ngbDropdown data-toggle=\"remove\" ngbDropdownToggle><i class=\"ion-close-round\"></i></a>\n                <div class=\"pop-over dropdown-menu\" style=\"right:-10px;left:auto; top: 20px;\">\n                    <div data-reactroot=\"\">\n                        <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Are you ABSOLUTELY sure?</span>\n                        </div>\n                        <div class=\"facebox-alert\" data-facebox-id=\"facebox-description\" id=\"facebox-description\">\n                            Unexpected bad things will happen if you don’t read this!\n                        </div>\n                        <div>\n                            <div class=\"popover-content\">\n                                <div>\n                                    <div class=\"quiet\">\n                                        <p>This action CANNOT be undone. This will permanently delete the board. Please type in the name of the board to confirm.</p>\n                                        <form [formGroup]=\"deleteBoard\" class=\"form-group\">\n                                            <input type=\"text\" class=\"form-control input-sm\" formControlName=\"deleteBoardName\" (focus)=\"confirmBoardName(board.name)\">\n                                        </form>\n                                        <button type=\"button\" (click)=\"delBoard(board._id)\" class=\"btn btn-sm btn-block btn-danger\" [disabled]=\"!deleteBoard.valid\">Delete Board</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"panel-collapse\">\n            <div class=\"portlet-body\" (click)=\"navigateToBoard(board.boardId, board.name)\">\n                <span aria-haspopup=\"true\" class=\"ion-edit list-card-operation dropdown-toggle dropdown\" ngbdropdown=\"\" ngbdropdowntoggle=\"\" aria-expanded=\"false\" (click)=\"open($event, content, board)\"></span> {{board.description}}\n            </div>\n        </div>\n    </div>\n\n    <ng-template #content let-c=\"close\" let-d=\"dismiss\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n        </button>\n            <h4 class=\"modal-title\">Edit board</h4>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"alert alert-success\" *ngIf=\"success\">\n                {{success}}\n            </div>\n            <div class=\"alert alert-danger\" *ngIf=\"error\">\n                {{error}}\n            </div>\n            <form [formGroup]=\"updateBoardForm\" (ngSubmit)=\"updateBoard($event, d)\">\n                <div class=\"form-group\">\n                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                        <input class=\"form-control input-sm\" [(ngModel)]=\"board._id\" formControlName=\"id\" id=\"id\" name=\"id\" type=\"hidden\" />\n                        <label class=\"control-label requiredField\" for=\"name\">Board Name <span class=\"asteriskField\">*</span>\n                        </label>\n                    </div>\n                    <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                        <input class=\"form-control input-sm\" [(ngModel)]=\"board.name\" formControlName=\"name\" id=\"name\" name=\"name\" placeholder=\"Board Name\" type=\"text\" (blur)=\"nameUpdate(board.name)\" (focus)=\"getPrevValue(board.name)\" />\n                        <input class=\"form-control input-sm\" [(ngModel)]=\"board.boardId\" formControlName=\"boardId\" id=\"boardId\" name=\"boardId\" placeholder=\"Board Id\" type=\"hidden\" />\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                        <label class=\"control-label requiredField\" for=\"name\">Change Team <span class=\"asteriskField\">*</span>\n                        </label>\n                    </div>\n                    <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                        <!--<input type=\"hidden\" formControlName=\"teamname\" [(ngModel)]=\"board.teamname\">-->\n\n                        <select class=\"form-control\" formControlName=\"teamname\" [ngModel]=\"board.teamname\">\n                <option *ngFor=\"let item of teamSet\" [ngValue]=\"item.name\" [selected]=\"item.name === board.teamname\" >{{item.name}}</option>\n            </select>\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n\n\n\n                <div class=\"form-group\">\n                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                        <label class=\"control-label \" for=\"file\">\n                        Upload Board Cover Image\n                        </label>\n                    </div>\n                    <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                        <div class=\"row\" *ngIf=\"board.coverImageUrl!==''\">\n                            <div class=\"col-md-7 col-xs-7 col-sm-7 col-lg-7 m-b-15\">\n\n                                <img src=\"{{board.coverImageUrl}}\" alt=\"\" class=\"img-responsive\">\n                            </div>\n                            <div class=\"col-md-4 col-xs-4 col-sm-4 col-lg-4 p-l-0 m-b-15 p-r-0\">\n                                <button class=\"btn btn-sm btn-danger m-b-10\" (click)=\"deleteImage($event, board._id, board.coverImageID, board)\"><i class=\"fa fa-trash\"></i><span class=\"sr-only\">Delete Photo</span>\n                        </button>\n                            </div>\n                            <div class=\"col-xs-12 col-sm-12 col-lg-12 col-md-12\">\n                                <input type=\"file\" [ng-file-select]=\"options\" class=\"inputfile\" (onUpload)=\"handleUpload($event)\" placeholder=\"upload cover image\" *ngIf=\"imageUploadDisplay\">\n                                <label for=\"\" *ngIf=\"imageUploadDisplay\">\n                            <span>{{fileName}}</span> <strong><i class=\"fa fa-upload\"></i> Choose a file </strong>\n                        </label>\n                            </div>\n                        </div>\n                        <input type=\"hidden\" formControlName=\"coverImageUrl\" [(ngModel)]=\"board.coverImageUrl\">\n                        <div *ngIf=\"board.coverImageUrl==''\">\n                            <input type=\"file\" [ng-file-select]=\"options\" class=\"inputfile\" (onUpload)=\"handleUpload($event)\" placeholder=\"upload cover image\" accept=\"image/*\">\n                            <label for=\"\">\n                            <span>{{fileName}}</span> <strong><i class=\"fa fa-upload\"></i> Choose a file </strong>\n                        </label>\n                        </div>\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n\n                <div class=\"form-group\">\n                    <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                        <label class=\"control-label \" for=\"description\">\n                        Description\n                        </label>\n                    </div>\n                    <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                        <textarea class=\"form-control\" cols=\"10\" [(ngModel)]=\"board.description\" formControlName=\"description\" id=\"description\" name=\"description\" placeholder=\"Board Description\" rows=\"2\"></textarea>\n\n                    </div>\n\n                    <div class=\"clearfix\"></div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8 col-md-push-4\">\n                        <button class=\"btn btn-teal\" name=\"submit\" type=\"submit\" [disabled]=\"!updateBoardForm.valid\">\n                            Save\n                        </button>\n\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n            </form>\n        </div>\n    </ng-template>\n</div>"

/***/ }),

/***/ 565:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-3\" (click)=\"open(content)\">\n    <div class=\"portlet\">\n        <div class=\"panel-collapse\">\n            <div class=\"portlet-body createBoard\">\n                <div class=\"boardIcon\">\n                    <i class=\"fa fa-3x ion-ios-people\"></i>\n                    <i class=\"fa fa-plus pos-abs\" aria-hidden=\"true\"></i>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<chore-team-list [teamlist]=\"teamDataSet\"></chore-team-list>\n<ng-template #content let-c=\"close\" let-d=\"dismiss\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n        <h4 class=\"modal-title\">Create team</h4>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"alert alert-success\" *ngIf=\"success\">\n            {{success}}\n        </div>\n        <div class=\"alert alert-danger\" *ngIf=\"error\">\n            {{error}}\n        </div>\n        <form [formGroup]=\"createTeamForm\" (ngSubmit)=\"createTeam(createTeamForm.value, d)\">\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label requiredField\" for=\"name\">Team Name <span class=\"asteriskField\">*</span>\n                </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <input class=\"form-control input-sm\" id=\"name\" placeholder=\"Team Name\" type=\"text\" [charCount]=\"50\" formControlName=\"name\" />\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label \" for=\"description\">\n        Description\n        </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <textarea class=\"form-control\" cols=\"10\" id=\"description\" placeholder=\"Team Description\" rows=\"2\" [charCount]=\"200\" formControlName=\"description\"></textarea>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\">\n                    <label class=\"control-label\" for=\"description\">\n        Created by\n        </label>\n                </div>\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\">\n                    <input class=\"form-control input-sm\" id=\"name\" type=\"text\" readonly formControlName=\"createdby\" />\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8 col-md-push-4\">\n                    <button class=\"btn btn-teal\" name=\"submit\" type=\"submit\" [disabled]=\"!createTeamForm.valid\">\n            Create\n        </button>\n\n                </div>\n                <div class=\"clearfix\"></div>\n            </div>\n        </form>\n    </div>\n</ng-template>"

/***/ }),

/***/ 566:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-lg-3\" *ngFor=\"let team of teamlist\">\n    <div class=\"portlet\">\n        <div class=\"portlet-heading bg-teal\">\n            <h3 class=\"portlet-title\">\n                {{team.name}}\n            </h3>\n            <div class=\"portlet-widgets\">\n                <a data-toggle=\"remove\" href=\"#\"><i class=\"ion-close-round\"></i></a>\n            </div>\n            <div class=\"clearfix\"></div>\n        </div>\n        <div class=\"panel-collapse collapse in teamListPanel\">\n            <div class=\"portlet-body createBoard createTeam\">\n                <div class=\"boardDescription\">\n                    {{team.description}}\n                </div>\n                <div class=\"boardIcon\">\n                    <a href=\"\"><span><i  class=\"fa fa-tasks fa-2x \"></i> Boards</span></a>\n                    <a href=\"\"><span><i class=\"fa fa-2x ion-network fa-rotate-90\"></i> Team</span></a>\n                    <a href=\"\"><span><i class=\"fa fa-2x ion-ios-cog fa-cog\"></i> Settings</span></a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 567:
/***/ (function(module, exports) {

module.exports = "<div class=\"board-header\">\n    <div class=\"col-lg-12\">\n        <chore-team></chore-team>\n        <button type=\"button\" class=\"btn btn-teal btn-sm pull-right margin-right-0\"><span class=\"ion-android-options\"></span> Show Menu</button>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>\n\n<div class=\"board-canvas\">\n    <chore-board-canvas [board]=\"board\"></chore-board-canvas>\n</div>"

/***/ }),

/***/ 568:
/***/ (function(module, exports) {

module.exports = "<button type=\"button\" class=\"btn btn-teal btn-sm\" ngbDropdownToggle ngbDropdown #teamDrop=\"ngbDropdown\"><span class=\"ion-ios-people fa fa-lg\"></span> <small>Team Name</small></button>\n<div class=\"pop-over dropdown-menu\" style=\"left: 0px; top: 30px;\">\n    <div data-reactroot=\"\">\n        <div class=\"pop-over-header\"><span class=\"pop-over-header-title\">Team</span>\n            <a href=\"#\" class=\"pop-over-header-close-btn icon-sm ion-close\" (click)=\"$event.preventDefault(); teamDrop.close();\"></a>\n        </div>\n        <div>\n            <div class=\"popover-content\">\n                <ul class=\"pop-over-list\">\n                    <li><a class=\"\" href=\"#\">Create Team</a></li>\n                    <li><a class=\"\" href=\"#\">Change Team</a></li>\n                    <li><a class=\"\" href=\"#\">Team Page</a></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 569:
/***/ (function(module, exports) {

module.exports = "<div class=\"app app-fh app-loaded\">\n    <!-- START APP CONTAINER -->\n    <div class=\"app-container\" style=\"background: url(assets/images/bg-1.jpg) center center no-repeat fixed\">\n        <div class=\"app-login-box\">\n            <div class=\"app-login-box-title padding-top-30\">\n                <div class=\"title\">Sign Up</div>\n                <div class=\"subtitle\">Join our community with email</div>\n            </div>\n            <!--<div class=\"app-login-box-container margin-top-20\"><button class=\"btn btn-facebook btn-block\">Connect With Facebook</button> <button class=\"btn btn-twitter btn-block\">Connect With Twitter</button></div>-->\n            <div class=\"app-login-box-container\">\n\n                <div class=\"alert alert-success\" *ngIf=\"succesMessage\">\n                    <i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i> You have successfully signed up.\n                </div>\n                <div class=\"alert alert-danger\" *ngIf=\"errorMessage\">\n                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> You have successfully signed up.\n                </div>\n\n                <div class=\"title\">Sign in with email</div>\n                <form [formGroup]=\"signUpForm\" novalidate (ngSubmit)=\"signup(signUpForm.value, signUpForm.valid)\">\n                    <div class=\"form-group\">\n                        <div class=\"row\">\n                            <div class=\"col-md-6\">\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Name\" formControlName=\"firstName\" [ngClass]=\"{'has-error':!signUpForm.controls['firstName'].valid && signUpForm.controls['firstName'].touched}\">\n                            </div>\n                            <div class=\"col-md-6\">\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Last Name\" formControlName=\"lastName\" [ngClass]=\"{'has-error':!signUpForm.controls['lastName'].valid && signUpForm.controls['lastName'].touched}\">\n                            </div>\n                            <div class=\"col-md-12\">\n                                <div class=\"alert alert-danger fade in error\" *ngIf=\"signUpForm.controls['firstName'].hasError('required') && signUpForm.controls['firstName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> First Name must be filled in\n                                </div>\n                                <div class=\"alert alert-danger fade in error\" *ngIf=\"signUpForm.controls['firstName'].hasError('minlength') && signUpForm.controls['firstName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> First Name must be atleast 3 charecters long\n                                </div>\n                                <div class=\"alert alert-danger fade in error\" *ngIf=\"signUpForm.controls['firstName'].hasError('maxlength') && signUpForm.controls['firstName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> First Name must be within 20 charecters\n                                </div>\n                                <div class=\"alert alert-danger fade in error\" *ngIf=\"signUpForm.controls['firstName'].hasError('pattern') && signUpForm.controls['firstName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> First Name must not contain any special charecter\n                                </div>\n                                <div class=\" alert alert-danger fade in error\" *ngIf=\"signUpForm.controls['lastName'].hasError('required') && signUpForm.controls['lastName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Last Name must be filled in\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls['lastName'].hasError('minlength') && signUpForm.controls['lastName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Last Name must be atleast 3 charecters long\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls['lastName'].hasError('maxlength') && signUpForm.controls['lastName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Last Name must be within 20 charecters\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls['lastName'].hasError('pattern') && signUpForm.controls['lastName'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Last Name must not contain any special charecter\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" formGroupName=\"user\">\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Email Address\" formControlName=\"email\" [ngClass]=\"{'has-error': !signUpForm.controls.user.controls['email'].valid && signUpForm.controls.user.controls['email'].touched}\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 \">\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['email'].hasError('required') && signUpForm.controls.user.controls['email'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Email must be filled in\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['email'].hasError('minlength') && signUpForm.controls.user.controls['email'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Email must be atleast 3 charecters long\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['email'].hasError('pattern') && signUpForm.controls.user.controls['email'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Not a valid email address.\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"form-group \" formGroupName=\"user\">\n                        <input type=\"password\" class=\"form-control\" placeholder=\"Password\" formControlName=\"password\" [ngClass]=\"{'has-error': !signUpForm.controls.user.controls['password'].valid && signUpForm.controls.user.controls['password'].touched}\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 \">\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['password'].hasError('required') && signUpForm.controls.user.controls['password'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Password must be filled in\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['password'].hasError('minlength') && signUpForm.controls.user.controls['password'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Password must be atleast 8 charecters long\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['password'].hasError('maxlength') && signUpForm.controls.user.controls['password'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Password must be within 20 charecters\n                                </div>\n                                <div class=\"alert alert-danger fade in error \" *ngIf=\"signUpForm.controls.user.controls['password'].hasError('pattern') && signUpForm.controls.user.controls['password'].touched\">\n                                    <i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Password must contain atleast 1 uppercase, 1 small case, 1 special charecter, 1 number\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n\n                    <div class=\"form-group \">\n                        <button class=\"btn btn-teal btn-block \" [disabled]=\"!signUpForm.valid\" type=\"submit \">Create Account</button>\n                    </div>\n                </form>\n            </div>\n            <div class=\"app-login-box-footer \">© Chore 2017. All rights reserved.</div>\n            <div class=\"clearfix \"></div>\n        </div>\n    </div>\n    <!-- END APP CONTAINER -->\n</div>"

/***/ }),

/***/ 839:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 840:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(310);


/***/ })

},[840]);
//# sourceMappingURL=main.bundle.map