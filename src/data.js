export const initialServices = [
  { id: "haircut", name: "Haircut", gu: "હેરકટ", minutes: 30, price: 150, active: true },
  { id: "beard", name: "Beard Trim", gu: "દાઢી ટ્રિમ", minutes: 15, price: 80, active: true },
  { id: "hairspa", name: "Hair Spa", gu: "હેર સ્પા", minutes: 45, price: 400, active: true },
  { id: "color", name: "Hair Colour", gu: "હેર કલર", minutes: 60, price: 800, active: true },
  { id: "facial", name: "Facial", gu: "ફેશિયલ", minutes: 40, price: 500, active: true },
  { id: "shave", name: "Clean Shave", gu: "ક્લીન શેવ", minutes: 20, price: 100, active: true }
];

export const initialBarbers = [
  { id: "ravi", name: "Ravi", role: "Senior Barber", status: "busy", active: true },
  { id: "amit", name: "Amit", role: "Stylist", status: "available", active: true },
  { id: "imran", name: "Imran", role: "Barber", status: "break", active: true }
];

export const demoQueue = [
  { id: 1, token: "S-1", name: "Kunal Patel", phone: "9876543210", services: ["haircut"], barber: "ravi", status: "in-chair", createdAt: Date.now() - 35*60000, startedAt: Date.now() - 12*60000 },
  { id: 2, token: "S-2", name: "Mihir Shah", phone: "9876543211", services: ["beard"], barber: "any", status: "waiting", createdAt: Date.now() - 22*60000 },
  { id: 3, token: "S-3", name: "Neha Desai", phone: "9876543212", services: ["hairspa"], barber: "amit", status: "waiting", createdAt: Date.now() - 17*60000 },
  { id: 4, token: "S-4", name: "Dev Mehta", phone: "9876543213", services: ["haircut","beard"], barber: "any", status: "waiting", createdAt: Date.now() - 10*60000 },
  { id: 5, token: "S-5", name: "Riya Joshi", phone: "9876543214", services: ["facial"], barber: "ravi", status: "waiting", createdAt: Date.now() - 5*60000 }
];
