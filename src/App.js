import React, { useState } from 'react';
import './App.scss';
import './components/_components.scss';
import { getComponents } from './service/getComponents'
import { Components } from './components/Components'

function App() {

  const [figmaApiKey, setToken] = useState('50143-4b363922-284f-4848-ad10-aa2f162635b5');
  const [figmaId, setFigmaId] = useState('6u3AVACpnU7rwmS1EdS80A');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const data = await getComponents(figmaApiKey, figmaId)

      setData(data)
      setLoading(false)
    }
    catch (err) {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="token">Figma Token</label>
            <input className="input-default" type="text" name="token" id="token" placeholder="Digite o seu figma token"
              onChange={e => setToken(e.target.value)}
              value={figmaApiKey}
            />
          </div>

          <div className="form-input">
            <label htmlFor="figmaId">Figma ID</label>
            <input className="input-default" type="text" name="figmaId" id="figmaId" placeholder="Digite o seu figma ID"
              onChange={e => setFigmaId(e.target.value)}
              value={figmaId}
            />
          </div>
          <div className="form-submit">
            <button type="submit" className={loading ? 'button-disabled' : 'button-primary'} >{loading ? 'AGUARDE' : 'ENVIAR'}</button>
          </div>
        </form>
      </div>
      <div className="components-container">
        <Components components={data} />
      </div>
    </>
  );
}

export default App;
