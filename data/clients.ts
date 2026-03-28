export interface Client {
  id: string
  name: string
  industry?: string
}

export const CLIENTS: Client[] = [
  { id: 'ayala', name: 'Ayala Corporation', industry: 'Diversified Conglomerate' },
  { id: 'sm-prime', name: 'SM Prime Holdings', industry: 'Real Estate & Retail' },
  { id: 'dpwh', name: 'Department of Public Works and Highways', industry: 'Government' },
  { id: 'jg-summit', name: 'JG Summit Holdings', industry: 'Diversified Conglomerate' },
  { id: 'megaworld', name: 'Megaworld Corporation', industry: 'Real Estate' },
  { id: 'aboitiz', name: 'Aboitiz Equity Ventures', industry: 'Diversified Conglomerate' },
  { id: 'robinsons', name: 'Robinsons Land Corporation', industry: 'Real Estate & Retail' },
  { id: 'filinvest', name: 'Filinvest Land', industry: 'Real Estate' },
  { id: 'dmci', name: 'DMCI Holdings', industry: 'Construction & Real Estate' },
  { id: 'phirst-park', name: 'Phirst Park Homes', industry: 'Residential Development' },
  { id: 'auctane', name: 'Auctane', industry: 'E-Commerce Logistics' },
  { id: 'bok', name: 'Bank of the Philippines Islands', industry: 'Banking & Finance' },
]
