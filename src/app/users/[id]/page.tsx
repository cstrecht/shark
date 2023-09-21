//5
type PageProps = { params: { id: string } };

export default function User({ params: { id } }: PageProps) {
  return <>User profile {id}</>;
}
