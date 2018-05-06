import React from 'react';

const Link = ({
                children,
                onClick,
                active
              }) => {
  return (
    <a
      href='#'
      onClick={onClick}
      style={{
        textDecoration: active
          ? 'through'
          : 'none'
      }}
    >
      {children}
    </a>
  );
}

export default Link;