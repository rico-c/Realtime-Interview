import React, { FC, useMemo, useEffect, useRef } from "react";
import { XTerm } from "xterm-for-react";

import "./terminal.scss";

const Terminal: FC = (props) => {
  const { socket } = props;
  const xtermRef = useRef(null);

  socket.on("sync", (data: any) => {
    console.log(data);
    (xtermRef as any).current.terminal.writeln(data);
  });

  const options = useMemo(() => {
    return {
      fontSize: 14,
      lineHeight: 1.2,
      theme: { background: "#1e1e1e" },
      markers: '$'
    };
  }, []);

  return (
    <div className="terminal">
      <XTerm className="x-term" ref={xtermRef} options={options} />
    </div>
  );
};

export default Terminal;
