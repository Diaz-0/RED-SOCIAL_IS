import React from 'react';
import { Menu } from "../ACCION";

export function Layout({ children }) {
  return (
    <>
      <div>
        <Menu />
      </div>
      <div>
        {children}
      </div>
    </>
  );
}
