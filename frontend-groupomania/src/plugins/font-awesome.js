import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  fas
} from "@fortawesome/free-solid-svg-icons";

import {
  far
} from "@fortawesome/free-regular-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, fas, far);

export { FontAwesomeIcon };