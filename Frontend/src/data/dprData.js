/**
 * PragatiPath — DPR Inbox Data Store
 * Structured mock data representing DPR submissions, AI extractions, and attachments.
 */

export const dprContextInfo = {
  projectCode: 'PS 26122',
  projectName: 'Pump P-101',
  unit: 'Unit 2',
  reportDate: '10 Sept 2026',
  location: 'Site A · Main Area',
};

export const recentDprSubmissions = [
  {
    id: 'DPR-2025-001',
    title: 'Text Report',
    type: 'text',
    code: 'DPR-2025-001',
    date: '10 Sep 2026',
    time: '09:45 AM',
    status: 'Extracted',
    statusVariant: 'success',
    icon: 'text',
    content: 'Pump P-101 installation completed in Unit 2. Testing work ongoing.',
    extraction: {
      activity: 'Pump P-101 installation',
      unit: 'Unit 2',
      status: 'Completed',
      progress: 100,
      date: '2026-09-10',
      source: 'Text',
    },
    confidence: 92,
  },
  {
    id: 'DPR-2025-000',
    title: 'Voice Note',
    type: 'voice',
    code: 'DPR-2025-000',
    date: '9 Sep 2026',
    time: '06:20 PM',
    status: 'Extracted',
    statusVariant: 'success',
    icon: 'voice',
    content: 'Audio recorded by Site Engineer Raghav regarding alignment and foundation bolts inspection.',
    extraction: {
      activity: 'Foundation Bolt Inspection & Alignment',
      unit: 'Unit 2',
      status: 'Verified',
      progress: 90,
      date: '2026-09-09',
      source: 'Voice Note',
    },
    confidence: 88,
  },
  {
    id: 'DPR-2025-003',
    title: 'Excel File',
    type: 'excel',
    code: 'DPR-2025-003',
    date: '8 Sep 2026',
    time: '04:10 PM',
    status: 'Pending',
    statusVariant: 'warning',
    icon: 'excel',
    content: 'Uploaded daily log spreadsheet with material deliveries and manpower counts.',
    extraction: {
      activity: 'Material Log & Manpower Timesheet',
      unit: 'Unit 2 & 3',
      status: 'Pending Processing',
      progress: 0,
      date: '2026-09-08',
      source: 'Excel File',
    },
    confidence: 65,
  },
  {
    id: 'DPR-2025-002',
    title: 'PDF Document',
    type: 'pdf',
    code: 'DPR-2025-002',
    date: '8 Sep 2026',
    time: '11:30 AM',
    status: 'Extracted',
    statusVariant: 'success',
    icon: 'pdf',
    content: 'Quality inspection certificate signed by external auditor for pressure testing.',
    extraction: {
      activity: 'Hydrostatic Pressure Testing',
      unit: 'Unit 2',
      status: 'Completed',
      progress: 100,
      date: '2026-09-08',
      source: 'PDF Document',
    },
    confidence: 95,
  },
  {
    id: 'DPR-2025-004',
    title: 'Photos',
    type: 'photos',
    code: 'DPR-2025-004',
    date: '7 Sep 2026',
    time: '03:15 PM',
    status: 'Pending',
    statusVariant: 'warning',
    icon: 'photos',
    content: 'Site photos showing cable tray routing and pipe flanges assembly.',
    extraction: {
      activity: 'Cable Tray Routing & Flange Assembly',
      unit: 'Unit 2',
      status: 'Image OCR Pending',
      progress: 45,
      date: '2026-09-07',
      source: 'Site Photos',
    },
    confidence: 72,
  },
];

export const defaultExtractionPreview = {
  activity: 'Pump P-101 installation',
  unit: 'Unit 2',
  status: 'Completed',
  progress: 100,
  date: '2026-09-10',
  source: 'Text',
};

export const dprSupportedTips = [
  'You can write in English, Hindi or Hinglish.',
  'For photos, please upload clear images with site context.',
  'Make sure to include key details like activity, location, unit and status.',
];

export const recentDprAttachments = [
  {
    id: 'att-1',
    name: 'pump_pic.jpg',
    size: '2.4 MB',
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'att-2',
    name: 'DPR_Report.xlsx',
    size: '245 KB',
    type: 'excel',
    icon: 'excel',
  },
  {
    id: 'att-3',
    name: 'Site_Area.pdf',
    size: '1.2 MB',
    type: 'pdf',
    icon: 'pdf',
  },
];
