import React, { FC, useMemo, useCallback, useRef, useEffect } from 'react';
import { XTerm } from 'xterm-for-react';
import { Button } from 'antd';
import { decode } from "@/utils/EnCode";

import './terminal.scss';

const Terminal: FC = props => {
  const { socket } = props;
  const xtermRef = useRef(null);
  // 关于statusid的定义参考：
  useEffect(() => {
    if (socket) {
      socket.on('sync', (data: any) => {
        const infoline = `\u001b[30;1m ⦿ Execution by \u001b[34;1m ${data.triger} \u001b[30;1m in ${data.time}s`;
        (xtermRef as any).current.terminal.writeln(infoline);
        if (data.error) {
          (xtermRef as any).current.terminal.writeln('\u001b[31;1m' + data.error);
        } else if (data.status.id >= 7 && data.status.id <= 12)  {
          const resline = decode(data.stderr);
          (xtermRef as any).current.terminal.writeln('\u001b[31;1m' + resline);
        } else if (data.status.id === 3) {
          const resline = decode(data.stdout);
          (xtermRef as any).current.terminal.writeln('\u001b[0m' + resline);
        } else if (data.status.id > 3){
          const resline = data.status.description;
          (xtermRef as any).current.terminal.writeln('\u001b[31;1m' + resline);
        }
      });
      console.log('终端 socket 连接成功');
    } else {
      console.log('终端 socket 等待连接');
    }
  }, [socket]);

  const clear = useCallback(() => {
    (xtermRef as any).current.terminal.clear();
  }, []);

  useEffect(() => {
    clear();
    (xtermRef as any).current.terminal.writeln('\u001b[32;1m ⦿\u001b[0m Virtual terminal ready');
  }, [])

  const options = useMemo(() => {
    return {
      // fontSize: 14,
      // lineHeight: 1.2,
      convertEol: true, //遇到回车符时，光标定位在下一行开始处
      theme: { background: '#1e1e1e' },
      rows: 50 //行数
    };
  }, []);

  return (
    <div className="terminal">
      <div className="top-bar">
        <Button onClick={clear}>清空</Button>
      </div>
      <XTerm className="x-term" ref={xtermRef} options={options} />
    </div>
  );
};

export default Terminal;
