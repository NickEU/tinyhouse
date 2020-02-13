import * as bookings from "./bookings-methods";
import * as listings from "./listings-methods";

const methods = Object.assign({}, bookings, listings);
export default methods;
