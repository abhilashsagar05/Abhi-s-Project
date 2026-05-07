import { VIOLATION_TYPES, CAMERA_STATUS, CHALLAN_STATUS, INDIAN_CITIES } from "./constants";

export interface Camera {
  id: string;
  name: string;
  location: string;
  city: string;
  status: keyof typeof CAMERA_STATUS;
  lat: number;
  lng: number;
  lastActive: string;
}

export interface Violation {
  id: string;
  type: keyof typeof VIOLATION_TYPES;
  cameraId: string;
  plateNumber: string;
  confidence: number;
  timestamp: string;
  status: keyof typeof CHALLAN_STATUS;
  evidenceUrl: string;
  location: string;
}

export const MOCK_CAMERAS: Camera[] = [
  {
    id: "CAM-001",
    name: "Connaught Place North",
    location: "Outer Circle, CP",
    city: "Delhi",
    status: "ONLINE",
    lat: 28.6328,
    lng: 77.2197,
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-002",
    name: "Marine Drive Flyover",
    location: "Near Air India Building",
    city: "Mumbai",
    status: "ONLINE",
    lat: 18.9218,
    lng: 72.8248,
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-003",
    name: "Silk Board Junction",
    location: "Hosur Road",
    city: "Bangalore",
    status: "OFFLINE",
    lat: 12.9176,
    lng: 77.6233,
    lastActive: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "CAM-004",
    name: "Anna Salai Main",
    location: "Near Teynampet",
    city: "Chennai",
    status: "ONLINE",
    lat: 13.0405,
    lng: 80.2448,
    lastActive: new Date().toISOString(),
  },
  {
    id: "CAM-005",
    name: "Cyber Towers Gate",
    location: "Hitech City",
    city: "Hyderabad",
    status: "MAINTENANCE",
    lat: 17.4504,
    lng: 78.3808,
    lastActive: new Date().toISOString(),
  },
];

export const MOCK_VIOLATIONS: Violation[] = [
  {
    id: "VIO-8821",
    type: "NO_HELMET",
    cameraId: "CAM-001",
    plateNumber: "DL 01 AB 1234",
    confidence: 0.98,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: "PENDING",
    evidenceUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    location: "Connaught Place, Delhi",
  },
  {
    id: "VIO-8822",
    type: "RED_SIGNAL",
    cameraId: "CAM-002",
    plateNumber: "MH 02 CD 5678",
    confidence: 0.95,
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    status: "PENDING",
    evidenceUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    location: "Marine Drive, Mumbai",
  },
  {
    id: "VIO-8823",
    type: "SPEEDING",
    cameraId: "CAM-004",
    plateNumber: "TN 07 EF 9012",
    confidence: 0.92,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: "PAID",
    evidenceUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    location: "Anna Salai, Chennai",
  },
  {
    id: "VIO-8824",
    type: "TRIPLE_RIDING",
    cameraId: "CAM-001",
    plateNumber: "DL 10 XY 4455",
    confidence: 0.89,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: "UNDER_REVIEW",
    evidenceUrl: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?w=800&q=80",
    location: "CP North, Delhi",
  },
];

export const MOCK_ANALYTICS = {
  violationsByDay: [
    { name: "Mon", count: 450 },
    { name: "Tue", count: 380 },
    { name: "Wed", count: 520 },
    { name: "Thu", count: 490 },
    { name: "Fri", count: 610 },
    { name: "Sat", count: 850 },
    { name: "Sun", count: 720 },
  ],
  violationTypes: [
    { name: "No Helmet", value: 40 },
    { name: "Red Signal", value: 25 },
    { name: "Speeding", value: 15 },
    { name: "Wrong Side", value: 10 },
    { name: "Other", value: 10 },
  ],
  revenueByMonth: [
    { name: "Jan", amount: 1250000 },
    { name: "Feb", amount: 1420000 },
    { name: "Mar", amount: 1180000 },
    { name: "Apr", amount: 1650000 },
    { name: "May", amount: 1890000 },
  ],
};
