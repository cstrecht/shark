//3
type PageProps = { params: { id: string } };

export default function Post({ params: { id } }: PageProps) {
  return <>Post! {id}</>;
}
