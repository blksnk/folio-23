import Image from "next/image";

interface LogoProps {
  outline?: boolean;
}

export const Logo = ({ outline }: LogoProps): JSX.Element => {
  const url = outline ? "/genmetsuLogoOutline.svg" : "/genmetsuLogo.svg";
  const width = outline ? 34 : 32;
  const height = outline ? 38 : 36;
  return (
    <Image
      src={url}
      alt="Genmetsu Logo"
      width={width}
      height={height}
      priority
    />
  );
};
