export default function BlogPostPage(props) {
  return (
    <main>
      <h1>Blog Post</h1>
      {props.params.slug}
    </main>
  );
}
