import React from 'react';
import { Checkbox, DropdownMenu, DropdownMenuButton, Icon, Tooltip } from 'react-components';
import { c } from 'ttag';

import ToolbarDropdown from './ToolbarDropdown';
import { Element } from '../../models/element';
import { isUnread, isStarred } from '../../helpers/elements';

interface Props {
    labelID: string;
    loading?: boolean;
    disabled?: boolean;
    elements: Element[];
    selectedIDs: string[];
    onCheck: (IDs: string[], checked: boolean, replace: boolean) => void;
}

const SelectAll = ({ labelID, loading, disabled, elements, selectedIDs, onCheck }: Props) => {
    const checked = elements.length === selectedIDs.length;

    const handleAll = (checked: boolean) => () =>
        onCheck(
            elements.map(({ ID = '' }) => ID),
            checked,
            true
        );

    const handleRead = (read: boolean) => () =>
        onCheck(
            elements.filter((element) => read === !isUnread(element, labelID)).map(({ ID = '' }) => ID),
            true,
            true
        );

    const handleStarred = (starred: boolean) => () =>
        onCheck(
            elements.filter((element) => starred === isStarred(element)).map(({ ID = '' }) => ID),
            true,
            true
        );

    return (
        <>
            <Tooltip className="flex ml0-5 pl1" title={c('Action').t`Select messages`}>
                <Checkbox
                    className="pm-select-all"
                    checked={checked}
                    id="idSelectAll"
                    disabled={disabled}
                    loading={loading}
                    onChange={({ target }) => handleAll(target.checked)()}
                >
                    <span className="sr-only">{c('Action').t`Select messages`}</span>
                </Checkbox>
            </Tooltip>
            <ToolbarDropdown disabled={disabled} loading={loading} title={c('Title').t`More selections`} content="">
                {() => (
                    <DropdownMenu>
                        <DropdownMenuButton className="alignleft" onClick={handleAll(true)} data-cy="selectall">
                            <Icon name="selectall" className="mr0-5" />
                            {c('Action').t`Select All`}
                        </DropdownMenuButton>
                        <DropdownMenuButton className="alignleft" onClick={handleRead(true)} data-cy="allread">
                            <Icon name="read" className="mr0-5" />
                            {c('Action').t`All Read`}
                        </DropdownMenuButton>
                        <DropdownMenuButton className="alignleft" onClick={handleRead(false)} data-cy="allunread">
                            <Icon name="unread" className="mr0-5" />
                            {c('Action').t`All Unread`}
                        </DropdownMenuButton>
                        <DropdownMenuButton className="alignleft" onClick={handleStarred(true)} data-cy="allstarred">
                            <Icon name="starfull" className="mr0-5" />
                            {c('Action').t`All Starred`}
                        </DropdownMenuButton>
                        <DropdownMenuButton className="alignleft" onClick={handleStarred(false)} data-cy="allunstarred">
                            <Icon name="star" className="mr0-5" />
                            {c('Action').t`All Unstarred`}
                        </DropdownMenuButton>
                    </DropdownMenu>
                )}
            </ToolbarDropdown>
        </>
    );
};

export default SelectAll;
