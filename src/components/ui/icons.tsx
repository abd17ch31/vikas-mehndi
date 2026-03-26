type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  instagram: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.41h5.64c-.11.85-.7 2.13-2.02 2.99l-.02.11 2.76 2.14.19.02c1.75-1.62 2.75-4 2.75-6.87Z"
        fill="currentColor"
      />
      <path
        d="M12 22c2.76 0 5.08-.91 6.77-2.47l-3.23-2.5c-.86.6-2.01 1.02-3.54 1.02-2.7 0-4.99-1.78-5.81-4.24l-.1.01-2.87 2.22-.03.1C4.88 19.6 8.15 22 12 22Z"
        fill="currentColor"
      />
      <path
        d="M6.19 13.81A5.98 5.98 0 0 1 5.86 12c0-.63.12-1.24.32-1.81l-.01-.12-2.9-2.25-.09.04A10 10 0 0 0 2 12c0 1.61.38 3.14 1.08 4.5l3.11-2.69Z"
        fill="currentColor"
      />
      <path
        d="M12 5.95c1.93 0 3.23.83 3.97 1.53l2.9-2.83C17.07 2.98 14.76 2 12 2 8.15 2 4.88 4.4 3.18 7.86l3 2.33c.83-2.46 3.12-4.24 5.82-4.24Z"
        fill="currentColor"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      {...props}
      height="23"
      viewBox="0 0 1200 1227"
      width="23"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
  ),
};
