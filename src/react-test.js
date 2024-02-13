<!doctype html>
<html>
  <head>
    <title>Embedabble</title>
    <meta charset="utf-8" />
    <script
      type="module"
      src="https://api.embeddable.com/js/v1/"></script>
    <script 
      src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script 
      src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id='test-container'></div>

    <script type="text/babel">
      'use strict';
      const e = React.createElement;

      class TestComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = { load: false };
        }

        render() {
          if (this.state.load) {
            return <em-beddable
              token="eyJhbGciOiJIUzI1NiJ9.eyJzZWN1cml0eVRva2VuSWQiOiJmZWE5NDA0Ny1lMjhhLTQ5ZGQtOGQ0YS1mZDdjNDY2MDE0YzUiLCJpYXQiOjE3MDc3Njk3ODEsImV4cCI6MTcwODM3NDU4MX0.IglDlXs9JymBwLrpPUMREpSkClkjY0xuJmoXgHwiqLk"
            ></em-beddable>;
          }

          return (
            <button onClick={() => this.setState({ load: true })}>
              Load my dashboard
            </button>
          );
        }
      }

      const domContainer = document.querySelector('#test-container');
      const root = ReactDOM.createRoot(domContainer);
      root.render(e(TestComponent));
    </script>
  </body>
</html>
