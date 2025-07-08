import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  FileText,
  User,
} from 'lucide-react';

const historyGroups = [
  {
    id: 1,
    entries: [
      {
        id: 1,
        action: 'Customer Linked',
        value: '605',
        actionBy: 'John Smith',
        timestamp: '2025-03-27 09:30 AM',
        type: '',
        icon: User,
      },
      {
        id: 2,
        action: 'Invoice Created',
        value: '725',
        actionBy: 'Sarah Johnson',
        timestamp: '2025-03-27 10:15 AM',
        type: '',
        icon: FileText,
      },
      {
        id: 3,
        action: 'Payment Received',
        value: '3000',
        actionBy: 'Mike Wilson',
        timestamp: '2025-03-27 11:45 AM',
        type: 'action',
        icon: CreditCard,
      },
      {
        id: 4,
        action: 'Status Changed',
        value: 'Partial',
        actionBy: 'Lisa Davis',
        timestamp: '2025-03-27 12:30 PM',
        type: 'payment',
        icon: AlertCircle,
      },
      // {
      //   id: 5,
      //   action: "Payment Remaining",
      //   value: "$2,275",
      //   type: "payment",
      //   icon: DollarSign,
      // },
    ],
  },
  {
    id: 2,
    entries: [
      {
        id: 3,
        action: 'Payment Received',
        value: '3000',
        actionBy: 'Mike Wilson',
        timestamp: '2025-03-29 11:45 AM',
        type: 'action',
        icon: CreditCard,
      },
      {
        id: 4,
        action: 'Status Changed',
        value: 'Full Paid',
        actionBy: 'Lisa Davis',
        timestamp: '2025-03-29 12:30 PM',
        type: 'payment',
        icon: AlertCircle,
      },
      // {
      //   id: 5,
      //   action: "Payment Remaining",
      //   value: "$0",
      //   type: "payment",
      //   icon: DollarSign,
      // },
    ],
  },
];

const finalEntry = {
  id: 6,
  action: 'Gate Pass Generated',
  value: 'GP-2024-0156',
  actionBy: 'System Auto',
  timestamp: '2025-03-30 11:00 AM',
  type: 'final',
  icon: CheckCircle2,
};

export { finalEntry, historyGroups };
