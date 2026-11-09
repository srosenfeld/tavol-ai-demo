import { DemoChrome } from './components/PhoneShell';
import { DemoProvider, useDemo } from './state/demoStore';
import { CurrentScreen } from './screens';
import './styles/tokens.css';
import './styles/app.css';

function DemoApp() {
  const { current } = useDemo();
  return (
    <DemoChrome>
      <CurrentScreen id={current.id} />
    </DemoChrome>
  );
}

export default function App() {
  return (
    <DemoProvider>
      <DemoApp />
    </DemoProvider>
  );
}
