import { LayoutConfig } from "../models/layout-config.model";
import { LAYOUT_DETACHED, LAYOUT_HORIZONTAL, LAYOUT_TWO_COLUMN_MENU, LAYOUT_WIDTH_FLUID, LEFT_SIDEBAR_THEME_LIGHT, LEFT_SIDEBAR_TYPE_DEFAULT, MENU_POSITION_FIXED, TOPBAR_THEME_LIGHT } from "../models/layout.model";
import { MenuItem } from "../models/menu.model";

const findAllParent = (menuItems: MenuItem[], menuItem: any): any => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems: MenuItem[], menuItemKey: string): any => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

const getLayoutConfig = (layoutType: string): LayoutConfig => {
    let config: LayoutConfig = {
        layoutWidth: sessionStorage.getItem("Layout_Width") || LAYOUT_WIDTH_FLUID,
        menuPosition: sessionStorage.getItem("Menu_Position") || MENU_POSITION_FIXED,
        leftSidebarTheme: sessionStorage.getItem("Leftsidebar_Theme") || LEFT_SIDEBAR_THEME_LIGHT,
        leftSidebarType: sessionStorage.getItem("Leftsidebar_Type") || LEFT_SIDEBAR_TYPE_DEFAULT,
        topbarTheme: sessionStorage.getItem("Topbar_Theme") || TOPBAR_THEME_LIGHT,
        showSidebarUserInfo: false
    }

    switch (layoutType) {
        case LAYOUT_HORIZONTAL:
            return config;
        case LAYOUT_DETACHED:
            config.showSidebarUserInfo = true;
            return config;
        case LAYOUT_TWO_COLUMN_MENU:
            return config;
        default:
            console.log(config);
            return config;
    }
}

const changeBodyAttribute = (attribute: string, value?: string, action = 'set'): void => {
    switch (action) {
        case 'remove':
            if (document.body) {
                if (document.body.hasAttribute(attribute)) {
                    document.body.removeAttribute(attribute);
                }
            }
            break;
        default:
            if (document.body) document.body.setAttribute(attribute, value!);
            break;
    }
}


export { findAllParent, findMenuItem, getLayoutConfig, changeBodyAttribute };