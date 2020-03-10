import React from 'react';
import Style from 'style-it';

function App(props) {
  return (
    <>
      <Style>
        {`
        body {
          margin: 0;
        }
        `}
      </Style>
      {Style.it(`
        .box {
          background-color: indianred;
          width: 100px;
          height: 100px;
        }
      `,
        <div className="box"/>
      )}
    </>

  );
}

export default App;
