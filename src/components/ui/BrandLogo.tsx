import React from 'react';

interface CompactLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const BrandEmblem: React.FC<{
  className?: string;
  decorative?: boolean;
  title?: string;
}> = ({
  className = 'w-10 h-10',
  decorative = true,
  title = 'Emblema Flacar Entregas',
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden={decorative ? 'true' : undefined}
      role={decorative ? undefined : 'img'}
    >
      {!decorative && <title>{title}</title>}
      <path
        d="M4 26h10M6 34h8M8 42h6"
        stroke="#FFC107"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M14 36c4-10 8-10 11-4" fill="#FFC107" />
      <path
        d="M22 24 Q 28 18 33 22 L 39 28 L 43 28 L 45 34"
        fill="none"
        stroke="#FF6B00"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="30" y="14" width="13" height="11" rx="2" fill="#FF6B00" />
      <circle cx="24" cy="42" r="6" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="2.5" />
      <circle cx="48" cy="42" r="6" fill="#FFFFFF" stroke="#FF6B00" strokeWidth="2.5" />
      <path d="M36 36 L30 42 L40 42 Z" fill="#FF6B00" />
      <circle cx="40" cy="11" r="4" fill="#FF6B00" />
    </svg>
  );
};

export const CompactLogo: React.FC<CompactLogoProps> = ({ size = 'md' }) => {
  const iconClass =
    size === 'sm'
      ? 'w-8 h-8 shrink-0'
      : size === 'lg'
      ? 'w-12 h-12 shrink-0'
      : 'w-10 h-10 shrink-0';

  const textClass =
    size === 'sm'
      ? 'text-base font-extrabold tracking-wide'
      : size === 'lg'
      ? 'text-2xl font-extrabold tracking-tight'
      : 'text-xl font-extrabold tracking-tight';

  const subClass =
    size === 'sm'
      ? 'text-[0.58rem] tracking-[0.25em]'
      : size === 'lg'
      ? 'text-[0.72rem] tracking-[0.3em]'
      : 'text-[0.65rem] tracking-[0.28em]';

  return (
    <span className="inline-flex items-center gap-3 text-white">
      <BrandEmblem className={iconClass} decorative />
      <span className="flex flex-col leading-none">
        <span className={`text-white ${textClass}`}>FLACAR</span>
        <span className={`font-bold text-brand-orange mt-1 ${subClass}`}>ENTREGAS</span>
      </span>
    </span>
  );
};

export const StackedHeroLogo: React.FC<{
  emblemClassName?: string;
}> = ({
  emblemClassName = 'w-20 h-20 sm:w-24 sm:h-24',
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-6 animate-brand-in">
      <BrandEmblem
        className={emblemClassName}
        decorative={false}
        title="Emblema Flacar Entregas"
      />
      <div className="mt-3">
        <span className="block text-3xl font-extrabold text-white tracking-tight leading-none">
          FLACAR
        </span>
        <div className="flex items-center justify-center gap-2 mt-1.5">
          <span className="h-[2px] w-5 bg-brand-yellow rounded-full" />
          <span className="text-xs font-bold tracking-[0.3em] text-brand-orange">
            ENTREGAS
          </span>
          <span className="h-[2px] w-5 bg-brand-yellow rounded-full" />
        </div>
      </div>
    </div>
  );
};
