export const VIOLATION_TYPES = {
  NO_HELMET: { label: "No Helmet", fine: 1000, color: "text-red-500" },
  TRIPLE_RIDING: { label: "Triple Riding", fine: 2000, color: "text-orange-500" },
  RED_SIGNAL: { label: "Red Signal Jump", fine: 5000, color: "text-rose-600" },
  NO_SEATBELT: { label: "No Seatbelt", fine: 1000, color: "text-amber-500" },
  MOBILE_PHONE: { label: "Mobile While Driving", fine: 5000, color: "text-purple-500" },
  WRONG_SIDE: { label: "Wrong Side Driving", fine: 5000, color: "text-pink-500" },
  SPEEDING: { label: "Over Speeding", fine: 2000, color: "text-yellow-500" },
} as const;

export const CAMERA_STATUS = {
  ONLINE: "Online",
  OFFLINE: "Offline",
  MAINTENANCE: "Maintenance",
} as const;

export const CHALLAN_STATUS = {
  PENDING: "Pending",
  PAID: "Paid",
  REJECTED: "Rejected",
  UNDER_REVIEW: "Under Review",
} as const;

export const ROLES = {
  SUPER_ADMIN: "Super Admin",
  TRAFFIC_ADMIN: "Traffic Admin",
  CAMERA_OPERATOR: "Camera Operator",
  ANALYST: "Analyst",
  CITIZEN: "Citizen",
} as const;

export const INDIAN_CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Surat",
  "Jaipur",
];
