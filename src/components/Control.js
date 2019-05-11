import React from 'react';
import './Control.css';

const Button = ({ onClick, label }) => (
  <button className="mode" onClick={onClick}>{label}</button>
);

const Toggle = ({ id, className, onChange, checked, label }) => (
  <label id={id} className={className}><input className="toggle" type="checkbox" onChange={onChange} checked={checked} />{label}</label>
);

const Menu = ({ onChange, checked }) => (
  <div id="menu">
    <Button onClick={() => onChange("complete")} label="Complet" />
    <Button onClick={() => onChange("cv_movie")} label="CV avec Intro" />
    <Button onClick={() => onChange("cv_no_movie")} label="CV sans Intro" />
    <Toggle className="toggleLink" onChange={() => onChange("bench")} checked={checked.bench} label={checked.bench ? "Stopper le test" : "Commencer le test"} />
    <Toggle className="toggleLink" onChange={() => onChange("fullscreen")} checked={checked.fullscreen} label={checked.fullscreen ? "Quitter le plein écran" : "Plein écran"} />
    <Toggle className="toggleLink" onChange={() => onChange("info")} checked={checked.info} label={checked.info ? "Cacher les infos" : "Afficher les infos"} />
  </div>
);

class Control extends React.Component {
  constructor(props) {
    super(props);

    this.state = { control: false };
  }

  render() {
    const { onControlChange, fullscreen, info, bench, play } = this.props;
    return (<div className="controlPanel">
      {this.state.control && <Menu onChange={onControlChange} checked={{ fullscreen, info, bench }} />}
      <Toggle id="playToggle" onChange={() => onControlChange('play')} checked={play} label={play ? "❚❚" : "►"} />
      <Toggle id="controlToggle" onChange={() => this.setState({ control: !this.state.control })} checked={this.state.control} label="Contrôles" />
    </div>);
  }
}

export default Control;
