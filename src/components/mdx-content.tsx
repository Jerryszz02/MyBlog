import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";

    if (href.startsWith("/")) {
      return <Link {...props} href={href} />;
    }

    return <a {...props} rel="noreferrer" target="_blank" />;
  },
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="mdx">
      <MDXRemote
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight],
          },
        }}
        source={source}
      />
    </div>
  );
}
