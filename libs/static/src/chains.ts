import { NAMES } from './names'
import type { ChainProperties, Config, Option, Prefix } from './types'

export const toChainProperty = (
  ss58Format: number,
  tokenDecimals: number,
  tokenSymbol: string,
  blockExplorer?: string
): ChainProperties => {
  return {
    ss58Format,
    tokenDecimals,
    tokenSymbol,
    blockExplorer,
  }
}

const DEFAULT_CHAIN_PROPERTIES: ChainProperties = toChainProperty(
  2,
  12,
  'KSM',
  'https://kusama.subscan.io/'
)

export const CHAINS: Config<ChainProperties> = {
  rmrk: DEFAULT_CHAIN_PROPERTIES,
  ksm: DEFAULT_CHAIN_PROPERTIES,
  bsx: toChainProperty(10_041, 12, 'BSX', 'https://basilisk.subscan.io/'),
  snek: toChainProperty(
    10_041,
    12,
    'BSX',
    'https://calamar.play.hydration.cloud/rococo%20basilisk/search?query='
  ),
  movr: toChainProperty(1285, 18, 'MOVR', 'https://moonriver.subscan.io/'),
  glmr: toChainProperty(1284, 18, 'GLMR', 'https://moonbeam.subscan.io/'),
  ahk: toChainProperty(2, 12, 'KSM', 'https://statemine.subscan.io/'),
  dot: toChainProperty(0, 10, 'DOT', 'https://polkadot.subscan.io/'),
  ahp: toChainProperty(0, 10, 'DOT', 'https://statemint.subscan.io/'),
}

export const DEFAULT_PREFIX: Prefix = 'ksm'

export const chainPrefixes: Prefix[] = [
  'bsx',
  'rmrk',
  'snek',
  'movr',
  'glmr',
  'ksm',
  'ahk',
  'dot',
  'ahp',
]
export const chainPrefixesMap = chainPrefixes.reduce(
  (acc: Partial<Record<Prefix, Prefix>>, prefix: Prefix) => ({
    ...acc,
    [prefix]: prefix,
  }),
  {}
) as Record<Prefix, Prefix>

export const chainInfo: Record<Prefix, string> = {
  bsx: 'basilisk',
  rmrk: 'kusama',
  snek: 'snek',
  movr: 'moonriver',
  glmr: 'moonbeam',
  ksm: 'rmrk',
  ahk: 'statemine',
  dot: 'polkadot',
  ahp: 'statemint',
}

export const chainNames: Record<Prefix, string> = {
  bsx: 'Basilisk',
  rmrk: 'Kusama',
  snek: 'Basilisk-testnet',
  movr: 'Moonriver',
  glmr: 'Moonbeam',
  ksm: 'Kusama',
  ahk: 'Kusama AssetHub',
  dot: 'Polkadot',
  ahp: 'Polkadot AssetHub',
}

export const chainList = (): Option[] => {
  return chainPrefixes.map((prefix) => ({
    info: chainInfo[prefix],
    text: NAMES[prefix],
    value: prefix,
  }))
}
