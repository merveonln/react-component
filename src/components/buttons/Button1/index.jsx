import { useState } from 'react';
import Button from './Button1.jsx';
import './Button1.css';

const types = ['primary', 'default', 'dashed', 'text', 'link'];

export default function Button1page() {
  const [size, setSize] = useState('medium');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  return (
    <main className="page">
      <div className="eyebrow">REACT COMPONENT LIBRARY</div>
      <h1>Button Components</h1>
      <p className="intro">Tek bir component, beş farklı görünüm. Butonları aşağıdan deneyebilirsin.</p>
      <section className="panel">
        <div className="panel-heading"><div><h2>Examples</h2><p>Button tipleri ve etkileşimli örnekler</p></div><span className="pill">v1.0</span></div>
        <div className="buttons">
          {types.map((type) => <Button key={type} type={type} size={size} disabled={disabled} loading={loading} onClick={() => setClickCount((n) => n + 1)}>{type.charAt(0).toUpperCase() + type.slice(1)} Button</Button>)}
        </div>
        <div className="separator" />
        <h3>Customize</h3>
        <div className="controls"><label>Size <select value={size} onChange={(e) => setSize(e.target.value)}><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select></label><label className="check"><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label><label className="check"><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label></div>
        <p className="feedback" aria-live="polite">Tıklama sayısı: {clickCount}</p>
      </section>
      <section className="panel"><h2>Usage</h2><p>Component'i projenin herhangi bir yerinde import ederek kullanabilirsin.</p><pre><code>{`import Button from './components/Button/Button';\n\n<Button type="primary" onClick={() => alert('Merhaba!')}>\n  Primary Button\n</Button>\n<Button type="dashed" size="large">Dashed Button</Button>\n<Button type="link">Link Button</Button>`}</code></pre><p className="note">Not: <code>type="link"</code> görsel bir buton tipidir. Sayfa yönlendirmesi için gerçek bir <code>&lt;a&gt;</code> etiketi kullanmalısın.</p></section>
    </main>
  );
}
