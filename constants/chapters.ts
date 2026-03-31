export interface Chapter {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  variant?: 'standard' | 'wide' | 'accent';
  hideIcon?: boolean;
}

export interface Unit {
  id: string;
  title: string;
  chapters: Chapter[];
  columns: 2 | 3;
}

export const UNITS: Unit[] = [
  {
    id: 'unit1',
    title: 'Unit 1: Computational Thinking & Programming',
    columns: 2,
    chapters: [
      { id: '1', title: 'Revision of Python Basics', icon: 'menu-book' },
      { id: '2', title: 'Functions', icon: 'menu-book' },
      { id: '3', title: 'File Handling', icon: 'menu-book' },
      { id: '4', title: 'Recursion', icon: 'menu-book' },
      { id: '5', title: 'Data Structures: Lists, Stack, Queue', variant: 'wide', icon: 'menu-book' },
    ],
  },
  {
    id: 'unit2',
    title: 'Unit 2: Computer Networks',
    columns: 2,
    chapters: [
      { id: '6', title: 'Networking Fundamentals', icon: 'menu-book' },
      { id: '7', title: 'Protocols & Addresses', icon: 'menu-book' },
    ],
  },
  {
    id: 'unit3',
    title: 'Unit 3: Database Management',
    columns: 3,
    chapters: [
      { id: '8', title: 'Database Concepts', hideIcon: true },
      { id: '9', title: 'SQL Mastery', hideIcon: true },
      { id: '10', title: 'Python-MySQL Interface', hideIcon: true },
    ],
  },
  {
    id: 'unit4',
    title: 'Unit 4: Boolean Logic',
    columns: 2, // Only one card but standard styling
    chapters: [
      { id: '11', title: 'Boolean Algebra & Truth Tables', variant: 'accent' },
    ],
  },
];

export const TOPICS = [
  'List Comprehension',
  'Dunder Methods',
  'Pandas Intro',
  'Exception Handling',
];
