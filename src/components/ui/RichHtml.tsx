interface Props {
  html?: string | null;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function RichHtml({ html, className = '', as: Tag = 'div' }: Props) {
  if (!html?.trim()) return null;
  return (
    <Tag
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
