const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const UserIcon = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>);
export const SearchIcon = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>);
export const BagIcon = (p) => (<svg {...base} {...p}><path d="M5 8h14l-1 13H6L5 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>);
export const ChevronLeft = (p) => (<svg {...base} {...p}><path d="M15 5l-7 7 7 7" /></svg>);
export const ChevronRight = (p) => (<svg {...base} {...p}><path d="M9 5l7 7-7 7" /></svg>);
export const MenuIcon = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CloseIcon = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const CheckIcon = (p) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const ShieldIcon = (p) => (<svg {...base} {...p}><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z" /><path d="M8.5 12l2.5 2.5L15.5 10" /></svg>);
export const WrenchIcon = (p) => (<svg {...base} {...p}><path d="M14.5 6.5a4 4 0 005 5l-9.7 9.7a2 2 0 01-2.8-2.8L16.7 8.7" /><path d="M14 3.5a4 4 0 015.5 5.5" /></svg>);
export const ExchangeIcon = (p) => (<svg {...base} {...p}><path d="M4 9V7a2 2 0 012-2h13M16 2l3 3-3 3" /><path d="M20 15v2a2 2 0 01-2 2H5M8 22l-3-3 3-3" /></svg>);
export const TruckIcon = (p) => (<svg {...base} {...p}><path d="M2 6h11v10H2zM13 9h5l3 3v4h-8" /><circle cx="7" cy="17.5" r="2" fill="#fff" /><circle cx="17" cy="17.5" r="2" fill="#fff" /></svg>);
export const AccessIcon = (p) => (<svg {...base} strokeWidth={1.8} {...p}><circle cx="12" cy="4.5" r="1.8" /><path d="M5 8.5l7 1.5 7-1.5M12 10v5M9 21l3-6 3 6" /></svg>);

export const icons = { shield: ShieldIcon, wrench: WrenchIcon, exchange: ExchangeIcon, truck: TruckIcon };
