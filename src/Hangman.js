import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import AlphaButtons from './AlphaButtons';
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = {
      playerGuessedCorrectly: false,
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.renderRestartButton = this.renderRestartButton.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.checkGuesses = this.checkGuesses.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    if (this.state.nWrong === this.props.maxWrong) {
      return this.state.answer;
    }

    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }), () => {
      this.setState(updatedState => ({
        playerGuessedCorrectly: this.checkGuesses(updatedState),
      }))
    });
  }

  checkGuesses({ guessed, answer }) {
    return answer.split(``)
      .reduce((guesses, letter) => {
        if (guessed.has(letter)) {
          guesses.push(true);
        } else {
          guesses.push(false);
        }

        return guesses;
      }, [])
      .every((guess) => {
        return guess;
      }
    );
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    if (this.state.nWrong === this.props.maxWrong) {
      return `You lose`;
    }

    if (this.state.playerGuessedCorrectly) {
      return `You win!`;
    }

    return (
      <AlphaButtons 
        onClick={ this.handleGuess }
        guessed={ this.state.guessed }
      />
    );
  }

  /** renderRestartButton: returns the restart button to render */
  renderRestartButton() {
    if (this.state.playerGuessedCorrectly || 
        this.state.nWrong === this.props.maxWrong) {
      return (
        <section>
          <button
            onClick={ this.handleRestart }
          >
            Restart
          </button>
        </section>
      )
    }

    return null;
  }

  /** handleRestart: handles restarting the game */
  handleRestart() {
    this.setState({
      playerGuessedCorrectly: false,
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** render: render game */
  render() {
    return (
      <div className='Hangman'>
        <h1
          className = {
            this.state.playerGuessedCorrectly || 
            this.state.nWrong === this.props.maxWrong ?
            `add-top-margin`
            :
            ``
          }
        >
          Hangman
        </h1>
        <img 
          src={this.props.images[this.state.nWrong]} 
          alt={`${this.state.nWrong} wrong guesses`} 
        />
        <p>
          Number wrong: { this.state.nWrong }
        </p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>
          { this.generateButtons() }
        </p>
        { this.renderRestartButton() }
      </div>
    );
  }
}

export default Hangman;
