import React from 'react';
import Style from 'style-it';

function App(props) {
  const { result, baseStyle } = props.answer;
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
        ${result}
        ${baseStyle}
      `,
        <div className="box"/>
      )}
    </>

  );
}

export default App;
