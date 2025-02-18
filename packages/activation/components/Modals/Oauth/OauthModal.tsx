import EasySwitchOauthModal from '@proton/activation/_legacy/EasySwitchOauthModal';
import {
    EASY_SWITCH_SOURCE,
    EasySwitchFeatureFlag,
    ImportProvider,
    ImportType,
    OAUTH_PROVIDER,
} from '@proton/activation/interface';
import {
    selectOauthDraftProducts,
    selectOauthDraftProvider,
} from '@proton/activation/logic/draft/oauthDraft/oauthDraft.selector';
import { useEasySwitchSelector } from '@proton/activation/logic/store';
import { FeatureCode } from '@proton/components/containers/features';
import { useAddresses, useFeature } from '@proton/components/hooks';
import isTruthy from '@proton/utils/isTruthy';
import noop from '@proton/utils/noop';

interface Props {
    onClose: () => void;
}

const OauthModal = ({ onClose }: Props) => {
    const provider = useEasySwitchSelector(selectOauthDraftProvider);
    const products = useEasySwitchSelector(selectOauthDraftProducts);
    const [addresses, loadingAddresses] = useAddresses();
    const easySwitchFeature = useFeature<EasySwitchFeatureFlag>(FeatureCode.EasySwitch);
    const easySwitchFeatureValue = easySwitchFeature.feature?.Value;
    const isLoading = loadingAddresses || easySwitchFeature.loading;

    if (isLoading) {
        return null;
    }

    if (provider === ImportProvider.GOOGLE) {
        const checkedTypes = [
            easySwitchFeatureValue?.GoogleMail && products?.includes(ImportType.MAIL) && ImportType.MAIL,
            easySwitchFeatureValue?.GoogleCalendar && products?.includes(ImportType.CALENDAR) && ImportType.CALENDAR,
            easySwitchFeatureValue?.GoogleContacts && products?.includes(ImportType.CONTACTS) && ImportType.CONTACTS,
        ].filter(isTruthy);

        return (
            <EasySwitchOauthModal
                source={EASY_SWITCH_SOURCE.EASY_SWITCH_SETTINGS}
                provider={OAUTH_PROVIDER.GOOGLE}
                addresses={addresses}
                defaultCheckedTypes={checkedTypes}
                featureMap={easySwitchFeatureValue}
                onClose={onClose}
                onExit={noop}
            />
        );
    }

    if (provider === ImportProvider.OUTLOOK) {
        const checkedTypes = [
            easySwitchFeatureValue?.OutlookMail && products?.includes(ImportType.MAIL) && ImportType.MAIL,
            easySwitchFeatureValue?.OutlookCalendar && products?.includes(ImportType.CALENDAR) && ImportType.CALENDAR,
            easySwitchFeatureValue?.OutlookContacts && products?.includes(ImportType.CONTACTS) && ImportType.CONTACTS,
        ].filter(isTruthy);

        return (
            <EasySwitchOauthModal
                source={EASY_SWITCH_SOURCE.EASY_SWITCH_SETTINGS}
                addresses={addresses}
                defaultCheckedTypes={checkedTypes}
                featureMap={easySwitchFeatureValue}
                provider={OAUTH_PROVIDER.OUTLOOK}
                onClose={onClose}
                onExit={noop}
            />
        );
    }

    return null;
};

export default OauthModal;
