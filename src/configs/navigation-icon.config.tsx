import {
    PiHouseLineDuotone,
    PiRocketDuotone,
    PiChatsTeardropBold,
    PiCalendarBlankBold,
    PiUsersBold,
    PiFolderBold,
    PiNutBold,
    PiHouseDuotone,
    PiFarmThin,
    PiCertificateBold,
    PiCertificateDuotone,
    PiCertificate,
    PiCheckCircleBold,
    PiFramerLogoDuotone,
    PiFarmBold,
    PiSupersetProperOfBold
} from 'react-icons/pi'
import { MdOutlineAutoAwesomeMosaic } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";




export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <MdOutlineAutoAwesomeMosaic />,
    singleMenu: <PiUsersBold />,
    plannerIcon: <PiCalendarBlankBold />,
    chatIcon: <PiChatsTeardropBold />,
    resouceIcon: <PiFolderBold />,
    projectsIcon: <PiRocketDuotone />,
    projectsMarket: <PiHouseDuotone />,
    projectsAgri: <PiFarmBold />,
    projectsCheck: <PiCheckCircleBold />,
    projectsSetting: <PiNutBold />,
    projectsSupport: <MdOutlineSupportAgent />,
    // collapseMenu: <PiArrowsInDuotone />,
    // groupSingleMenu: <PiBookOpenUserDuotone />,
    // groupCollapseMenu: <PiBookBookmarkDuotone />,
    // groupMenu: <PiAirplaneLandingBold />
}

export default navigationIcon
