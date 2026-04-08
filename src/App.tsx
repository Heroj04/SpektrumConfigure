import { useState, useEffect } from 'react';

interface SpektrumConfig {
  modelName: string;
  channels: { name: string; type: string; reverse: boolean }[];
  mixes: { from: string; to: string; rate: number }[];
}

const defaultConfig: SpektrumConfig = {
  modelName: 'My Model',
  channels: [
    { name: 'Throttle', type: 'analog', reverse: false },
    { name: 'Aileron', type: 'analog', reverse: false },
  ],
  mixes: [],
};

function App() {
  const [config, setConfig] = useState<SpektrumConfig>(defaultConfig);

  useEffect(() => {
    const saved = localStorage.getItem('spektrumConfig');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const saveConfig = () => {
    localStorage.setItem('spektrumConfig', JSON.stringify(config));
    alert('Configuration saved!');
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'spektrum-config.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setConfig(imported);
          localStorage.setItem('spektrumConfig', JSON.stringify(imported));
        } catch (err) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Spektrum Transmitter Configuration Editor</h1>
      <div>
        <label>Model Name: </label>
        <input
          type="text"
          value={config.modelName}
          onChange={(e) => setConfig({ ...config, modelName: e.target.value })}
        />
      </div>
      <h2>Channels</h2>
      {config.channels.map((channel, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Channel Name"
            value={channel.name}
            onChange={(e) => {
              const newChannels = [...config.channels];
              newChannels[index].name = e.target.value;
              setConfig({ ...config, channels: newChannels });
            }}
          />
          <select
            value={channel.type}
            onChange={(e) => {
              const newChannels = [...config.channels];
              newChannels[index].type = e.target.value;
              setConfig({ ...config, channels: newChannels });
            }}
          >
            <option value="analog">Analog</option>
            <option value="digital">Digital</option>
          </select>
          <label>
            Reverse:
            <input
              type="checkbox"
              checked={channel.reverse}
              onChange={(e) => {
                const newChannels = [...config.channels];
                newChannels[index].reverse = e.target.checked;
                setConfig({ ...config, channels: newChannels });
              }}
            />
          </label>
          <button onClick={() => {
            const newChannels = config.channels.filter((_, i) => i !== index);
            setConfig({ ...config, channels: newChannels });
          }}>Remove</button>
        </div>
      ))}
      <button onClick={() => setConfig({ ...config, channels: [...config.channels, { name: '', type: 'analog', reverse: false }] })}>
        Add Channel
      </button>
      <h2>Mixes</h2>
      {config.mixes.map((mix, index) => (
        <div key={index}>
          From: <input type="text" value={mix.from} onChange={(e) => {
            const newMixes = [...config.mixes];
            newMixes[index].from = e.target.value;
            setConfig({ ...config, mixes: newMixes });
          }} />
          To: <input type="text" value={mix.to} onChange={(e) => {
            const newMixes = [...config.mixes];
            newMixes[index].to = e.target.value;
            setConfig({ ...config, mixes: newMixes });
          }} />
          Rate: <input type="number" value={mix.rate} onChange={(e) => {
            const newMixes = [...config.mixes];
            newMixes[index].rate = parseFloat(e.target.value);
            setConfig({ ...config, mixes: newMixes });
          }} />
          <button onClick={() => {
            const newMixes = config.mixes.filter((_, i) => i !== index);
            setConfig({ ...config, mixes: newMixes });
          }}>Remove</button>
        </div>
      ))}
      <button onClick={() => setConfig({ ...config, mixes: [...config.mixes, { from: '', to: '', rate: 0 }] })}>
        Add Mix
      </button>
      <br />
      <button onClick={saveConfig}>Save Locally</button>
      <button onClick={exportConfig}>Export JSON</button>
      <input type="file" accept=".json" onChange={importConfig} />
    </div>
  );
}

export default App;
