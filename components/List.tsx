// List.tsx
export const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="space-y-2">{children}</ul>
);

// ListItem.tsx
export const ListItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <li className={`flex justify-between items-center p-2 border-b ${className}`}>
    {children}
  </li>
);
