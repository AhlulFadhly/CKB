import {
  Database,
  Users,
  LifeBuoy,
  GraduationCap,
  CreditCard,
  Bot,
  CalendarCheck2,
  FileSpreadsheet,
  LucideIcon,
} from 'lucide-react';

export interface PortalAppItem {
  name: string;
  icon: LucideIcon;
  desc: string;
  route: string;
}

export const portalApps: PortalAppItem[] = [
  { name: 'ERP System', icon: Database, desc: 'Enterprise Resource Planning', route: '/' },
  { name: 'HRIS System', icon: Users, desc: 'Human Resource Information', route: '/' },
  { name: 'Helpdesk Ticket', icon: LifeBuoy, desc: 'IT & Operational Support', route: '/' },
  { name: 'Learning Center', icon: GraduationCap, desc: 'Knowledge & Documents', route: '/learning-center' },
  { name: 'Cash Advance', icon: CreditCard, desc: 'Operational Finance Claims', route: '/' },
  { name: 'Chatbot', icon: Bot, desc: 'Smart Assistant AI', route: '/chatbot' },
  { name: 'FASS Web Booking', icon: CalendarCheck2, desc: 'Fleet & Cargo Booking', route: '/' },
  { name: 'Report Manager', icon: FileSpreadsheet, desc: 'Analytics & Management Reports', route: '/' },
];
