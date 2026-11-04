import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandEmblem: React.FC<{
  className?: string;
  decorative?: boolean;
  title?: string;
}> = ({
  className = 'w-12 h-12',
  decorative = true,
  title = 'Flacar Entregas',
}) => {
  return (
    <img
      src="/logo-flacar.jpg"
      alt={decorative ? '' : title}
      aria-hidden={decorative ? 'true' : undefined}
      className={`object-contain rounded-xl ${className}`}
      loading="eager"
    />
  );
};

export const CompactLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  alt = 'Flacar Entregas',
}) => {
  const heightClass =
    size === 'sm'
      ? 'h-9'
      : size === 'lg'
      ? 'h-14'
      : 'h-11';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/logo-flacar.jpg"
        alt={alt}
        className={`${heightClass} w-auto object-contain rounded-lg drop-shadow-md`}
        loading="eager"
      />
    </div>
  );
};

export const StackedHeroLogo: React.FC<{
  className?: string;
}> = ({
  className = 'max-w-[280px] sm:max-w-[340px]',
}) => {
  return (
    <div className="flex justify-center mb-6">
      <img
        src="/logo-flacar.jpg"
        alt="Flacar Entregas — Logotipo Oficial"
        className={`w-full h-auto object-contain rounded-2xl drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)] ${className}`}
        loading="eager"
      />
    </div>
  );
};
