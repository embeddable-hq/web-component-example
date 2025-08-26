import React from 'react';

function App() {
  const [embeddables, setEmbeddables] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [token, setToken] = React.useState(null);

  function Embeddable(props) {
    return React.createElement('em-beddable', props);
  }

  React.useEffect(() => {
    fetch('/embeddables')
      .then((res) => res.json())
      .then((json) => setEmbeddables(json.embeddables));
  }, []);

  React.useEffect(() => {
    fetch('/token?embeddableId=' + selected)
      .then((res) => res.json())
      .then((json) => setToken(json.token));
  }, [selected]);

  // Client Context can be any arbitrary json
  const clientContext = JSON.stringify({
    theme: 'default',
    currency: 'USD',
    country: 'United States',
  });

  const content = () => {
    return (
      <div>
        <div>
          {embeddables.map((dash, i) => (
            <button key={i} onClick={() => setSelected(dash.id)}>
              {dash.name}
            </button>
          ))}
        </div>
        <div>
          {token && (
            <Embeddable
              key={token}
              token={token}
              client-context={clientContext}
            />
          )}
        </div>
      </div>
    );
  };

  return <div className="App">{!embeddables ? 'Loading...' : content()}</div>;
}

export default App;
