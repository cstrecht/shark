//4
type PageProps = { params: { id: string } };

export default function EditPost({ params: { id } }: PageProps) {
  return <>edit your post here {id}</>;
}
