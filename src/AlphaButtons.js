import React from 'react';

class AlphaButtons extends React.Component {
  /** by default, have all english alphabet letters, an empty set of guesses, and an empty onClick. */
  static defaultProps = {
    letters: `abcdefghijklmnopqrstuvwxyz`,
    onClick: function(){
      alert(`onClick handler required`);
    },
    guessed: new Set()
  };

  /** render: render alpha buttons */
  render() {
    return this.props.letters.split(``).map(ltr => (
      <button
        key={ ltr }
        value={ltr}
        onClick={this.props.onClick}
        disabled={this.props.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
}

export default AlphaButtons;