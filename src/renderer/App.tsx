import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Input, Form, Button, Card, message } from 'antd';
import 'antd/dist/antd.css';
// import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const [code, setCode] = useState('npm start');
  const [address, setAddress] = useState('d:/project/dt-ui');
  const onStart = () => {
    window.electron.ipcRenderer.sendMessage('command', 'start', code, address);
  };
  // const onKill = () => {
  //   window.electron.ipcRenderer.sendMessage('command', 'kill');
  // };
  useEffect(() => {
    window.electron.ipcRenderer.on('message', (msg) =>
      message.success(msg as string)
    );
  }, []);
  return (
    <div>
      <Card title="脚本执行器">
        <Button type="primary" onClick={onStart}>
          start
        </Button>
        <div>
          <Form>
            <Form.Item label="命令">
              <Input
                type="text"
                value={code}
                placeholder="请输入命令"
                onChange={({ target }) => setCode(target.value)}
              />
            </Form.Item>
            <Form.Item label="地址">
              <Input
                type="text"
                value={address}
                placeholder="请输入执行地址"
                onChange={({ target }) => setAddress(target.value)}
              />
            </Form.Item>
          </Form>
        </div>
      </Card>
      {/* <button type="button" onClick={onKill}>
        kill
      </button> */}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
