import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';

import { Container, Help, Balloon, Content, Title } from './App.styles';

ReactGA.initialize('UA-91476802-3');

class App extends Component {
  state = {
    generating: false,
    generated: false,
    showHelp: false,
    progress: 0,
  };

  generate() {
    ReactGA.event({
      category: 'Secret',
      action: 'Create',
    });

    this.startTimer();
    this.setState({ generating: true });

    setTimeout(() => {
      this.setState({ generating: false, generated: true });
    }, 1200);
  }

  startTimer() {
    if (this.state.progress < 100) {
      setTimeout(() => {
        this.setState({ progress: this.state.progress + 10 });
        this.startTimer();
      }, 100);
    }
  }

  renderContent() {
    if (this.state.generated) {
      return (
        <Fragment>
          <Content
            className="nes-container with-title"
            disabled={this.state.showHelp}
            onClick={this.hideHelp}
          >
            <Title>Share this url</Title>

            <input
              type="text"
              className="nes-input is-success"
              value="https://keepitsecret.app/#asdf"
              onFocus={event => event.target.select()}
            />
          </Content>

          <Content
            small
            disabled={this.state.showHelp}
            className="nes-container is-dark is-centered"
            style={{ marginTop: '0.5rem' }}
          >
            <p>This is a one use url.</p>
            <p>Once opened it will be gone forever.</p>
          </Content>
        </Fragment>
      );
    }

    if (this.state.generating) {
      return (
        <Content
          className="nes-container with-title"
          disabled={this.state.showHelp}
          onClick={this.hideHelp}
        >
          <Title>Keeping it secret...</Title>

          <progress
            percentage={50}
            className="nes-progress is-success"
            value={this.state.progress}
            max="100"
          />
        </Content>
      );
    }

    return (
      <Content
        className="nes-container with-title"
        disabled={this.state.showHelp}
        onClick={this.hideHelp}
      >
        <Title>Keep it secret</Title>

        <textarea
          type="textarea"
          placeholder="Secrets..."
          rows={4}
          className="nes-textarea"
          style={{ resize: 'none' }}
          onChange={event => this.setState({ out: event.target.value })}
        />

        <button className="nes-btn is-primary" onClick={() => this.generate()}>
          Keep it safe
        </button>
      </Content>
    );
  }

  showHelp = () => {
    this.setState({ showHelp: true });
  };

  hideHelp = () => {
    this.setState({ showHelp: false });
  };

  render() {
    return (
      <Container>
        {this.state.showHelp && (
          <Balloon className="nes-balloon from-right" style={{}}>
            This app lets you create and share one use secrets.
          </Balloon>
        )}
        <Help
          className="nes-btn is-warning"
          onClick={() => {
            ReactGA.event({
              category: 'Help',
              action: !this.state.showHelp ? 'Show' : 'Hide',
            });

            this.setState({ showHelp: !this.state.showHelp });
          }}
        >
          ?
        </Help>

        {this.renderContent()}
      </Container>
    );
  }
}

export default App;
