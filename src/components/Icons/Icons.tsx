type IconProps = {
  className?: string;
};

const defaultAttrs = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const;

const strokeAttrs = {
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const IconChevronRight = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M6 3.3 10.7 8 6 12.7" {...strokeAttrs} />
  </svg>
);

export const IconChevronLeft = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M10 3.3 5.3 8 10 12.7" {...strokeAttrs} />
  </svg>
);

export const IconChevronUp = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M3.3 10 8 5.3 12.7 10" {...strokeAttrs} />
  </svg>
);

export const IconChevronDown = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M3.3 6 8 10.7 12.7 6" {...strokeAttrs} />
  </svg>
);

const HEART_PATH =
  'M8 13.9 7 13C3.6 9.8 1.3 7.8 1.3 5.3 1.3 3.3 2.9 1.7 4.9 1.7 6 1.7 7.1 ' +
  '2.2 7.8 3.1L8 3.3 8.2 3.1C8.9 2.2 10 1.7 11.1 1.7 13.1 1.7 14.7 3.3 ' +
  '14.7 5.3 14.7 7.8 12.4 9.8 9 13L8 13.9Z';

export const IconHeart = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path
      d={HEART_PATH}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </svg>
);

export const IconHeartFilled = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d={HEART_PATH} fill="currentColor" />
  </svg>
);

const CART_PATH =
  'M2.9 5.3h10.2l-.5 7.4a1.6 1.6 0 0 1-1.6 1.6H5a1.6 1.6 0 0 ' +
  '1-1.6-1.6l-.5-7.4Z';

export const IconCart = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M5.3 5.3V4a2.7 2.7 0 0 1 5.4 0v1.3" {...strokeAttrs} />
    <path d={CART_PATH} {...strokeAttrs} />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="m4 4 8 8M12 4l-8 8" {...strokeAttrs} />
  </svg>
);

export const IconMenu = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M2.7 4.7h10.6M2.7 8h10.6M2.7 11.3h10.6" {...strokeAttrs} />
  </svg>
);

const HOME_PATH =
  'M2.7 6.7 8 2.3l5.3 4.4v6a1 1 0 0 1-1 1H9.7V11a1.7 1.7 0 0 ' +
  '0-3.4 0v2.7H3.7a1 1 0 0 1-1-1v-6Z';

export const IconHome = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d={HOME_PATH} {...strokeAttrs} />
  </svg>
);

export const IconPlus = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M8 3.3v9.4M3.3 8h9.4" {...strokeAttrs} />
  </svg>
);

export const IconMinus = ({ className }: IconProps) => (
  <svg className={className} {...defaultAttrs}>
    <path d="M3.3 8h9.4" {...strokeAttrs} />
  </svg>
);
