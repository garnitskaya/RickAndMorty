export interface SinglePageProps<T> {
  data: T,
  goBack: () => void,
  nextData: () => void
}