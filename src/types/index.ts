export type User = {
  id: string;
  name: string;
  phone: string;
  role: 'patient' | 'doctor';
  aadhaar?: string;
  specialization?: string;
  createdAt?: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  doctorId?: string;
  patientName: string;
  doctorName?: string;
  specialization?: string;
  date?: string;
  time?: string;
  status: 'ongoing' | 'scheduled' | 'completed' | string;
  symptoms?: string;
  roomId?: string;
  prescription?: string;
  notes?: string;
};
