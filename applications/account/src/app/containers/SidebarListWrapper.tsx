import { SidebarConfig, SidebarList, SidebarListItem } from '@proton/components';
import { getIsSectionAvailable, getSectionPath } from '@proton/components/containers/layout/helper';
import * as React from 'react';
import SettingsListItem from '../components/SettingsListItem';

interface Props extends SidebarConfig {
    prefix: string;
}

const SidebarListWrapper = ({ header, routes, prefix }: Props) => {
    return (
        <SidebarList>
            <SidebarListItem className="text-uppercase text-left navigation-link-header-group">
                {header}
            </SidebarListItem>
            {Object.values(routes).map(
                (section) =>
                    getIsSectionAvailable(section) && (
                        <SettingsListItem
                            to={getSectionPath(prefix, section)}
                            icon={section.icon}
                            notification={section.notification}
                            key={section.to}
                        >
                            {section.text}
                        </SettingsListItem>
                    )
            )}
        </SidebarList>
    );
};

export default SidebarListWrapper;
