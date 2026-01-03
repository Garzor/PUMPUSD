// Mock data for USDPUMP

export interface Token {
  id: string;
  name: string;
  symbol: string;
  mint: string;
  status: 'bonding' | 'graduated';
  price: number;
  liquidity: number;
  change24h: number;
  flywheelActive: boolean;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  action: 'capture' | 'apply' | 'burn' | 'lp';
  amount: number;
  txHash: string;
  tokenSymbol: string;
}

export interface ProtocolMetrics {
  tokensManaged: number;
  graduated: number;
  feesCaptured: number;
  momentumApplied: number;
}

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'USD1 Alpha',
    symbol: 'USD1A',
    mint: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    status: 'graduated',
    price: 0.0234,
    liquidity: 125000,
    change24h: 12.5,
    flywheelActive: true,
  },
  {
    id: '2',
    name: 'USD1 Beta',
    symbol: 'USD1B',
    mint: '3Kj8NHhDgYCTfFEzBLvZj9FJJKPbDZTEuKdRxU9vNQzP',
    status: 'bonding',
    price: 0.00089,
    liquidity: 45000,
    change24h: -3.2,
    flywheelActive: true,
  },
  {
    id: '3',
    name: 'USD1 Delta',
    symbol: 'USD1D',
    mint: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    status: 'bonding',
    price: 0.00156,
    liquidity: 78000,
    change24h: 8.7,
    flywheelActive: false,
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    action: 'capture',
    amount: 0.5,
    txHash: '4zN8...kL9m',
    tokenSymbol: 'USD1A',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    action: 'apply',
    amount: 0.35,
    txHash: '7xR2...pQ4n',
    tokenSymbol: 'USD1A',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    action: 'burn',
    amount: 0.1,
    txHash: '2mK9...vT6w',
    tokenSymbol: 'USD1B',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    action: 'lp',
    amount: 0.25,
    txHash: '8jH3...xN1r',
    tokenSymbol: 'USD1A',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    action: 'capture',
    amount: 0.42,
    txHash: '5tY7...bM2s',
    tokenSymbol: 'USD1D',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    action: 'apply',
    amount: 0.28,
    txHash: '1cZ4...hW8p',
    tokenSymbol: 'USD1B',
  },
];

export const mockMetrics: ProtocolMetrics = {
  tokensManaged: 2,
  graduated: 0,
  feesCaptured: 0.52,
  momentumApplied: 0.40,
};

export const faqData = [
  {
    question: 'What is USDPUMP?',
    answer: 'USDPUMP is a pump.fun-native USD1 launcher with flywheel-based liquidity controls.',
  },
  {
    question: 'How does the capture mechanism work?',
    answer: 'The engine monitors specified on-chain activities and captures a configurable percentage of fees. These captured funds are then converted according to your flywheel mode settings and applied to support token momentum.',
  },
  {
    question: 'What is the difference between Bonding and Graduated phases?',
    answer: 'During the Bonding phase, the flywheel focuses on momentum building and price stability. Once graduated, the focus shifts to liquidity reinforcement and sustained buy pressure to maintain long-term strength.',
  },
  {
    question: 'Is the protocol non-custodial?',
    answer: 'Yes. The protocol operates entirely through wallet connections. You never share private keys, and all operations are executed through signed transactions that you approve.',
  },
  {
    question: 'Can I customize the flywheel behavior?',
    answer: 'Absolutely. You can choose from preset modes (Balanced, Buyback-heavy, Liquidity-heavy, Burn-heavy) or fine-tune individual parameters like buy pressure ratios, burn intensity, and cycle frequency.',
  },
];

export const roadmapData = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed' as const,
    items: [
      'Core flywheel engine development',
      'Dashboard interface launch',
      'Basic preset modes',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Enhancement',
    status: 'active' as const,
    items: [
      'Advanced analytics dashboard',
      'Custom automation rules',
      'Multi-token portfolio management',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming' as const,
    items: [
      'Third-party integrations',
      'Public API access',
      'Ecosystem partnerships',
    ],
  },
];
