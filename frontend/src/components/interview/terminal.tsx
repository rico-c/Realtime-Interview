import React, { FC, useMemo, useEffect, useRef } from "react";
import { XTerm } from 'xterm-for-react'


import './terminal.scss';

const Terminal: FC = () => {
  const xtermRef = useRef(null);

  const options = useMemo(() => {
    return {
      fontSize: 14,
      lineHeight: 1.2,
      theme: {background: '#1e1e1e'}
    }
  }, [])

  React.useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    (xtermRef as any).current.terminal.writeln("Hello, World!");
    (xtermRef as any).current.terminal.writeln("Hello, World!");
    (xtermRef as any).current.terminal.writeln("Hello, World!");
  }, []);

  return (
    <div className="terminal">
      <div className="top-bar">
        top
      </div>
      <XTerm className="x-term" ref={xtermRef} options={options}/>
    </div>
  )
}

export default Terminal;