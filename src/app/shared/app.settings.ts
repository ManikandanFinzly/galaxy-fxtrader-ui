import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Activity',
        'Activity Project',
        {
            menu: 'horizontal', //horizontal , vertical
            menuType: 'default', //default, compact, mini
            showMenu: true,
            navbarIsFixed: true,
            footerIsFixed: false,
            sidebarIsFixed: false,
            showSideChat: false,
            sideChatIsHoverable: true,
            skin:'blue'  //light , dark, blue, green, combined, purple, orange, brown, grey, pink          
        }
    )
}