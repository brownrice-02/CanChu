import React from "react";
import Image from "next/image";
import Link from "next/link";

const AvatarBtn = ({ src, alt, link }) => {
  const buttonStyle = {
    cursor: "pointer",
    border: "none",
  };

  return (
    <Link href={link}>
      <Image
        // src = 'https://i.imgur.com/5NAGJfl.png' //test
        src={src}
        alt={alt}
        fill={true}
        style={{ borderRadius: "50%" }}
        objectFit="cover"
      />
    </Link>
  );
};

export default AvatarBtn;
