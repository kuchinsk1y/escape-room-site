export interface Tab {
  id: string
  label: string
  icon: string
}

export interface FilterTabsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}
