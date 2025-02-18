import { c } from 'ttag';

import { Button } from '@proton/atoms';
import { Icon, Tooltip, classnames } from '@proton/components';
import { ICAL_ATTENDEE_ROLE } from '@proton/shared/lib/calendar/constants';
import { getContactDisplayNameEmail } from '@proton/shared/lib/contacts/contactEmail';
import { canonicalizeEmail } from '@proton/shared/lib/helpers/email';
import { AttendeeModel } from '@proton/shared/lib/interfaces/calendar';
import { ContactEmail } from '@proton/shared/lib/interfaces/contacts';
import { SimpleMap } from '@proton/shared/lib/interfaces/utils';
import clsx from '@proton/utils/clsx';

interface Props {
    attendee: AttendeeModel;
    contactEmailsMap: SimpleMap<ContactEmail>;
    onToggleOptional: (attendee: AttendeeModel) => void;
    onDelete: (attendee: AttendeeModel) => void;
}

const ParticipantRow = ({ attendee, contactEmailsMap, onToggleOptional, onDelete }: Props) => {
    const { email: attendeeEmail, role } = attendee;
    const isOptional = role === ICAL_ATTENDEE_ROLE.OPTIONAL;
    const { Name: contactName, Email: contactEmail } = contactEmailsMap[canonicalizeEmail(attendeeEmail)] || {};
    const email = contactEmail || attendeeEmail;
    const { nameEmail, displayOnlyEmail } = getContactDisplayNameEmail({ name: contactName, email });

    const optionalText = isOptional
        ? c('Action').t`Make this participant required`
        : c('Action').t`Make this participant optional`;

    return (
        <div key={email} className={classnames(['address-item flex mb0-25 pl0-5'])}>
            <div className="flex flex-item-fluid p0-5" title={nameEmail}>
                <div className={clsx(['text-ellipsis', displayOnlyEmail && 'max-w100'])}>{nameEmail}</div>
                {isOptional ? <span className="color-weak w100">{c('Label').t`Optional`}</span> : null}
            </div>
            <Tooltip title={optionalText}>
                <Button
                    icon
                    shape="ghost"
                    type="button"
                    className="flex flex-item-noshrink"
                    onClick={() => onToggleOptional(attendee)}
                >
                    <Icon name={isOptional ? 'user' : 'user-filled'} alt={c('Action').t`Remove this participant`} />
                </Button>
            </Tooltip>
            <Tooltip title={c('Action').t`Remove this participant`}>
                <Button icon shape="ghost" className="flex flex-item-noshrink" onClick={() => onDelete(attendee)}>
                    <Icon name="trash" alt={c('Action').t`Remove this participant`} />
                </Button>
            </Tooltip>
        </div>
    );
};

export default ParticipantRow;
